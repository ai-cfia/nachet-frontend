import {
  RowContainer,
  LeftContent,
  RightContent,
  InfoContent,
  TopContent,
  ColumnContainer,
} from "./indexElements";
import type Webcam from "react-webcam";
import React from "react";
import FeedCapture from "../../components/body/feed_capture";
import MicroscopeFeed from "../../components/body/microscope_feed";
import ClassificationResults from "../../components/body/classification_results";
import ImageCache from "../../components/body/image_cache";
import ToolBar from "../../components/body/tool_bar";

interface params {
  imageSrc: string;
  webcamRef: React.RefObject<Webcam>;
  imageFormat: string;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  capture: () => void;
  savedImages: any[];
  clearImageCache: () => void;
  loadImage: (src: string) => void;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleInference: () => void;
  removeImage: (string: any) => void;
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAzureOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Classifier: React.FC<params> = (props) => {
  return (
    <ColumnContainer>
      <TopContent>
        <ToolBar
          setSaveOpen={props.setSaveOpen}
          clearImageCache={props.clearImageCache}
          handleInference={props.handleInference}
          capture={props.capture}
          setUploadOpen={props.setUploadOpen}
          setSwitchModelOpen={props.setSwitchModelOpen}
          setAzureOpen={props.setAzureOpen}
        />
      </TopContent>
      <RowContainer>
        <LeftContent>
          <MicroscopeFeed
            capture={props.capture}
            webcamRef={props.webcamRef}
            imageFormat={props.imageFormat}
          />
        </LeftContent>
        <RightContent>
          <FeedCapture canvasRef={props.canvasRef} />
        </RightContent>
        <InfoContent>
          <ClassificationResults
            savedImages={props.savedImages}
            imageSrc={props.imageSrc}
          />
          <ImageCache
            removeImage={props.removeImage}
            savedImages={props.savedImages}
            loadImage={props.loadImage}
          />
        </InfoContent>
      </RowContainer>
    </ColumnContainer>
  );
};

export default Classifier;
