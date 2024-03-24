// \pages\classifier\index.tsx
// Classifier
import {
  RowContainer,
  LeftContent,
  ColumnContainer,
  InfoContent,
} from "./indexElements";
import type Webcam from "react-webcam";
import React from "react";
import { MicroscopeFeed } from "../../components/body/microscope_feed";
import { ClassificationResults } from "../../components/body/classification_results";
import { ImageCache } from "../../components/body/image_cache";
import { StorageDirectory } from "../../components/body/directory_list";

interface params {
  imageSrc: string;
  webcamRef: React.RefObject<Webcam>;
  imageFormat: string;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  capture: () => void;
  savedImages: any[];
  clearImageCache: () => void;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleInference: () => void;
  removeImage: (string: any) => void;
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchDeviceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageIndex: number;
  activeDeviceId: string | undefined;
  azureStorageDir: any;
  curDir: string;
  setCreateDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDirChange: (dir: string) => void;
  setDelDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResultsTunerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scoreThreshold: number;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  labelOccurrences: any;
  switchTable: boolean;
  setSwitchTable: React.Dispatch<React.SetStateAction<boolean>>;
  setCurDir: React.Dispatch<React.SetStateAction<string>>;
  modelDisplayName: string;
  windowSize: {
    width: number;
    height: number;
  };
  isWebcamActive: boolean;
  onCaptureClick: () => void;
  onImageUpload: (file: File) => void;
  isLoading: boolean; // Add this line
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
            isLoading={props.isLoading}
            canvasRef={props.canvasRef}
            setSaveOpen={props.setSaveOpen}
            handleInference={props.handleInference}
            setSwitchModelOpen={props.setSwitchModelOpen}
            imageCache={props.savedImages}
            imageIndex={props.imageIndex}
            setUploadOpen={props.setUploadOpen}
            isWebcamActive={props.isWebcamActive}
            onCaptureClick={props.onCaptureClick}
          />
        </LeftContent>
        <InfoContent>
          <StorageDirectory
            azureStorageDir={props.azureStorageDir}
            curDir={props.curDir}
            handleDirChange={props.handleDirChange}
            setCreateDirectoryOpen={props.setCreateDirectoryOpen}
            setDelDirectoryOpen={props.setDelDirectoryOpen}
            windowSize={props.windowSize}
            setCurDir={props.setCurDir}
          />
          <ImageCache
            removeImage={props.removeImage}
            savedImages={props.savedImages}
            setImageIndex={props.setImageIndex}
            windowSize={props.windowSize}
            clearImageCache={props.clearImageCache}
            imageIndex={props.imageIndex}
          />
          <ClassificationResults
            scoreThreshold={props.scoreThreshold}
            setResultsTunerOpen={props.setResultsTunerOpen}
            savedImages={props.savedImages}
            imageSrc={props.imageSrc}
            windowSize={props.windowSize}
            imageIndex={props.imageIndex}
            selectedLabel={props.selectedLabel}
            setSelectedLabel={props.setSelectedLabel}
            labelOccurrences={props.labelOccurrences}
            switchTable={props.switchTable}
            setSwitchTable={props.setSwitchTable}
            modelDisplayName={props.modelDisplayName}
          />
        </InfoContent>
      </RowContainer>
    </ColumnContainer>
  );
};

export default Classifier;
