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
}

const Body: React.FC<params> = (props) => {
  const [imageSrc, setImageSrc] = useState<string>(
    "https://ai-cfia.github.io/nachet-frontend/placeholder-image.jpg",
  );
  const [imageSrcKey, setImageSrcKey] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [imageFormat, setImageFormat] = useState<string>("image/png");
  const [imageLabel, setImageLabel] = useState<string>("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [switchModelOpen, setSwitchModelOpen] = useState(false);
  const [switchDeviceOpen, setSwitchDeviceOpen] = useState(false);
  const [imageCache, setImageCache] = useState<ImageCache[]>([]);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [apiKey, setApiKey] = useState<string>("");
  const [apiURL, setApiURL] = useState<string>("");
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(
    undefined,
  );
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
  };

  const handleInferenceRequest = (): void => {
    if (apiKey === "" || apiURL === "") {
      alert("Please enter API key and URL");
      return;
    }
    (async () => {
      try {
        await axios({
          method: "post",
          url: `http://localhost:2323`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: {
            image: imageSrc,
            API_key: apiKey,
            API_url: apiURL,
          },
        }).then((response) => {
          console.log(response.data);
          loadResultsToCache(response.data);
        });
      } catch (error) {
        console.error("error fetching inference data", error);
        alert("No response from server");
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
            ctx.font = "0.6vw Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(
              `[${(index + 1).toString()}] ${prediction
                .split(" ")
                .slice(1)
                .join(" ")}`,
              ((storedImage.regions[index].bottomX as number) -
                (storedImage.regions[index].topX as number)) /
                2 +
                (storedImage.regions[index].topX as number),
              storedImage.regions[index].topY - 10,
            );
            ctx.lineWidth = 2;
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
      localStorage.setItem("image_cache", serializedData);
    } catch (error) {
      console.error("Error saving JSON to localStorage:", error);
    }
  };

  const getJSONFromLocalStorage = (): any => {
    try {
      const serializedData = localStorage.getItem("image_cache");
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

    // Remove the event listener when the component is unmounted
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
      console.log(cachedData);
    }
  }, []);

  useEffect(() => {
    getCurrentImage(imageIndex);
  }, [imageIndex]);

  useEffect(() => {
    loadToCanvas();
    console.log(imageCache);
  }, [imageSrc, imageSrcKey]);

  useEffect(() => {
    (async () => {
      const avaliableDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = avaliableDevices.filter(
        (i) => i.kind === "videoinput",
      );
      setDevices(videoDevices);
      if (activeDeviceId === "" || activeDeviceId === undefined) {
        setActiveDeviceId(videoDevices[0].deviceId);
      }
    })().catch((error) => {
      alert(error);
    });
  });

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
          setApiKey={setApiKey}
          setApiURL={setApiURL}
          apiURL={apiURL}
          apiKey={apiKey}
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
      />
    </BodyContainer>
  );
};

export default Body;
