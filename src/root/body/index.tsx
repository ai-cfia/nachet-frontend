import { useState, useRef, useEffect } from "react";
import type Webcam from "react-webcam";
import { saveAs } from "file-saver";
import { BodyContainer } from "./indexElements";
import Classifier from "../../pages/classifier";
import SavePopup from "../../components/body/save_capture_popup";
import UploadPopup from "../../components/body/load_image_popup";
import ModelInfoPopup from "../../components/body/model_popup";
import SwitchDevice from "../../components/body/switch_device_popup";
import CreateDirectory from "../../components/body/create_directory_popup";
import DeleteDirectoryPopup from "../../components/body/del_directory_popup";
import ResultsTunerPopup from "../../components/body/results_tuner_popup";
import SignUp from "../../components/body/authentication/signup";
import CreativeCommonsPopup from "../../components/body/creative_commons_popup";
import JSZip from "jszip";
import axios from "axios";

interface ImageCache {
  index: number;
  src: string;
  scores: number[];
  classifications: string[];
  boxes: any[];
  annotated: boolean;
  imageDims: number[];
  overlapping: boolean[];
  overlappingIndices: number[];
}

interface params {
  windowSize: {
    width: number;
    height: number;
  };
  uuid: string;
  creativeCommonsPopupOpen: boolean;
  setCreativeCommonsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreativeCommonsAgreement: (agree: boolean) => void;
  setSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  signUpOpen: boolean;
}

const Body: React.FC<params> = (props) => {
  const [imageSrc, setImageSrc] = useState<string>(
    "https://ai-cfia.github.io/nachet-frontend/placeholder-image.jpg",
  );
  const [imageSrcKey, setImageSrcKey] = useState<boolean>(false);
  const [resultsRendered, setResultsRendered] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [imageFormat, setImageFormat] = useState<string>("image/png");
  const [imageLabel, setImageLabel] = useState<string>("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [modelInfoPopupOpen, setModelInfoPopupOpen] = useState(false);
  const [switchDeviceOpen, setSwitchDeviceOpen] = useState(false);
  const [createDirectoryOpen, setCreateDirectoryOpen] = useState(false);
  const [imageCache, setImageCache] = useState<ImageCache[]>([]);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(
    undefined,
  );
  const [curDir, setCurDir] = useState<string>("General");
  const [azureStorageDir, setAzureStorageDir] = useState<any>({});
  const [delDirectoryOpen, setDelDirectoryOpen] = useState<boolean>(false);
  const [resultsTunerOpen, setResultsTunerOpen] = useState<boolean>(false);
  const [scoreThreshold, setScoreThreshold] = useState<number>(50);
  const [selectedLabel, setSelectedLabel] = useState<string>("all");
  const [labelOccurrences, setLabelOccurrences] = useState<any>({});
  const [saveIndividualImage, setSaveIndividualImage] = useState<string>("0");
  const [switchTable, setSwitchTable] = useState<boolean>(true);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const loadCaptureToCache = (src: string): void => {
    setImageCache((prevCache) => [
      ...prevCache,
      {
        index:
          imageCache.length > 0
            ? imageCache[imageCache.length - 1].index + 1
            : imageIndex + 1,
        src,
        scores: [],
        classifications: [],
        boxes: [],
        annotated: false,
        imageDims: [],
        overlapping: [],
        overlappingIndices: [],
      },
    ]);
    setImageIndex(
      imageCache.length > 0
        ? imageCache[imageCache.length - 1].index + 1
        : imageIndex + 1,
    );
  };

  const getCurrentImage = (index: number): void => {
    if (imageCache.length > 0) {
      imageCache.forEach((image) => {
        if (image.index === index) {
          setImageSrc(image.src);
          setSelectedLabel("all");
          if (image.src === imageSrc) {
            setImageSrcKey(!imageSrcKey);
          }
        }
      });
    } else {
      setImageSrc(
        "https://ai-cfia.github.io/nachet-frontend/placeholder-image.jpg",
      );
    }
  };

  const captureFeed = (): void => {
    const src: string | null | undefined = webcamRef.current?.getScreenshot();
    if (src === null || src === undefined) {
      return;
    }
    loadCaptureToCache(src);
  };

  const uploadImage = (event: any): void => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file !== undefined) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== "string") {
          return;
        }
        loadCaptureToCache(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setUploadOpen(false);
  };

  const removeFromCache = (index: number): void => {
    const newCache = imageCache.filter((item) => item.index !== index);
    setImageCache(newCache);
    if (newCache.length >= 1) {
      setImageIndex(newCache[newCache.length - 1].index);
    } else {
      setImageIndex(0);
    }
  };

  const clearCache = (): void => {
    setImageCache([]);
    setImageIndex(0);
  };

  const saveImage = (): void => {
    (async () => {
      if (saveIndividualImage === "0" && imageCache.length > 0) {
        saveAs(
          imageSrc,
          `${imageLabel}-${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}.${imageFormat.split("/")[1]}`,
        );
        setSaveOpen(false);
      } else if (saveIndividualImage === "1" && imageCache.length > 0) {
        const zip = new JSZip();
        imageCache.forEach((image) => {
          const base64Data = image.src.replace(/^data:image\/\w+;base64,/, "");
          zip.file(
            `Capture-${image.index}-${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}.${imageFormat.split("/")[1]}`,
            base64Data,
            {
              base64: true,
            },
          );
        });
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(
          content,
          `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}.${imageFormat.split("/")[1]}.zip`,
        );
      }
    })().catch((error) => {
      alert(error);
    });
  };

  const loadResultsToCache = (inferenceData: any): void => {
    inferenceData.forEach((object: any) => {
      object.boxes.forEach((params: any) => {
        setImageCache((prevCache) =>
          prevCache.map((item) => {
            if (
              item.index === imageIndex &&
              object.boxes.length !== item.scores.length
            ) {
              return {
                ...item,
                scores: [...item.scores, params.score.toFixed(2)],
                classifications: [...item.classifications, params.label],
                boxes: [...item.boxes, params.box],
                overlapping: [...item.overlapping, params.overlapping],
                overlappingIndices: [
                  ...item.overlappingIndices,
                  params.overlappingIndices,
                ],
                annotated: [...item.scores, params.score.toFixed(2)].length > 0,
              };
            }
            return item;
          }),
        );
      });
    });
    setResultsRendered(!resultsRendered);
  };

  const getLabelOccurrence = (): void => {
    const result: any = {};
    imageCache.forEach((object: any) => {
      if (object.index === imageIndex && object.annotated === true) {
        object.scores.forEach((score: number, index: number) => {
          if (score * 100 >= scoreThreshold) {
            const label: string = object.classifications[index];
            if (result[label] !== undefined) {
              result[label] = (result[label] as number) + 1;
            } else {
              result[label] = 1;
            }
          }
        });
      }
    });
    setLabelOccurrences(result);
  };

  const handleDirChange = (dir: string): void => {
    setCurDir(dir.replace(/\s/g, "-"));
  };

  const handleCreateDirectory = (): void => {
    (async () => {
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/create-dir`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: {
            container_name: props.uuid,
            folder_name: curDir,
          },
        }).then((response) => {
          if (response.status === 200) {
            setCreateDirectoryOpen(false);
            setCurDir("General");
            handleAzureStorageDir();
          } else {
            alert("Error creating directory, it may already exist");
          }
        });
      } catch (error) {
        alert(error);
      }
    })().catch((error) => {
      alert(error);
    });
  };

  const handleDelFromDirectory = (): void => {
    (async () => {
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/del`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: {
            container_name: props.uuid,
            folder_name: curDir,
          },
        }).then((response) => {
          if (response.status === 200) {
            setCurDir("General");
            handleAzureStorageDir();
          } else {
            alert(response.data);
          }
        });
      } catch (error) {
        alert(error);
      }
    })().catch((error) => {
      alert(error);
    });
  };

  const handleAzureStorageDir = (): void => {
    (async () => {
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/dir`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: {
            container_name: props.uuid,
          },
        }).then((response) => {
          if (response.status === 200) {
            setAzureStorageDir(response.data);
          } else {
            alert(response.data[0]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    })().catch((error) => {
      console.error(error);
    });
  };

  const handleInferenceRequest = (): void => {
    if (curDir !== "") {
      const imageObject = imageCache.filter(
        (item) => item.index === imageIndex,
      );
      (async () => {
        try {
          await axios({
            method: "post",
            url: `http://localhost:8080/inf`,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            data: {
              image: imageSrc,
              imageDims: [
                imageObject[0].imageDims[0],
                imageObject[0].imageDims[1],
              ],
              folder_name: curDir,
              container_name: props.uuid,
            },
          }).then((response) => {
            if (response.status === 200) {
              handleAzureStorageDir();
              loadResultsToCache(response.data);
            } else {
              alert(response.data[0]);
            }
          });
        } catch (error) {
          console.log(error);
          alert("Error fetching inference data");
        }
      })().catch((error) => {
        console.error(error);
        alert("Cannot connect to server");
      });
    } else {
      alert("Please select a directory");
    }
  };

  const loadToCanvas = (): void => {
    const image = new Image();
    image.src = imageSrc;
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas === null) {
      return;
    }
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      imageCache.forEach((storedImage) => {
        if (storedImage.index === imageIndex && storedImage.annotated) {
          storedImage.classifications.forEach((prediction, index) => {
            // !storedImage.overlapping[index]
            if (
              storedImage.scores[index] >= scoreThreshold / 100 &&
              (prediction === selectedLabel || selectedLabel === "all")
            ) {
              ctx.beginPath();
              // draw label index
              ctx.font = "bold 0.9vw Arial";
              ctx.fillStyle = "black";
              ctx.textAlign = "center";
              Object.keys(labelOccurrences).forEach((key, labelIndex) => {
                const scorePercentage = (
                  storedImage.scores[index] * 100
                ).toFixed(0);
                if (storedImage.boxes[index].topY <= 40) {
                  if (prediction === key) {
                    if (switchTable) {
                      ctx.fillText(
                        `[${labelIndex + 1}] - ${scorePercentage}%`,
                        ((storedImage.boxes[index].bottomX as number) -
                          (storedImage.boxes[index].topX as number)) /
                          2 +
                          (storedImage.boxes[index].topX as number),
                        (storedImage.boxes[index].bottomY as number) + 23,
                      );
                    } else {
                      ctx.fillText(
                        `[${index + 1}]`,
                        ((storedImage.boxes[index].bottomX as number) -
                          (storedImage.boxes[index].topX as number)) /
                          2 +
                          (storedImage.boxes[index].topX as number),
                        (storedImage.boxes[index].bottomY as number) + 23,
                      );
                    }
                  }
                } else {
                  if (prediction === key) {
                    if (switchTable) {
                      ctx.fillText(
                        `[${labelIndex + 1}] - ${scorePercentage}%`,
                        ((storedImage.boxes[index].bottomX as number) -
                          (storedImage.boxes[index].topX as number)) /
                          2 +
                          (storedImage.boxes[index].topX as number),
                        storedImage.boxes[index].topY - 8,
                      );
                    } else {
                      ctx.fillText(
                        `[${index + 1}]`,
                        ((storedImage.boxes[index].bottomX as number) -
                          (storedImage.boxes[index].topX as number)) /
                          2 +
                          (storedImage.boxes[index].topX as number),
                        storedImage.boxes[index].topY - 8,
                      );
                    }
                  }
                }
              });
              // draw bounding box
              ctx.lineWidth = 2;
              ctx.strokeStyle = "red";
              ctx.rect(
                storedImage.boxes[index].topX,
                storedImage.boxes[index].topY,
                storedImage.boxes[index].bottomX -
                  storedImage.boxes[index].topX,
                storedImage.boxes[index].bottomY -
                  storedImage.boxes[index].topY,
              );
              ctx.stroke();
              ctx.closePath();
            }
          });
        }
        // capture label in bottom left
        if (storedImage.index === imageIndex) {
          storedImage.imageDims = [image.width, image.height];
          ctx.beginPath();
          ctx.font = "bold 0.9vw Arial";
          ctx.textAlign = "left";
          ctx.fillStyle = "#4ee44e";
          ctx.fillText(`CAPTURE ${storedImage.index}`, 10, canvas.height - 15);
          ctx.stroke();
          ctx.closePath();
        }
      });
    };
  };

  useEffect(() => {
    getCurrentImage(imageIndex);
  }, [imageIndex]);

  useEffect(() => {
    loadToCanvas();
  }, [
    scoreThreshold,
    selectedLabel,
    resultsRendered,
    labelOccurrences,
    switchTable,
    imageSrc,
    imageSrcKey,
  ]);

  useEffect(() => {
    getLabelOccurrence();
  }, [imageIndex, scoreThreshold, imageCache]);

  useEffect(() => {
    const updateDevices = async (): Promise<any> => {
      try {
        const availableDevices =
          await navigator.mediaDevices.enumerateDevices();
        const videoDevices = availableDevices.filter(
          (i) => i.kind === "videoinput",
        );
        setDevices(videoDevices);

        if (activeDeviceId === "" || activeDeviceId === undefined) {
          setActiveDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        alert(error);
      }
    };

    updateDevices().catch((error) => {
      alert(error);
    });
    const handleDeviceChange = (): void => {
      updateDevices().catch((error) => {
        alert(error);
      });
    };
    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange,
      );
    };
  }, [activeDeviceId]);

  useEffect(() => {
    handleAzureStorageDir();
  }, [props.uuid]);

  return (
    <BodyContainer width={props.windowSize.width}>
      {saveOpen && (
        <SavePopup
          setSaveOpen={setSaveOpen}
          saveImage={saveImage}
          imageFormat={imageFormat}
          imageLabel={imageLabel}
          setImageFormat={setImageFormat}
          setImageLabel={setImageLabel}
          setSaveIndividualImage={setSaveIndividualImage}
          saveIndividualImage={saveIndividualImage}
        />
      )}
      {uploadOpen && (
        <UploadPopup setUploadOpen={setUploadOpen} uploadImage={uploadImage} />
      )}
      {modelInfoPopupOpen && (
        <ModelInfoPopup
          setSwitchModelOpen={setModelInfoPopupOpen}
          switchModelOpen={modelInfoPopupOpen}
        />
      )}
      {switchDeviceOpen && (
        <SwitchDevice
          setSwitchDeviceOpen={setSwitchDeviceOpen}
          devices={devices}
          setDeviceId={setActiveDeviceId}
          activeDeviceId={activeDeviceId}
        />
      )}
      {delDirectoryOpen && (
        <DeleteDirectoryPopup
          setDelDirectoryOpen={setDelDirectoryOpen}
          handleDelFromDirectory={handleDelFromDirectory}
          curDir={curDir}
        />
      )}
      {createDirectoryOpen && (
        <CreateDirectory
          setCreateDirectoryOpen={setCreateDirectoryOpen}
          handeDirChange={handleDirChange}
          curDir={curDir}
          handleCreateDirectory={handleCreateDirectory}
        />
      )}
      {resultsTunerOpen && (
        <ResultsTunerPopup
          setResultsTunerOpen={setResultsTunerOpen}
          setScoreThreshold={setScoreThreshold}
          scoreThreshold={scoreThreshold}
        />
      )}
      {props.signUpOpen && <SignUp setSignUpOpen={props.setSignUpOpen} />}
      {props.creativeCommonsPopupOpen && (
        <CreativeCommonsPopup
          setCreativeCommonsPopupOpen={props.setCreativeCommonsPopupOpen}
          handleCreativeCommonsAgreement={props.handleCreativeCommonsAgreement}
        />
      )}
      <Classifier
        handleInference={handleInferenceRequest}
        imageIndex={imageIndex}
        setUploadOpen={setUploadOpen}
        imageSrc={imageSrc}
        webcamRef={webcamRef}
        imageFormat={imageFormat}
        setSaveOpen={setSaveOpen}
        capture={captureFeed}
        savedImages={imageCache}
        clearImageCache={clearCache}
        canvasRef={canvasRef}
        removeImage={removeFromCache}
        setSwitchModelOpen={setModelInfoPopupOpen}
        setSwitchDeviceOpen={setSwitchDeviceOpen}
        windowSize={props.windowSize}
        activeDeviceId={activeDeviceId}
        azureStorageDir={azureStorageDir}
        curDir={curDir}
        setImageIndex={setImageIndex}
        handleDirChange={handleDirChange}
        setCreateDirectoryOpen={setCreateDirectoryOpen}
        setDelDirectoryOpen={setDelDirectoryOpen}
        setResultsTunerOpen={setResultsTunerOpen}
        scoreThreshold={scoreThreshold}
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
        labelOccurrences={labelOccurrences}
        switchTable={switchTable}
        setSwitchTable={setSwitchTable}
        setCurDir={setCurDir}
      />
    </BodyContainer>
  );
};

export default Body;
