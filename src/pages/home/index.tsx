import { HomeContainer } from "./indexElements";
import Classifier from "../classifier";
import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import SavePopup from "../../components/body/save_popup";
import UploadPopup from "../../components/body/upload_image";
import { saveAs } from "file-saver";
import ImageAnnotation from "../../components/body/image_annotation";

interface ImageCache {
  label: string;
  src: string;
  confidence: number;
  prediction: string;
  region: Array<number>;
  annotated: boolean;
}
// connect classification to saved images
// connect annotation to saved images
// fix image count
// set up backend fetch
// show backend information in results section

const Home = () => {
  const [captureEmpty, setCaptureEmpty] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string>(
    "https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg"
  );
  const [imageFormat, setImageFormat] = useState<string>("image/png");
  const [imageLabel, setImageLabel] = useState<string>("");
  const [annotationEmpty, setAnnotationEmpty] = useState<boolean>(true);
  const [saveOpen, setSaveOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [annotationOpen, setAnnotationOpen] = useState<boolean>(false);
  const [imageCount, setImageCount] = useState<number>(0);
  const [imageCache, setImageCache] = useState<ImageCache[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cache_image = (
    label: string,
    src: string,
    confidence: number,
    prediction: string,
    region: Array<number>,
    annotated: boolean
  ) => {
    // does not increment image count, fix it
    setImageCount((imageCount) => imageCount + 1);
    setImageCache((prevCache) => [
      ...prevCache,
      {
        label: label,
        src: src,
        confidence: confidence,
        prediction: prediction,
        region: region,
        annotated: annotated,
      },
    ]);
  };

  const capture = useCallback(() => {
    const src = webcamRef.current!.getScreenshot();
    setImageSrc(src!);
    setCaptureEmpty(false);
    cache_image(`Capture: ${imageCount}`, src!, 0, "", [], false);
  }, [webcamRef]);

  const upload_image = (event: any) => {
    event.preventDefault();
    const src = URL.createObjectURL(event.target.files[0]);
    setImageSrc(src);
    cache_image(`Capture: ${imageCount}`, src!, 0, "", [], false);
    setUploadOpen(false);
    setCaptureEmpty(false);
  };

  const load_from_cache = (event: any) => {
    event.preventDefault();
    const src = event.target.getAttribute("data-value");
    setImageSrc(src);
    setCaptureEmpty(false);
  };

  const check_cache_empty = () => {
    if (imageCache.length === 1) {
      clear_capture();
    }
  };

  const remove_image = (event: any) => {
    event.preventDefault();
    const src = event.target.getAttribute("data-value");
    const newCache = imageCache.filter((item) => item.src !== src);
    setImageCache(newCache);
    // does not decrement image count, fix it
    setImageCount((imageCount) => imageCount - 1);
    if (newCache.length > 0) {
      setImageSrc(newCache[newCache.length - 1].src);
    }
    check_cache_empty();
  };

  const clear_capture = () => {
    setImageSrc(
      "https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg"
    );
    setCaptureEmpty(true);
    setImageLabel("");
  };

  const clear_cache = () => {
    // this does not clear the cache, fix it
    setImageCache([]);
    setImageCount(0);
    check_cache_empty();
  };

  const save_image = () => {
    saveAs(
      imageSrc,
      `${imageLabel}-${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}.${imageFormat.split("/")[1]}`
    );
    setSaveOpen!(false);
  };

  const handleFormat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImageFormat(event.target.value);
  };

  const handleLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageLabel(event.target.value);
  };

  const handle_inference_request = () => {
    let region = [100, 100, 100, 100];
    let prediction = "Canola";
    let confidence = 0.9;
    imageCache.forEach((item) => {
      if (item.src === imageSrc) {
        item.confidence = confidence;
        item.prediction = prediction;
        item.region = region;
        item.annotated = true;
      }
    });
    load_to_canvas();
  };

  const load_to_canvas = () => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas!.getContext("2d");
      canvas!.width = image.width;
      canvas!.height = image.height;
      ctx!.drawImage(image, 0, 0);
      imageCache.forEach((item) => {
        ctx!.beginPath();
        if (item.src === imageSrc && item.annotated === true) {
          ctx!.font = "20px Arial";
          ctx!.fillStyle = "red";
          ctx!.fillText(
            item.prediction,
            item.region[0] - 2,
            item.region[1] - 5
          );
          ctx!.lineWidth = 3;
          ctx!.setLineDash([5, 5]);
          ctx!.strokeStyle = "red";
          ctx!.rect(
            item.region[0],
            item.region[1],
            item.region[2],
            item.region[3]
          );
          ctx!.stroke();
        }
        ctx!.font = "20px Arial";
        ctx!.fillStyle = "white";
        ctx!.fillText(item.label, 10, canvas!.height - 15);
        ctx!.stroke();
      });
    };
  };

  useEffect(() => {
    load_to_canvas();
  }, [imageSrc]);

  return (
    <HomeContainer>
      {saveOpen === true && (
        <SavePopup
          saveOpen={saveOpen}
          setSaveOpen={setSaveOpen}
          saveImage={save_image}
          imageFormat={imageFormat}
          imageLabel={imageLabel}
          setImageFormat={setImageFormat}
          setImageLabel={setImageLabel}
          handleFormat={handleFormat}
          handleLabel={handleLabel}
        />
      )}
      {uploadOpen === true && (
        <UploadPopup
          setImageSrc={setImageSrc}
          capture={capture}
          uploadOpen={uploadOpen}
          setUploadOpen={setUploadOpen}
          uploadImage={upload_image}
        />
      )}
      {annotationOpen === true && (
        <ImageAnnotation
          imageSrc={imageSrc}
          annotationOpen={annotationOpen}
          setAnnotationOpen={setAnnotationOpen}
        />
      )}
      <Classifier
        captureEmpty={captureEmpty}
        handleInference={handle_inference_request}
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
        clear={clear_capture}
        capture={capture}
        saveImage={save_image}
        annotationOpen={annotationOpen}
        setAnnotationOpen={setAnnotationOpen}
        savedImages={imageCache}
        clearImageCache={clear_cache}
        loadImage={load_from_cache}
        canvasRef={canvasRef}
        removeImage={remove_image}
      />
    </HomeContainer>
  );
};

export default Home;
