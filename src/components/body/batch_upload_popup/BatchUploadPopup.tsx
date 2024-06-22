import styled from "styled-components";
import {
  Box,
  Button,
  CardHeader,
  FormControl,
  IconButton,
  Input,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";
import React from "react";
import { useBackendUrl } from "../../../hooks";
import { batchUploadImage, batchUploadInit } from "../../../common/api";
import { BatchUploadMetadata } from "../../../common/types";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    visibility 0.5s,
    opacity 0.5s;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1vw;
  padding-right: 1vw;
  margin-top: 1vh;
  margin-bottom: 3vh;
`;

interface params {
  setBatchUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backendUrl: string;
  containerName: string;
  uuid: string;
}

const BatchUploadPopup: React.FC<params> = (props): JSX.Element => {
  const { setBatchUploadOpen, containerName, uuid, backendUrl } = props;

  const [files, setFiles] = React.useState<FileList | null>(null);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const [seedId, setSeedId] = React.useState<string>("");
  const [zoom, setZoom] = React.useState<number>(1);
  const [seedCount, setSeedCount] = React.useState<number>(0);
  const [sessionId, setSessionId] = React.useState<string>("");

  const uploadImage = (file: File): void => {
      if (file !== undefined) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result !== "string") {
            return;
          }
          const data: BatchUploadMetadata = {
            containerName: containerName,
            uuid: uuid,
            seedId: seedId,
            zoom: zoom,
            seedCount: seedCount,
            imageDataUrl: reader.result,
            sessionId: sessionId,
          };
          batchUploadImage(backendUrl, data).then((response) => {
            if (response) {
              console.log("Successfully uploaded image: ", file.name);
            }
            setUploadProgress((prev) => prev + 1);
          }).catch((error) => {
            console.error("Error uploading image: ", file.name);
            throw error;
          });
        };
        reader.readAsDataURL(file);
      };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // TODO validation
    const files = event.target.files;
    if (files !== null) {
      console.log(files);
      setFiles(files);
    }
  };

  const handleUpload = (): void => {
    if (files === null) {
      return;
    }
    batchUploadInit(backendUrl, uuid, containerName, files.length)
      .then((response) => {
        setSessionId(response.session_id);
        setUploading(true);
        setUploadProgress(0);
        setUploadError(null);
      })
      .catch((error) => {
        setUploadError(error.toString());
      });
    setUploading(false);
  };

  const handleClose = (): void => {
    setBatchUploadOpen(false);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: "20vw",
          height: "fit-content",
          zIndex: 30,
          border: `0.01vh solid LightGrey`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
        boxShadow={1}
      >
        <CardHeader
          title="Load Image"
          titleTypographyProps={{
            variant: "h6",
            align: "left",
            fontWeight: 600,
            fontSize: "1.3vh",
            color: colours.CFIA_Font_Black,
            zIndex: 30,
          }}
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
          sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
        />
        <InfoContainer>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              type="file"
              inputProps={{
                multiple: true,
              }}
              onChange={handleChange}
            />
            {/* <input
            type="file"
            onChange={uploadImage}
            style={{
              minWidth: "100%",
              width: "100%",
              fontSize: "0.7vw",
            }}
            multiple
          /> */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "green",
                    opacity: 0.6,
                  },
                  marginRight: "10px",
                }}
                onClick={handleUpload}
              >
                Upload
              </Button>
              <Button
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "red",
                    opacity: 0.5,
                  },
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </FormControl>
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default BatchUploadPopup;
