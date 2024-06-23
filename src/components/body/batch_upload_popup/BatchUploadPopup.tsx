import styled from "styled-components";
import {
  Autocomplete,
  Box,
  Button,
  CardHeader,
  FilterOptionsState,
  FormControl,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  createFilterOptions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";
import React, { SyntheticEvent, useMemo } from "react";
import {
  batchUploadImage,
  batchUploadInit,
  requestClassList,
} from "../../../common/api";
import { BatchUploadMetadata, ClassData } from "../../../common/types";

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
  min-width: 100%;
  width: 100%;
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
  const [fileCount, setFileCount] = React.useState<number>(0);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [uploadTotalProgress, setUploadTotalProgress] =
    React.useState<number>(0);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const [seedId, setSeedId] = React.useState<string>("");
  const [zoom, setZoom] = React.useState<number>(1);
  const [seedCount, setSeedCount] = React.useState<number>(0);
  const [sessionId, setSessionId] = React.useState<string>("");

  const classList: ClassData[] = useMemo(() => {
    if (backendUrl === "" || backendUrl == null) {
      return [];
    };
    const classes: ClassData[] = [];
    const getClasses = () => {
      return requestClassList(backendUrl).then((response) => {
        return response.seeds;
      });
    };
    getClasses().then((data) => {
      for (let i = 0; i < data.length; i++) {
        classes.push({
          id: i,
          classId: data[i].seed_id,
          label: data[i].seed_name,
        });
      }
    });

    return classes;
  }, [backendUrl]);

  const defaultClass = useMemo(() => {
    return {
      id: -1,
      classId: "",
      label: "",
    };
  }, []);
  const [selectedClass, setSelectedClass] =
    React.useState<ClassData>(defaultClass);
  const filter = createFilterOptions<ClassData>();

  const filteredClassList = (
    options: ClassData[],
    params: FilterOptionsState<ClassData>,
  ): ClassData[] => {
    const { inputValue } = params;
    if (inputValue === "") {
      return options;
    }
    const filtered = filter(options, params);

    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.label);
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        ...defaultClass,
        label: `"${inputValue}"`,
      });
    }

    return filtered;
  };

  const getClassLabel = (option: string | ClassData): string => {
    return typeof option === "string" ? option : option.label;
  };

  const handleClassChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | ClassData | null,
  ) => {
    event.preventDefault();
    if (newValue == null) {
      setSelectedClass(defaultClass);
    } else if (typeof newValue === "string") {
      setSelectedClass({
        ...defaultClass,
        label: newValue,
      });
    } else {
      setSelectedClass(newValue);
    }
  };

  const uploadImage = (file: File): void => {
    if (file == null) {
      return;
    }
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
      batchUploadImage(backendUrl, data)
        .then((response) => {
          if (response) {
            console.log("Successfully uploaded image: ", file.name);
          }
          setUploadProgress((prev) => prev + 1);
        })
        .catch((error) => {
          console.error("Error uploading image: ", file.name);
          throw error;
        });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // TODO validation
    const files = event.target.files;
    if (files !== null) {
      console.log(files);
      setFiles(files);
      setFileCount(files.length);
    }
  };

  const handleUpload = (): void => {
    if (files === null) {
      return;
    }
    batchUploadInit(backendUrl, uuid, containerName, fileCount)
      .then((response) => {
        setSessionId(response.session_id);
        setUploading(true);
        setUploadProgress(0);
        setUploadError(null);
        uploadImage(files[0]);
        setUploadTotalProgress((prev) => prev + 1);
      })
      .catch((error) => {
        setUploadError(error.toString());
      });
    setUploading(false);
  };

  const handleClose = (): void => {
    // setUploadError(null);
    setBatchUploadOpen(false);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: "fit-content",
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
          sx={{
            width: "100%",
           }}
        />
        <InfoContainer>
          <FormControl>
            {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
            {uploading && (
              <Stack spacing={2}>
                <LinearProgress
                  variant="determinate"
                  value={(uploadTotalProgress / fileCount) * 100}
                  sx={{ width: "100%", marginBottom: "20px" }}
                />
                <LinearProgress
                  variant="indeterminate"
                  sx={{ width: "100%", marginBottom: "20px" }}
                />
              </Stack>
            )}
            <Autocomplete
              id="seed-class"
              renderInput={(params) => <TextField {...params} label="Class" />}
              options={classList}
              value={selectedClass}
              onChange={handleClassChange}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              filterOptions={filteredClassList}
              disablePortal
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              freeSolo={false}
              getOptionLabel={getClassLabel}
              sx={{
                marginTop: "5px",
                width: "100%",
              }}
            />
            <TextField
              id="seed-count"
              label="Seed Count"
              variant="outlined"
              type="number"
              onChange={(e) => setSeedCount(parseInt(e.target.value))}
              sx={{
                marginTop: "5px",
                width: "100%",
              }}
            />
            <TextField
              id="zoom-level"
              label="Zoom Level"
              variant="outlined"
              type="number"
              onChange={(e) => setZoom(parseInt(e.target.value))}
              sx={{
                marginTop: "5px",
                width: "100%",
              }}
            />
            <TextField
              id="file-input"
              label="Outlined"
              variant="outlined"
              type="file"
              inputProps={{
                multiple: true,
              }}
              onChange={handleChange}
              sx={{
                marginTop: "5px",
                width: "100%",
              }}
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
