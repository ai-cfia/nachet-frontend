// \pages\classifier\index.tsx
// Classifier
import {
  RowContainer,
  LeftContent,
  ColumnContainer,
  InfoContent,
  WarningLabel,
} from "./indexElements";
import type Webcam from "react-webcam";
import React, { useState, useEffect } from "react";
import MicroscopeFeed from "../../components/body/microscope_feed";
import ClassificationResults from "../../components/body/classification_results";
import ImageCache from "../../components/body/image_cache";
import StorageDirectory from "../../components/body/directory_list";

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
  backendURL: string | null;
  windowSize: {
    width: number;
    height: number;
  };
  isWebcamActive: boolean;
  onCaptureClick: () => void;
  onImageUpload: (file: File) => void;
}

const Classifier: React.FC<params> = (props) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Set a delay before checking the backend URL
    const delay = 3000; // Delay in milliseconds (3000ms = 3 seconds)

    const timer = setTimeout(() => {
      // Explicitly check for null, undefined, or empty string
      if (
        props.backendURL === null ||
        props.backendURL === undefined ||
        props.backendURL === ""
      ) {
        setIsError(true);
        setAlertMessage("Backend URL is not set or is not working.");
      } else {
        setIsError(false);
      }
    }, delay);

    // Clear the timer when the component unmounts or when the backendURL changes
    return () => {
      clearTimeout(timer);
    };
  }, [props.backendURL]);

  return (
    <ColumnContainer>
      <>
        {isError && (
          <>{isError && <WarningLabel>{alertMessage}</WarningLabel>}</>
        )}
      </>
      <RowContainer>
        <LeftContent>
          <MicroscopeFeed
            capture={props.capture}
            webcamRef={props.webcamRef}
            windowSize={props.windowSize}
            activeDeviceId={props.activeDeviceId}
            setSwitchDeviceOpen={props.setSwitchDeviceOpen}
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
          />
        </InfoContent>
      </RowContainer>
    </ColumnContainer>
  );
};

export default Classifier;
