import { useState, useRef, useEffect } from "react";
import type Webcam from "react-webcam";
import { saveAs } from "file-saver";
import { HomeContainer } from "./indexElements";
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

// parse json file
// look into azure storage api

const Home = (): JSX.Element => {
  const [captureEmpty, setCaptureEmpty] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string>("./placeholder-image.jpg");
  const [imageFormat, setImageFormat] = useState<string>("image/png");
  const [imageLabel, setImageLabel] = useState<string>("");
  const [annotationEmpty, setAnnotationEmpty] = useState<boolean>(true);
  const [saveOpen, setSaveOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [imageCount, setImageCount] = useState<number>(1);
  const [imageCache, setImageCache] = useState<ImageCache[]>([]);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cacheImage = (
    label: string,
    src: string,
    scores: number[],
    predictions: string[],
    regions: any[],
    annotated: boolean,
  ): void => {
    setImageCount((imageCount) => imageCount + 1);
    setImageCache((prevCache) => [
      ...prevCache,
      {
        label,
        src,
        scores,
        predictions,
        regions,
        annotated,
      },
    ]);
  };

  const capture = (): void => {
    const src: string | null | undefined = webcamRef.current?.getScreenshot();
    if (src === null || src === undefined) {
      return;
    }
    setImageSrc(src);
    setCaptureEmpty(false);
    cacheImage(`Capture: ${imageCount}`, src, [], [], [], false);
  };

  const uploadImage = (event: any): void => {
    event.preventDefault();
    const src = URL.createObjectURL(event.target.files[0]);
    setImageSrc(src);
    cacheImage(`Capture: ${imageCount}`, src, [], [], [], false);
    setUploadOpen(false);
    setCaptureEmpty(false);
  };

  const loadFromCache = (event: any): void => {
    event.preventDefault();
    const src = event.target.getAttribute("data-value");
    setImageSrc(src);
    setCaptureEmpty(false);
  };

  const checkCacheEmpty = (): boolean => {
    if (imageCache.length === 1) {
      setImageSrc("./placeholder-image.jpg");
      setCaptureEmpty(true);
      setImageLabel("");
      return true;
    } else {
      return false;
    }
  };

  const removeImage = (event: any): void => {
    event.preventDefault();
    const src = event.target.getAttribute("data-value");
    const newCache = imageCache.filter((item) => item.src !== src);
    setImageCache(newCache);
    setImageCount((imageCount) => imageCount - 1);
    if (newCache.length > 0) {
      setImageSrc(newCache[newCache.length - 1].src);
    }
    checkCacheEmpty();
  };

  const clearCapture = (): void => {
    const newCache = imageCache.filter((item) => item.src !== imageSrc);
    setImageCache(newCache);
    setImageCount((imageCount) => imageCount - 1);
    if (newCache.length > 0) {
      setImageSrc(newCache[newCache.length - 1].src);
    }
    checkCacheEmpty();
  };

  const clearCache = (): void => {
    setImageSrc("./placeholder-image.jpg");
    setCaptureEmpty(true);
    setImageLabel("");
    setImageCache([]);
    setImageCount(1);
    checkCacheEmpty();
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
        imageCache.forEach((item) => {
          if (item.src === imageSrc) {
            item.scores.push(params.score);
            item.predictions.push(params.label);
            item.regions.push(params.box);
            item.annotated = true;
          }
        });
      });
    });
    // data.forEach((object: any) => {
    //   object.boxes.forEach((params: any) => {
    //     imageCache.forEach((item) => {
    //       if (item.src === imageSrc) {
    //         setImageCache((prevCache) => [
    //           ...prevCache,
    //           {
    //             label: item.label,
    //             src: item.src,
    //             scores: [params.score],
    //             predictions: [params.label],
    //             regions: [params.box],
    //             annotated: true,
    //           },
    //         ]);
    //       }
    //     });
    //   });
    // });
    loadToCanvas();
  };

  const handleInferenceRequest = (): void => {
    (async () => {
      try {
        const response = await fetch("./sim.json");
        const data = await response.json().then((data) => data);
        loadResultsToCache(data);
      } catch (error) {
        console.error("error fetching inference data", error);
      }
    })().catch((error) => {
      console.error(error);
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
      ctx.drawImage(image, 0, 0);
      imageCache.forEach((object) => {
        if (object.src === imageSrc && object.annotated) {
          object.predictions.forEach((prediction, index) => {
            ctx.font = "15px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(
              `${prediction.split(" ").slice(1).join(" ")} - ${(object.scores[
                index
              ] * 100).toFixed(1)}`,
              object.regions[index].topX - 2,
              object.regions[index].topY - 5,
            );
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = "red";
            ctx.rect(
              object.regions[index].topX,
              object.regions[index].topY,
              object.regions[index].bottomX - object.regions[index].topX,
              object.regions[index].bottomY - object.regions[index].topY,
            );
          });
        }
        if (object.src === imageSrc) {
          ctx.font = "25px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(object.label, 10, canvas.height - 15);
        }
        ctx.stroke();
      });
    };
  };

  useEffect(() => {
    loadToCanvas();
  }, [imageSrc]);

  return (
    <HomeContainer>
      {saveOpen && (
        <SavePopup
          saveOpen={saveOpen}
          setSaveOpen={setSaveOpen}
          saveImage={saveImage}
          imageFormat={imageFormat}
          imageLabel={imageLabel}
          setImageFormat={setImageFormat}
          setImageLabel={setImageLabel}
          handleFormat={handleFormat}
          handleLabel={handleLabel}
        />
      )}
      {uploadOpen && (
        <UploadPopup
          setImageSrc={setImageSrc}
          capture={capture}
          uploadOpen={uploadOpen}
          setUploadOpen={setUploadOpen}
          uploadImage={uploadImage}
        />
      )}
      <Classifier
        captureEmpty={captureEmpty}
        handleInference={handleInferenceRequest}
        uploadOpen={uploadOpen}
        setUploadOpen={setUploadOpen}
        setCaptureEmpty={setCaptureEmpty}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        webcamRef={webcamRef}
        imageFormat={imageFormat}
        setImageFormat={setImageFormat}
        imageLabel={imageLabel}
        setImageLabel={setImageLabel}
        annotationEmpty={annotationEmpty}
        setAnnotationEmpty={setAnnotationEmpty}
        saveOpen={saveOpen}
        setSaveOpen={setSaveOpen}
        clear={clearCapture}
        capture={capture}
        saveImage={saveImage}
        savedImages={imageCache}
        clearImageCache={clearCache}
        loadImage={loadFromCache}
        canvasRef={canvasRef}
        removeImage={removeImage}
      />
    </HomeContainer>
  );
};

export default Home;
