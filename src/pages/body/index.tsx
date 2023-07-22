import { useState, useRef, useEffect } from "react";
import type Webcam from "react-webcam";
import { saveAs } from "file-saver";
import { BodyContainer } from "./indexElements";
import Classifier from "../classifier";
import SavePopup from "../../components/body/save_popup";
import UploadPopup from "../../components/body/upload_image";

interface ImageCache {
  label: string;
  src: string;
  scores: number[];
  predictions: string[];
  regions: any[];
  annotated: boolean;
}

const Home = (): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string>(
    "https://ai-cfia.github.io/nachet-frontend/placeholder-image.jpg",
  );
  const [imageFormat, setImageFormat] = useState<string>("image/png");
  const [imageLabel, setImageLabel] = useState<string>("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [imageCache, setImageCache] = useState<ImageCache[]>([]);
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
        label: `CAPTURE ${prevCache.length + 1}`,
        src,
        scores,
        predictions,
        regions,
        annotated,
      },
    ]);
  };

  const captureFeed = (): void => {
    const src: string | null | undefined = webcamRef.current?.getScreenshot();
    if (src === null || src === undefined) {
      return;
    }
    loadCaptureToCache(src, [], [], [], false);
    setImageSrc(src);
  };

  const uploadImage = (event: any): void => {
    event.preventDefault();
    const src = URL.createObjectURL(event.target.files[0]);
    loadCaptureToCache(src, [], [], [], false);
    setUploadOpen(false);
    setImageSrc(src);
  };

  const loadFromCache = (src: string): void => {
    setImageSrc(src);
  };

  const removeFromCache = (src: string): void => {
    const newCache = imageCache.filter((item) => item.src !== src);
    setImageCache(newCache);
    if (imageCache.length > 1) {
      setImageSrc(newCache[newCache.length - 1].src);
    } else {
      setImageSrc(
        "https://ai-cfia.github.io/nachet-frontend/placeholder-image.jpg",
      );
    }
  };

  const clearCache = (): void => {
    setImageCache([]);
    setImageSrc(
      "https://ai-cfia.github.io/nachet-frontend/placeholder-image.jpg",
    );
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

  const handleFormat = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setImageFormat(event.target.value);
  };

  const handleLabel = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImageLabel(event.target.value);
  };

  const loadResultsToCache = (data: any): void => {
    data.forEach((object: any) => {
      object.boxes.forEach((params: any) => {
        setImageCache((prevCache) =>
          prevCache.map((item) => {
            if (
              item.src === imageSrc &&
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
        const response = await fetch(
          "https://ai-cfia.github.io/nachet-frontend/sim.json",
        );
        const data = await response.json().then((data) => data);
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
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.scale(1, 1);
      ctx.drawImage(image, 0, 0);
      imageCache.forEach((object) => {
        if (object.src === imageSrc && object.annotated) {
          object.predictions.forEach((prediction, index) => {
            ctx.beginPath();
            ctx.font = "16px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(
              `[${(index + 1).toString()}] ${prediction
                .split(" ")
                .slice(1)
                .join(" ")}`,
              ((object.regions[index].bottomX as number) -
                (object.regions[index].topX as number)) /
                2 +
                (object.regions[index].topX as number),
              object.regions[index].topY - 10,
            );
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = "red";
            ctx.rect(
              object.regions[index].topX,
              object.regions[index].topY,
              object.regions[index].bottomX - object.regions[index].topX,
              object.regions[index].bottomY - object.regions[index].topY,
            );
            ctx.stroke();
            ctx.closePath();
          });
        }
        if (object.src === imageSrc) {
          ctx.beginPath();
          ctx.font = "25px Arial";
          ctx.textAlign = "left";
          ctx.fillStyle = "white";
          ctx.fillText(object.label, 10, canvas.height - 15);
          ctx.stroke();
          ctx.closePath();
        }
      });
    };
  };

  useEffect(() => {
    loadToCanvas();
  }, [imageSrc, imageCache]);

  return (
    <BodyContainer>
      {saveOpen && (
        <SavePopup
          setSaveOpen={setSaveOpen}
          saveImage={saveImage}
          imageFormat={imageFormat}
          imageLabel={imageLabel}
          handleFormat={handleFormat}
          handleLabel={handleLabel}
        />
      )}
      {uploadOpen && (
        <UploadPopup setUploadOpen={setUploadOpen} uploadImage={uploadImage} />
      )}
      <Classifier
        handleInference={handleInferenceRequest}
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
      />
    </BodyContainer>
  );
};

export default Home;
