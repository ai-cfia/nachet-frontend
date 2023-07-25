import { useState, useRef, useEffect } from "react";
import type Webcam from "react-webcam";
import { saveAs } from "file-saver";
import { BodyContainer } from "./indexElements";
import Classifier from "../classifier";
import SavePopup from "../../components/body/save_capture";
import UploadPopup from "../../components/body/load_image";
import SwitchModelPopup from "../../components/body/switch_model";
import SwitchDevice from "../../components/body/switch_device";

interface ImageCache {
  index: number;
  src: string;
  scores: number[];
  predictions: string[];
  regions: any[];
  annotated: boolean;
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
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const loadCaptureToCache = (
    src: string,
    scores: number[],
    predictions: string[],
    regions: any[],
    annotated: boolean,
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
      },
    ]);
    setImageIndex((prevIndex) => prevIndex + 1);
  };

  const getCurrentImage = (index: number): void => {
    if (imageCache.length >= 1) {
      imageCache.forEach((object) => {
        if (object.index === index) {
          console.log("found image in cache", object.index);
          setImageSrc(object.src);
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
    loadCaptureToCache(src, [], [], [], false);
  };

  const uploadImage = (event: any): void => {
    event.preventDefault();
    const src = URL.createObjectURL(event.target.files[0]);
    loadCaptureToCache(src, [], [], [], false);
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
    console.log("removed image from cache, current index", imageIndex);
  };

  const clearCache = (): void => {
    setImageCache([]);
    setImageIndex(imageCache.length);
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
    (async () => {
      try {
        // const response = await fetch(
        //   "https://ai-cfia.github.io/nachet-frontend/sim.json",
        // );
        // const data = await response.json().then((data) => data);
        // loadResultsToCache(data);

        const response = await fetch("http://localhost:80", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"image": imageSrc}),
        });
        const data = await response.json().then((data) => data);
        console.log(data);
        loadResultsToCache(data);
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
    ctx.clearRect(0, 0, 600, 600);
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

  useEffect(() => {
    loadToCanvas();
  }, [imageSrc, imageCache]);

  useEffect(() => {
    getCurrentImage(imageIndex);
  }, [imageIndex]);

  useEffect(() => {
    (async () => {
      const avaliableDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = avaliableDevices.filter(
        (i) => i.kind === "videoinput",
      );
      setDevices(videoDevices);
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
      />
    </BodyContainer>
  );
};

export default Body;
