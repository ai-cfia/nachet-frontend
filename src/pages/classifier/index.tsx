import {
  RowContainer,
  LeftContent,
  RightContent,
  ColumnContainer,
  InfoContent,
} from "./indexElements";
import type Webcam from "react-webcam";
import React from "react";
import FeedCapture from "../../components/body/feed_capture";
import MicroscopeFeed from "../../components/body/microscope_feed";
import ClassificationResults from "../../components/body/classification_results";
import ImageCache from "../../components/body/image_cache";
// import ToolBar from "../../components/body/tool_bar";
import StorageDirectory from "../../components/body/storage_directory";

interface params {
  imageSrc: string;
  webcamRef: React.RefObject<Webcam>;
  imageFormat: string;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  capture: () => void;
  savedImages: any[];
  clearImageCache: () => void;
  loadImage: (index: number) => void;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleInference: () => void;
  removeImage: (string: any) => void;
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchDeviceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageIndex: number;
  activeDeviceId: string | undefined;
  azureStorageDir: any[];
  curDir: string;
  setCreateDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDirChange: (dir: string) => void;
  windowSize: {
    width: number;
    height: number;
  };
}

const Classifier: React.FC<params> = (props) => {
  return (
    <ColumnContainer>
      <RowContainer>
        <LeftContent>
          <MicroscopeFeed
            capture={props.capture}
            webcamRef={props.webcamRef}
            windowSize={props.windowSize}
            activeDeviceId={props.activeDeviceId}
            setSwitchDeviceOpen={props.setSwitchDeviceOpen}
          />
        </LeftContent>
        <RightContent>
          <FeedCapture
            canvasRef={props.canvasRef}
            windowSize={props.windowSize}
            setSaveOpen={props.setSaveOpen}
            handleInference={props.handleInference}
            setUploadOpen={props.setUploadOpen}
            setSwitchModelOpen={props.setSwitchModelOpen}
          />
        </RightContent>
        <InfoContent>
          <StorageDirectory
            azureStorageDir={props.azureStorageDir}
            curDir={props.curDir}
            handleDirChange={props.handleDirChange}
            setCreateDirectoryOpen={props.setCreateDirectoryOpen}
          />
          <ImageCache
            removeImage={props.removeImage}
            savedImages={props.savedImages}
            loadImage={props.loadImage}
            windowSize={props.windowSize}
            clearImageCache={props.clearImageCache}
          />
          <ClassificationResults
            savedImages={props.savedImages}
            imageSrc={props.imageSrc}
            windowSize={props.windowSize}
            imageIndex={props.imageIndex}
          />
        </InfoContent>
      </RowContainer>
    </ColumnContainer>
  );
};

export default Classifier;
