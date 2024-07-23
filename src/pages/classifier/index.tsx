// \pages\classifier\index.tsx
// Classifier
import type Webcam from "react-webcam";
import React from "react";
import ClassificationResults from "../../components/body/classification_results";
import ImageCache from "../../components/body/image_cache";
import StorageDirectory from "../../components/body/directory_list";
import MicroscopeFeed from "../../components/body/microscope_feed";
import { Grid } from "@mui/material";

interface params {
  imageSrc: string;
  webcamRef: React.RefObject<Webcam>;
  imageFormat: string;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  capture: () => void;
  savedImages: any[];
  clearImageCache: () => void;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setBatchUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  toggleShowInference: (state: boolean) => void;
  backendUrl: string;
  uuid: string;
}

const Classifier: React.FC<params> = (props) => {
  return (
    // <ColumnContainer>
    <Grid
      container
      columnSpacing={1}
      sx={{
        display: "flex",
        alignItems: "normal",
        justifyContent: "center",
        marginLeft: "40px",
        marginRight: "40px",
        paddingLeft: "40px",
        paddingRight: "40px",
        minHeight: "70vh",
        maxHeight: "80vh",
      }}
    >
      <Grid container item xs>
        <StorageDirectory
          azureStorageDir={props.azureStorageDir}
          curDir={props.curDir}
          handleDirChange={props.handleDirChange}
          setCreateDirectoryOpen={props.setCreateDirectoryOpen}
          setDelDirectoryOpen={props.setDelDirectoryOpen}
          setCurDir={props.setCurDir}
        />
      </Grid>
      <Grid
        container
        item
        xs={7.5}
        sx={{
          alignItems: "normal",
          justifyContent: "center",
        }}
      >
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
          setBatchUploadOpen={props.setBatchUploadOpen}
          setUploadOpen={props.setUploadOpen}
          isWebcamActive={props.isWebcamActive}
          onCaptureClick={props.onCaptureClick}
          toggleShowInference={props.toggleShowInference}
          backendUrl={props.backendUrl}
          uuid={props.uuid}
        />
      </Grid>
      <Grid container item xs direction={"column"} spacing={1}>
        <Grid item xs={6}>
          <ImageCache
            removeImage={props.removeImage}
            savedImages={props.savedImages}
            setImageIndex={props.setImageIndex}
            windowSize={props.windowSize}
            clearImageCache={props.clearImageCache}
            imageIndex={props.imageIndex}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <ClassificationResults
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
        </Grid>
      </Grid>

      {/* <LeftContent>
        </LeftContent>
        <InfoContent>
        </InfoContent> */}
    </Grid>
    // </ColumnContainer>
  );
};

export default Classifier;
