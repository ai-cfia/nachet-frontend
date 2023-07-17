import { HomeContainer } from "./indexElements";
import Classifier from "../classifier";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import SavePopup from "../../components/body/save_popup";
import UploadPopup from "../../components/body/upload_image";
import { saveAs } from "file-saver";
import ImageAnnotation from "../../components/body/image_annotation";

type savedImageItem = {
  label: string;
  src: string | null;
};

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
  const webcamRef = useRef<Webcam>(null);

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
      />
    </HomeContainer>
  );
};

export default Home;
