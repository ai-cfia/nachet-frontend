import {
  HomeContainer,
  LeftContent,
  RightContent,
  BottomContent,
  ControlContent,
  InfoContent,
} from "./indexElements";
import Webcam from "react-webcam";
import React from "react";
import FeedCapture from "../../components/body/feed_capture";
import MicroscopeFeed from "../../components/body/microscope_feed";
import FeedControl from "../../components/body/feed_control";
import ClassificationTools from "../../components/body/classification_tools";
import Results from "../../components/body/prediction";
import Annotations from "../../components/body/annotations";

type params = {
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
  clear: () => void;
  saveImage: () => void;
  capture: () => void;
  annotationOpen: boolean;
  setAnnotationOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Classifier: React.FC<params> = (props) => {
  return (
    <HomeContainer>
      <ControlContent>
        <FeedControl
          captureEmpty={props.captureEmpty}
          capture={props.capture}
          setSaveOpen={props.setSaveOpen}
          clear={props.clear}
        />
        <ClassificationTools
          captureEmpty={props.captureEmpty}
          annotationEmpty={props.annotationEmpty}
          setAnnotationOpen={props.setAnnotationOpen}
          annotationOpen={props.annotationOpen}
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
        <Results />
        <Annotations />
      </InfoContent>
    </HomeContainer>
  );
};

export default Classifier;
