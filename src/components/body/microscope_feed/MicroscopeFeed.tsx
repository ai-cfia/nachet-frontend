// \components\body\microscope_feed\index.tsx
// MicroscopeFeed
import Webcam from "react-webcam";
import { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { Canvas } from "./indexElements";
// Import icons
import SwitchCameraIcon from "@mui/icons-material/SwitchCamera";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ToggleButton from "../buttons/ToggleButton";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import FormatShapesOutlinedIcon from "@mui/icons-material/FormatShapesOutlined";

// Import a loading icon component (ensure you have this)
import CircularProgress from "@mui/material/CircularProgress";
import {
  BoxCSS,
  ClassData,
  FeedbackDataNegative,
  FeedbackDataPositive,
  Images,
} from "../../../common/types";

import ScaledInferenceBox from "../scaled_inference_box";
import {
  requestClassList,
  sendNegativeFeedback,
  sendPositiveFeedback,
} from "../../../common";
import { FreeformBox, NegativeFeedbackForm } from "../feedback_form";
import { getUnscaledCoordinates } from "../../../common/imageutils";
interface MicroscopeFeedProps {
  webcamRef: React.RefObject<Webcam>;
  capture: () => void;
  activeDeviceId: string | undefined;
  setSwitchDeviceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBatchUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageCache: Images[];
  handleInference: () => void;
  imageIndex: number;
  isWebcamActive: boolean;
  isLoading: boolean;
  onCaptureClick: () => void;
  windowSize: {
    width: number;
    height: number;
  };
  toggleShowInference: (state: boolean) => void;
  backendUrl: string;
  uuid: string;
}

const ButtonMicroscopeFeed = (props: {
  label: string;
  icon: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}): JSX.Element => {
  const { label, icon, onClick, disabled } = props;
  const buttonStyle = {
    marginRight: "0.2vh",
    marginLeft: "0.2vh",
    borderRadius: "0.4vh",
    paddingTop: "0.3vh",
    paddingBottom: "0.3vh",
    paddingLeft: "0.7vh",
    paddingRight: "0.7vh",
    fontSize: "1.17vh",
    width: "fit-content",
    border: `0.01vh solid LightGrey`,
    "&:hover": {
      backgroundColor: "#F5F5F5",
      transition: "0.1s ease-in-out all",
    },
  };
  return (
    <Button
      color="inherit"
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={buttonStyle}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Button>
  );
};

const MicroscopeFeed = (props: MicroscopeFeedProps): JSX.Element => {
  const {
    webcamRef,
    capture,
    activeDeviceId,
    setSwitchDeviceOpen,
    canvasRef,
    setSaveOpen,
    setBatchUploadOpen,
    setUploadOpen,
    setSwitchModelOpen,
    imageCache,
    handleInference,
    imageIndex,
    isWebcamActive,
    isLoading,
    onCaptureClick,
    windowSize,
    toggleShowInference,
    backendUrl,
    uuid,
  } = props;

  const width = windowSize.width * 0.575;
  const height = windowSize.height * 0.605;

  const defaultBoxPosition: BoxCSS = {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 100,
    maxHeight: 100,
    left: width / 2 - 50,
    top: height / 2 - 50,
  };

  const [imageData, setImageData] = useState<Images | null>(null);
  const [feedbackMode, setFeedbackMode] = useState<boolean>(false);
  const [isNewAnnotation, setIsNewAnnotation] = useState<boolean>(false);
  const [scaledFeedbackBox, setScaledFeedbackBox] = useState<BoxCSS | null>(
    null,
  );
  const [inferenceForRevision, setInferenceForRevision] =
    useState<FeedbackDataNegative | null>(null);

  const classList: ClassData[] = useMemo(() => {
    const classes: ClassData[] = [];
    const getClasses = async () => {
      const response = await requestClassList(backendUrl);
      return response.seeds;
    };
    getClasses().then((data) => {
      for (let i = 0; i < data.length; i++) {
        classes.push({
          id: i,
          classId: data[i].seed_id,
          label: data[i].seed_name,
        });
      }
    });

    return classes;
  }, [backendUrl]);

  const iconStyle = {
    fontSize: "1.7vh",
    paddingRight: "0.4vh",
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  };

  const submitPositiveFeedback = (index: number) => {
    if (imageData == null) {
      return;
    }
    console.log("Submitting positive feedback for key: ", index);

    const feedbackDataPositive: FeedbackDataPositive = {
      userId: uuid,
      inferenceId: imageData.boxes[index].inferenceId,
      boxes: [{ boxId: imageData.boxes[index].boxId }],
    };

    sendPositiveFeedback(feedbackDataPositive, backendUrl)
      .then(() => {
        console.log("Positive Feedback submitted successfully");
      })
      .catch((error) => {
        console.error("Error submitting feedback: ", error);
      });
  };

  const submitNegativeFeedback = (
    feedbackDataNegative: FeedbackDataNegative,
  ) => {
    if (imageData === null) {
      return;
    }
    console.log("Submitting negative feedback");

    sendNegativeFeedback(feedbackDataNegative, backendUrl)
      .then(() => {
        console.log("Negative Feedback submitted successfully");
        exitFeedbackMode();
      })
      .catch((error) => {
        console.error("Error submitting feedback: ", error);
      });
  };

  const submitNewAnnotation = (feedbackDataNegative: FeedbackDataNegative) => {
    if (imageData === null) {
      return;
    }
    console.log("Submitting new annotation");

    sendNewAnnotation(feedbackDataNegative, backendUrl)
      .then(() => {
        console.log("New Annotation submitted successfully");
        exitFeedbackMode();
      })
      .catch((error) => {
        console.error("Error submitting new annotation: ", error);
      });
  };

  const handleFreeformSubmit = (box: BoxCSS) => {
    setScaledFeedbackBox(box);
    setInferenceForRevision((prev) => {
      return prev
        ? {
            ...prev,
            boxes: [
              {
                ...prev.boxes[0],
                box: getUnscaledCoordinates(
                  width,
                  height,
                  imageData!.imageDims[0],
                  imageData!.imageDims[1],
                  box,
                ),
              },
            ],
          }
        : null;
    });
  };

  const handleAnnotate = () => {
    setIsNewAnnotation(true);
    enterFeedbackMode(imageIndex, null);
  };

  const exitFeedbackMode = () => {
    toggleShowInference(true);
    setFeedbackMode(false);
    setInferenceForRevision(null);
    setScaledFeedbackBox(null);
    setIsNewAnnotation(false);
  };

  const enterFeedbackMode = (
    index: number,
    boxPosition: BoxCSS | null,
  ) => {
    if (boxPosition == null) {
      setScaledFeedbackBox(defaultBoxPosition);
      const image = imageCache.find((image) => image.index === imageIndex)
      if (image == null) {
        return;
      };
      const unscaledBox = getUnscaledCoordinates(
        width,
        height,
        image.imageDims[0],
        image.imageDims[1],
        defaultBoxPosition,
      );
      setInferenceForRevision({
        userId: uuid,
        inferenceId: "",
        boxes: [
          {
            classId: "",
            label: "",
            boxId: "",
            box: unscaledBox,
            comment: "",
          },
        ],
      });
    } else {
      if (imageData == null) {
        return;
      }
      setScaledFeedbackBox(boxPosition);
      setInferenceForRevision({
        userId: uuid,
        inferenceId: imageData.boxes[index].inferenceId,
        boxes: [
          {
            classId: imageData.boxes[index].classId,
            label: imageData.boxes[index].label,
            boxId: imageData.boxes[index].boxId,
            box: {
              topX: imageData.boxes[index].topX,
              topY: imageData.boxes[index].topY,
              bottomX: imageData.boxes[index].bottomX,
              bottomY: imageData.boxes[index].bottomY,
            },
            comment: "",
          },
        ],
      });
    }
    toggleShowInference(false);
    setFeedbackMode(true);
  };

  useEffect(() => {
    if (imageCache.length > 0) {
      const image = imageCache.find((image) => image.index === imageIndex);
      if (
        image &&
        image.annotated &&
        image.scores.length > 0 &&
        image.boxes.length > 0 &&
        image.classifications.length > 0 &&
        image.imageDims[0] > 0
      ) {
        setImageData(image);
      } else {
        setImageData(null);
      }
    }
  }, [imageIndex, imageCache]);
  return (
    <Box
      sx={{
        width: width,
        height: "fit-content",
        border: `0.01vh solid LightGrey`,
        borderRadius: "0.4vh",
      }}
      boxShadow={0}
      data-testid="microscope-component"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          padding: "0.8vh",
        }}
      >
        <ButtonMicroscopeFeed
          label="CAPTURE"
          icon={<AddAPhotoIcon color="inherit" style={iconStyle} />}
          disabled={!isWebcamActive} // Disable when the webcam is active
          onClick={() => {
            capture();
          }}
        />
        <ButtonMicroscopeFeed
          label="SWITCH"
          icon={<SwitchCameraIcon color="inherit" style={iconStyle} />}
          disabled={!isWebcamActive} // Disable when the webcam is active
          onClick={() => {
            setSwitchDeviceOpen(true);
          }}
        />
        <ButtonMicroscopeFeed
          label="BATCH"
          icon={<UploadFileIcon color="inherit" style={iconStyle} />}
          disabled={isWebcamActive} // Disable when the webcam is active
          onClick={() => {
            setBatchUploadOpen(true);
          }}
        />
        <ButtonMicroscopeFeed
          label="LOAD"
          icon={<UploadFileIcon color="inherit" style={iconStyle} />}
          disabled={isWebcamActive} // Disable when the webcam is active
          onClick={() => {
            setUploadOpen(true);
          }}
        />
        <ButtonMicroscopeFeed
          label="SAVE"
          icon={<DownloadIcon color="inherit" style={iconStyle} />}
          disabled={isWebcamActive} // Disable when the webcam is active
          onClick={() => {
            setSaveOpen(true);
          }}
        />
        <ButtonMicroscopeFeed
          label="MODEL SELECTION"
          icon={<DonutSmallIcon color="inherit" style={iconStyle} />}
          disabled={isWebcamActive} // Disable when the webcam is active
          onClick={() => {
            setSwitchModelOpen(true);
          }}
        />
        <ButtonMicroscopeFeed
          label="CLASSIFY"
          icon={<CropFreeIcon color="inherit" style={iconStyle} />}
          disabled={isWebcamActive || imageCache.length == 0} // Disable when the webcam is active
          onClick={() => {
            handleInference();
          }}
        />
        <ButtonMicroscopeFeed
          label="ANNOTATE"
          icon={<FormatShapesOutlinedIcon color="inherit" style={iconStyle} />}
          disabled={isWebcamActive || imageCache.length == 0} // Disable when the webcam is active
          onClick={() => {
            handleAnnotate();
          }}
        />
      </Box>
      <div style={{ position: "relative", width: width, height }}>
        {feedbackMode && scaledFeedbackBox && inferenceForRevision && (
          <>
            <NegativeFeedbackForm
              inference={inferenceForRevision}
              position={scaledFeedbackBox}
              classList={classList}
              onCancel={exitFeedbackMode}
              onSubmit={submitNegativeFeedback}
              isNewAnnotation={isNewAnnotation}
            />
            <FreeformBox
              position={scaledFeedbackBox}
              onCancel={exitFeedbackMode}
              onSubmit={handleFreeformSubmit}
              isNewAnnotation={isNewAnnotation}
            />
          </>
        )}
        {isWebcamActive ? (
          <Webcam
            ref={webcamRef}
            mirrored={false}
            width="100%"
            height="100%"
            style={{ objectFit: "fill" }}
            videoConstraints={{
              width: 1920,
              height: 1080,
              deviceId: activeDeviceId,
            }}
            screenshotFormat="image/png"
            screenshotQuality={1}
            forceScreenshotSourceSize={true}
          />
        ) : (
          <>
            <Canvas ref={canvasRef} />
            {!isLoading && (
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                {imageData !== null &&
                  imageData.boxes.map((box, index) => {
                    return (
                      <ScaledInferenceBox
                        key={index}
                        index={index}
                        box={box}
                        label={
                          String((imageData.scores[index] * 100).toFixed(0)) +
                          "%"
                        }
                        imageWidth={imageData.imageDims[0]}
                        imageHeight={imageData.imageDims[1]}
                        canvasWidth={width}
                        canvasHeight={height}
                        visible={!feedbackMode}
                        submitPositiveFeedback={submitPositiveFeedback}
                        handleNegativeFeedback={enterFeedbackMode}
                      />
                    );
                  })}
              </Box>
            )}
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, 0.5)", // Darkens the canvas area to make the loader visible
                }}
              >
                <CircularProgress style={{ color: "#FFFFFF" }} />{" "}
                {/* Adjust the color as needed */}
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <ToggleButton
          isActive={!isWebcamActive}
          onClick={() => {
            if (!isWebcamActive) {
              onCaptureClick();
            }
          }}
          text="Video Feed"
        />
        <ToggleButton
          isActive={isWebcamActive}
          onClick={() => {
            if (isWebcamActive) {
              onCaptureClick();
            }
          }}
          text="Capture"
        />
      </div>
    </Box>
  );
};

export default MicroscopeFeed;
