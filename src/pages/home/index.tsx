import { HomeContainer } from "./indexElements";
import Classifier from "../classifier";
import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import SavePopup from "../../components/body/save_popup";
import UploadPopup from "../../components/body/upload_image";
import { saveAs } from "file-saver";
import ImageAnnotation from "../../components/body/image_annotation";

type savedImageItem = {
  label: string;
  src: string | null;
};

// connect clear image to saved images
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
  //const [imageCount, setImageCount] = useState<number>(0);
  const [savedImages, setSavedImages] = useState<savedImageItem[]>([]);
  const [inferenceResponse, setInferenceResponse] = useState(null);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let imageCount = 0;

  const capture = useCallback(() => {
    const src = webcamRef.current!.getScreenshot();
    setImageSrc(src!);
    setCaptureEmpty(false);
    imageCount++;
    setSavedImages((prevImages) => [
      ...prevImages,
      {
        label: `Capture: ${imageCount}`,
        src: src,
      },
    ]);
  }, [webcamRef]);

  const uploadImage = (event: any) => {
    event.preventDefault();
    const src = URL.createObjectURL(event.target.files[0]);
    setImageSrc(src);
  };

  const submitImage = () => {
    setCaptureEmpty(false);
    imageCount++;
    setSavedImages((prevImages) => [
      ...prevImages,
      {
        label: `Capture: ${imageCount}`,
        src: imageSrc,
      },
    ]);
    setUploadOpen(false);
  };

  const loadImage = (event: any) => {
    event.preventDefault();
    const src = event.target.getAttribute("data-value");
    setImageSrc(src);
    setCaptureEmpty(false);
  };

  const clear = () => {
    setImageSrc(
      "https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg"
    );
    setCaptureEmpty(true);
    setImageLabel("");
  };

  const clearImageCache = () => {
    setSavedImages([]);
    imageCount = 1;
  };

  const saveImage = () => {
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

  const drawBoundingBox = (
    confidence: number,
    prediction: string,
    region: Array<number>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    ctx!.beginPath();
    ctx!.lineWidth = 5;
    ctx!.strokeStyle = "red";
    ctx!.rect(300, 300, 200, 200);
    ctx!.stroke();
  };

  const handleInference = () => {
   
    fetch("../sim.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setInferenceResponse(myJson);
      });

    drawBoundingBox(0.9, "Canola", [20, 20, 50, 50]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    const loadImageToCanvas = () => {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        canvas!.width = image.width;
        canvas!.height = image.height;
        context!.drawImage(image, 0, 0);
      };
    };

    loadImageToCanvas();
  }, [imageSrc]);

  return (
    <HomeContainer>
      {saveOpen === true && (
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
      {uploadOpen === true && (
        <UploadPopup
          setImageSrc={setImageSrc}
          capture={capture}
          uploadOpen={uploadOpen}
          setUploadOpen={setUploadOpen}
          uploadImage={uploadImage}
          submitImage={submitImage}
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
        handleInference={handleInference}
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
        clear={clear}
        capture={capture}
        saveImage={saveImage}
        annotationOpen={annotationOpen}
        setAnnotationOpen={setAnnotationOpen}
        savedImages={savedImages}
        clearImageCache={clearImageCache}
        loadImage={loadImage}
        canvasRef={canvasRef}
      />
    </HomeContainer>
  );
};

export default Home;
