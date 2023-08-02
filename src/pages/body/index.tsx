import { useState, useRef, useEffect } from "react";
import type Webcam from "react-webcam";
import { saveAs } from "file-saver";
import { BodyContainer } from "./indexElements";
import Classifier from "../classifier";
import SavePopup from "../../components/body/save_capture";
import UploadPopup from "../../components/body/load_image";
import SwitchModelPopup from "../../components/body/switch_model";
import SwitchDevice from "../../components/body/switch_device";
import axios from "axios";

interface ImageCache {
  index: number;
  src: string;
  scores: number[];
  predictions: string[];
  regions: any[];
  annotated: boolean;
  imageDims: number[];
}

interface params {
  windowSize: {
    width: number;
    height: number;
  };
  getUuid: () => string;
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
  const [switchModelOpen, setSwitchModelOpen] = useState(false);
  const [switchDeviceOpen, setSwitchDeviceOpen] = useState(false);
  const [imageCache, setImageCache] = useState<ImageCache[]>([]);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(
    undefined,
  );
  const [azureStorageDir, setAzureStorageDir] = useState<any[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const loadCaptureToCache = (
    src: string,
    scores: number[],
    predictions: string[],
    regions: any[],
    annotated: boolean,
    imageDims: number[],
  ): void => {
    setImageCache((prevCache) => [
      ...prevCache,
      {
        index:
          imageCache.length > 0
            ? imageCache[imageCache.length - 1].index + 1
            : imageIndex + 1,
        src,
        scores,
        predictions,
        regions,
        annotated,
        imageDims,
      },
    ]);
    setImageIndex(
      imageCache.length > 0
        ? imageCache[imageCache.length - 1].index + 1
        : imageIndex + 1,
    );
  };

  const getCurrentImage = (index: number): void => {
    if (imageCache.length >= 1) {
      imageCache.forEach((image) => {
        if (image.index === index) {
          setImageSrc(image.src);
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
    loadCaptureToCache(src, [], [], [], false, [0, 0]);
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
        loadCaptureToCache(reader.result, [], [], [], false, [0, 0]);
      };
      reader.readAsDataURL(file);
    }
    setUploadOpen(false);
  };

  const loadFromCache = (index: number): void => {
    setImageIndex(index);
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
    saveAs(
      imageSrc,
      `${imageLabel}-${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}.${imageFormat.split("/")[1]}`,
    );
    setSaveOpen(false);
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
                predictions: [...item.predictions, params.label],
                regions: [...item.regions, params.box],
                annotated: true,
              };
            }
            return item;
          }),
        );
      });
    });
    setResultsRendered(!resultsRendered);
  };

  const getAzureStorageDir = (): void => {
    (async () => {
      try {
        await axios({
          method: "post",
          url: `http://localhost:2323/dir`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: {
            container_name: props.getUuid(),
          },
        }).then((response) => {
          setAzureStorageDir(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    })().catch((error) => {
      console.error(error);
    });
  };

  getAzureStorageDir();

  const handleInferenceRequest = (): void => {
    const imageObject = imageCache.filter((item) => item.index === imageIndex);
    (async () => {
      try {
        await axios({
          method: "post",
          url: `http://localhost:2323/inf`,
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
            folder_name: "project_1",
            container_name: props.getUuid(),
          },
        }).then((response) => {
          loadResultsToCache(response.data);
        });
      } catch (error) {
        console.log(error);
        alert("Error fetching inference data");
      }
    })().catch((error) => {
      console.error(error);
      alert("Cannot connect to server");
    });
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      imageCache.forEach((storedImage) => {
        if (storedImage.index === imageIndex && storedImage.annotated) {
          storedImage.predictions.forEach((prediction, index) => {
            ctx.beginPath();
            ctx.font = "1.3vh Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            if (storedImage.regions[index].topY <= 15) {
              ctx.fillText(
                `[${(index + 1).toString()}] ${prediction
                  .split(" ")
                  .slice(1)
                  .join(" ")}`,
                ((storedImage.regions[index].bottomX as number) -
                  (storedImage.regions[index].topX as number)) /
                  2 +
                  (storedImage.regions[index].topX as number),
                (storedImage.regions[index].bottomY as number) + 15,
              );
            } else {
              ctx.fillText(
                `[${(index + 1).toString()}] ${prediction
                  .split(" ")
                  .slice(1)
                  .join(" ")}`,
                ((storedImage.regions[index].bottomX as number) -
                  (storedImage.regions[index].topX as number)) /
                  2 +
                  (storedImage.regions[index].topX as number),
                storedImage.regions[index].topY - 8,
              );
            }
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = "red";
            ctx.rect(
              storedImage.regions[index].topX,
              storedImage.regions[index].topY,
              storedImage.regions[index].bottomX -
                storedImage.regions[index].topX,
              storedImage.regions[index].bottomY -
                storedImage.regions[index].topY,
            );
            ctx.stroke();
            ctx.closePath();
          });
        }
        if (storedImage.index === imageIndex) {
          storedImage.imageDims = [image.width, image.height];
          ctx.beginPath();
          ctx.font = "1vw Arial";
          ctx.textAlign = "left";
          ctx.fillStyle = "#4ee44e";
          ctx.fillText(`CAPTURE ${storedImage.index}`, 10, canvas.height - 15);
          ctx.stroke();
          ctx.closePath();
        }
      });
    };
  };

  const saveJSONToLocalStorage = (cache: any[]): void => {
    try {
      const serializedData = JSON.stringify(cache);
      localStorage.setItem(
        "seed_classification_interface_image_cache",
        serializedData,
      );
    } catch (error) {
      console.error("Error saving JSON to localStorage:", error);
    }
  };

  const getJSONFromLocalStorage = (): any => {
    try {
      const serializedData = localStorage.getItem(
        "seed_classification_interface_image_cache",
      );
      if (serializedData === null) {
        return undefined;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error("Error retrieving JSON from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      saveJSONToLocalStorage(imageCache);
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        saveJSONToLocalStorage(imageCache);
      });
    };
  }, [imageCache]);

  useEffect(() => {
    const cachedData = getJSONFromLocalStorage();
    if (cachedData !== null && cachedData !== undefined) {
      setImageCache(cachedData);
    }
  }, []);

  useEffect(() => {
    getCurrentImage(imageIndex);
  }, [imageIndex]);

  useEffect(() => {
    loadToCanvas();
  }, [imageSrc, imageSrcKey]);

  useEffect(() => {
    loadToCanvas();
  }, [resultsRendered]);

  useEffect(() => {
    const updateDevices = async (): Promise<any> => {
      try {
        const availableDevices =
          await navigator.mediaDevices.enumerateDevices();
        const videoDevices = availableDevices.filter(
          (i) => i.kind === "videoinput",
        );
        setDevices(videoDevices);
        console.log(videoDevices);

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
        />
      )}
      {uploadOpen && (
        <UploadPopup setUploadOpen={setUploadOpen} uploadImage={uploadImage} />
      )}
      {switchModelOpen && (
        <SwitchModelPopup
          setSwitchModelOpen={setSwitchModelOpen}
          switchModelOpen={switchModelOpen}
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
        loadImage={loadFromCache}
        canvasRef={canvasRef}
        removeImage={removeFromCache}
        setSwitchModelOpen={setSwitchModelOpen}
        setSwitchDeviceOpen={setSwitchDeviceOpen}
        windowSize={props.windowSize}
        activeDeviceId={activeDeviceId}
        azureStorageDir={azureStorageDir}
      />
    </BodyContainer>
  );
};

export default Body;
