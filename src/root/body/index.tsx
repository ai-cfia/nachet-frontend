// Root Functions
// \src\root\body\index.tsx
import { useState, useRef, useEffect, useCallback } from "react";
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
import { ResultsTunerPopup } from "../../components/body/results_tuner_popup";
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
  topN: Array<Array<{ score: number; label: string }>>;
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
  const [selectedModel, setSelectedModel] = useState("Swin transformer");
  const [modelDisplayName, setModelDisplayName] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string>("all");
  const [labelOccurrences, setLabelOccurrences] = useState<any>({});
  const [saveIndividualImage, setSaveIndividualImage] = useState<string>("0");
  const [switchTable, setSwitchTable] = useState<boolean>(true);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(true); // This state determines the visibility of the webcam
  const [metadata, setMetadata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCaptureToCache = (src: string): void => {
    // appends new image to image cache and its corresponding details
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
        topN: [],
      },
    ]);
    // sets the current image index to the new image
    setImageIndex(
      imageCache.length > 0
        ? imageCache[imageCache.length - 1].index + 1
        : imageIndex + 1,
    );
  };

  const getCurrentImage = useCallback(
    (index: number): void => {
      // gets the current image from the image cache based on index value
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
    },
    [imageCache, imageSrc, imageSrcKey],
  );

  const getBackendUrl = useCallback((): string => {
    const backendURL = process.env.VITE_BACKEND_URL;
    if (backendURL === null || backendURL === undefined || backendURL === "") {
      throw new Error("VITE_BACKEND_URL environment variable is not set.");
    }
    return backendURL;
  }, []);

  const captureFeed = (): void => {
    // takes screenshot of webcam feed and loads it to cache when capture button is pressed
    const src: string | null | undefined = webcamRef.current?.getScreenshot();
    if (src === null || src === undefined) {
      return;
    }
    loadCaptureToCache(src);
  };

  const uploadImage = (event: any): void => {
    // loads image from local storage to cache when upload button is pressed
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
    // removes image from cache based on given index value when delete button is pressed
    const newCache = imageCache.filter((item) => item.index !== index);
    setImageCache(newCache);
    if (newCache.length >= 1) {
      setImageIndex(newCache[newCache.length - 1].index);
    } else {
      setImageIndex(0);
    }
  };

  const clearCache = (): void => {
    // clears image cache when clear button is pressed
    setImageCache([]);
    setImageIndex(0);
  };

  const saveImage = (): void => {
    // saves image to local storage or compresses the entire cache into a zip file which is then saved to local storage
    (async () => {
      // save individual image
      if (saveIndividualImage === "0" && imageCache.length > 0) {
        saveAs(
          imageSrc,
          `${imageLabel}-${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}.${imageFormat.split("/")[1]}`,
        );
        setSaveOpen(false);
      } else if (saveIndividualImage === "1" && imageCache.length > 0) {
        // compress all images from cache to zip file and download
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
        setSaveOpen(false);
      }
    })().catch((error) => {
      alert(error);
    });
  };

  const loadResultsToCache = (inferenceData: any): void => {
    // amends the image cache given an image index, with the inference data
    // which is received from the server
    inferenceData.forEach((object: any) => {
      const topN = object.boxes.map((box: any) => box.topN);

      setImageCache((prevCache) =>
        prevCache.map((item) => {
          // check to see if the image index matches the current image index
          if (item.index === imageIndex) {
            return {
              ...item,
              scores: object.boxes.map((box: any) => box.score.toFixed(2)),
              classifications: object.boxes.map((box: any) => box.label),
              boxes: object.boxes.map((box: any) => box.box),
              overlapping: object.boxes.map((box: any) => box.overlapping),
              overlappingIndices: object.boxes.map(
                (box: any) => box.overlappingIndices,
              ),
              topN,
              annotated: true,
            };
          }
          return item;
        }),
      );
    });
    // redraw canvas (useEffect)
    setResultsRendered(!resultsRendered);
  };

  const getLabelOccurrence = useCallback((): void => {
    // gets the number of occurences of each label in the current
    // image based on score threshold and seed label selection in classification results
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
  }, [imageCache, imageIndex, scoreThreshold, setLabelOccurrences]);

  const handleDirChange = (dir: string): void => {
    // sets the current directory for azure storage
    setCurDir(dir.replace(/\s/g, "-"));
  };

  const handleCreateDirectory = (): void => {
    // makes a post request to the backend to create a new directory in azure storage

    (async () => {
      try {
        await axios({
          method: "post",
          url: `${getBackendUrl()}/create-dir`,
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
    // makes a post request to the backend to delete a directory in azure storage
    (async () => {
      try {
        await axios({
          method: "post",
          url: `${getBackendUrl()}/del`,
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

  const handleAzureStorageDir = useCallback((): void => {
    // makes a post request to the backend to get the current directories in azure storage,
    // should be called whenever a directory is deleted, created and when page is rendered
    (async () => {
      try {
        await axios({
          method: "post",
          url: `${getBackendUrl()}/dir`,
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
  }, [props.uuid, setAzureStorageDir, getBackendUrl]);

  const handleInferenceRequest = (): void => {
    // makes a post request to the backend to get inference data for the current image
    if (curDir !== "") {
      const imageObject = imageCache.filter(
        (item) => item.index === imageIndex,
      );
      (async () => {
        try {
          setIsLoading(true);
          await axios({
            method: "post",
            url: `${getBackendUrl()}/inf`,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            data: {
              model_name: selectedModel,
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
              console.log(
                "First box topResult:",
                response.data[0].boxes[0].topN,
              );
              handleAzureStorageDir();
              loadResultsToCache(response.data);
              setModelDisplayName(selectedModel);
              setIsLoading(false);
            } else {
              alert(response.data[0]);
              setIsLoading(false);
            }
          });
        } catch (error) {
          console.log(error);
          alert("Error fetching inference data");
          setIsLoading(false);
        }
      })().catch((error) => {
        console.error(error);
        alert("Cannot connect to server");
        setIsLoading(false);
      });
    } else {
      alert("Please select a directory");
    }
  };

  const loadToCanvas = useCallback((): void => {
    // loads the current image to the canvas and draws the bounding boxes and labels,
    // should update whenever a change is made to the image cache or the score threshold and the selected label is changed
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
        // find the current image in the image cache based on current index
        if (storedImage.index === imageIndex && storedImage.annotated) {
          storedImage.classifications.forEach((prediction, index) => {
            // !storedImage.overlapping[index]     REMOVE THIS TO SHOW ONLY 1 BB
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
                // check to see if label is cut off by the canvas edge, if so, move it to the bottom of the bounding box
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
                  // draw label index and score percentage
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
                      // only draw table if switchTable is false (result component switch button)
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
          ctx.fillText(`Capture ${storedImage.index}`, 10, canvas.height - 15);
          ctx.stroke();
          ctx.closePath();
        }
      });
    };
  }, [
    imageCache,
    imageIndex,
    imageSrc,
    labelOccurrences,
    scoreThreshold,
    selectedLabel,
    switchTable,
  ]);

  useEffect(() => {
    getCurrentImage(imageIndex);
  }, [
    imageIndex,
    getCurrentImage,
    loadToCanvas,
    getLabelOccurrence,
    handleAzureStorageDir,
  ]);

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
    imageIndex,
    getCurrentImage,
    loadToCanvas,
  ]);

  useEffect(() => {
    getLabelOccurrence();
  }, [imageIndex, scoreThreshold, imageCache, getLabelOccurrence]);

  useEffect(() => {
    // retrieves the available devices and sets the active device to the first available device
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
  }, [props.uuid, handleAzureStorageDir]);

  const handleImageUpload = (): void => {
    // Set the logic for handling image upload and then:
    setIsWebcamActive(false); // Hide the webcam after the image is loaded
  };

  useEffect(() => {
    const backendUrl = process.env.VITE_BACKEND_URL;

    // Explicitly check for undefined, null, and empty string
    if (
      backendUrl === undefined ||
      backendUrl === null ||
      backendUrl.trim() === ""
    ) {
      console.error("Backend URL is undefined, null or empty.");
      return;
    }

    const fetchMetadata = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `${backendUrl}/model-endpoints-metadata`,
        );
        setMetadata(response.data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };

    if (process.env.REACT_APP_MODE !== "test") {
      void fetchMetadata();
    }
  }, []);

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
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          realData={metadata}
          handleInference={handleInferenceRequest}
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
        isWebcamActive={isWebcamActive}
        onCaptureClick={() => {
          setIsWebcamActive(!isWebcamActive);
        }}
        onImageUpload={handleImageUpload}
        modelDisplayName={modelDisplayName}
        isLoading={isLoading}
      />
    </BodyContainer>
  );
};

export default Body;
