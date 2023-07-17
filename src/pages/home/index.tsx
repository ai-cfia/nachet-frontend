import { HomeContainer } from "./indexElements";
import Classifier from "../classifier";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import SavePopup from "../../components/body/save_popup";
import { saveAs } from "file-saver";
import ImageAnnotation from "../../components/body/image_annotation";

const Home = () => {
  const [captureEmpty, setCaptureEmpty] = useState(true);
  const [imageSrc, setImageSrc] = useState(
    "https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg"
  );
  const [imageFormat, setImageFormat] = useState("image/png");
  const [imageLabel, setImageLabel] = useState<string>("");
  const [annotationEmpty, setAnnotationEmpty] = useState(true);
  const [saveOpen, setSaveOpen] = useState(false);
  const [annotationOpen, setAnnotationOpen] = useState(false);
  // create use state to store all saved images with their labels
  const [savedImages, setSavedImages] = useState({});
  const [generatedLabels, setGeneratedLabels] = useState(0);

  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const src = webcamRef.current!.getScreenshot();
    setImageSrc(src!);
    setCaptureEmpty(false);
    setSavedImages((prevDictionary) => ({
      ...prevDictionary,
      [`Capture: ${generatedLabels}`]: src,
    }));
    setGeneratedLabels(generatedLabels + 1);
  }, [webcamRef]);

  const clear = () => {
    setImageSrc(
      "https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg"
    );
    setCaptureEmpty(true);
    setImageLabel("");
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
      {annotationOpen === true && (
        <ImageAnnotation
          imageSrc={imageSrc}
          annotationOpen={annotationOpen}
          setAnnotationOpen={setAnnotationOpen}
        />
      )}
      <Classifier
        captureEmpty={captureEmpty}
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
      />
    </HomeContainer>
  );
};

export default Home;
