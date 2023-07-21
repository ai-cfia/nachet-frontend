import {
  HomeContainer,
  LeftContent,
  RightContent,
  BottomContent,
  InfoContent,
} from "./indexElements";
import type Webcam from "react-webcam";
import React from "react";
import FeedCapture from "../../components/body/feed_capture";
import MicroscopeFeed from "../../components/body/microscope_feed";
import Results from "../../components/body/prediction_results";
import ImageCache from "../../components/body/image_cache";

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
  loadImage: (src: string) => void;
  uploadOpen: boolean;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleInference: () => void;
  removeImage: (string: any) => void;
}

const Classifier: React.FC<params> = (props) => {
  return (
    <HomeContainer>
      <LeftContent>
        <MicroscopeFeed
          capture={props.capture}
          webcamRef={props.webcamRef}
          imageFormat={props.imageFormat}
        />
      </LeftContent>
      <RightContent>
        <FeedCapture
          handleInference={props.handleInference}
          canvasRef={props.canvasRef}
          imageSrc={props.imageSrc}
          imageFormat={props.imageFormat}
          setImageFormat={props.setImageFormat}
          imageLabel={props.imageLabel}
          setImageLabel={props.setImageLabel}
          captureEmpty={props.captureEmpty}
        />
        <BottomContent>
          <ImageCache
            saveOpen={props.saveOpen}
            removeImage={props.removeImage}
            savedImages={props.savedImages}
            loadImage={props.loadImage}
            setSaveOpen={props.setSaveOpen}
            clearImageCache={props.clearImageCache}
            setUploadOpen={props.setUploadOpen}
            uploadOpen={props.uploadOpen}
          />
        </BottomContent>
      </RightContent>
      <InfoContent>
        <Results savedImages={props.savedImages} imageSrc={props.imageSrc} />
      </InfoContent>
    </HomeContainer>
  );
};

export default Classifier;
