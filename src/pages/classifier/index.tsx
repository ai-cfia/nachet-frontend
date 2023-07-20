import {
  HomeContainer,
  LeftContent,
  RightContent,
  BottomContent,
  ControlContent,
  InfoContent,
} from "./indexElements";
import type Webcam from "react-webcam";
import React from "react";
import FeedCapture from "../../components/body/feed_capture";
import MicroscopeFeed from "../../components/body/microscope_feed";
import FeedControl from "../../components/body/feed_control";
import ClassificationTools from "../../components/body/classification_tools";
import Results from "../../components/body/results";
import Annotations from "../../components/body/annotations";

interface params {
  captureEmpty: boolean;
  setCaptureEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  imageSrc: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  webcamRef: React.RefObject<Webcam>;
  imageFormat: string;
  setImageFormat: React.Dispatch<React.SetStateAction<string>>;
  imageLabel: string;
  setImageLabel: React.Dispatch<React.SetStateAction<string>>;
  setAnnotationEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  annotationEmpty: boolean;
  saveOpen: boolean;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  saveImage: () => void;
  capture: () => void;
  savedImages: any[];
  clearImageCache: () => void;
  loadImage: (event: any) => void;
  uploadOpen: boolean;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleInference: () => void;
  removeImage: (event: any) => void;
}

const Classifier: React.FC<params> = (props) => {
  return (
    <HomeContainer>
      <ControlContent>
        <FeedControl
          captureEmpty={props.captureEmpty}
          capture={props.capture}
          setSaveOpen={props.setSaveOpen}
          clearImageCache={props.clearImageCache}
          setUploadOpen={props.setUploadOpen}
          uploadOpen={props.uploadOpen}
        />
        <ClassificationTools
          captureEmpty={props.captureEmpty}
          annotationEmpty={props.annotationEmpty}
          handleInference={props.handleInference}
        />
      </ControlContent>
      <LeftContent>
        <MicroscopeFeed
          webcamRef={props.webcamRef}
          imageFormat={props.imageFormat}
        />
      </LeftContent>
      <RightContent>
        <FeedCapture
          canvasRef={props.canvasRef}
          imageSrc={props.imageSrc}
          imageFormat={props.imageFormat}
          setImageFormat={props.setImageFormat}
          imageLabel={props.imageLabel}
          setImageLabel={props.setImageLabel}
          captureEmpty={props.captureEmpty}
        />
        <BottomContent></BottomContent>
      </RightContent>
      <InfoContent>
        <Results savedImages={props.savedImages} imageSrc={props.imageSrc} />
        <Annotations
          removeImage={props.removeImage}
          savedImages={props.savedImages}
          loadImage={props.loadImage}
        />
      </InfoContent>
    </HomeContainer>
  );
};

export default Classifier;
