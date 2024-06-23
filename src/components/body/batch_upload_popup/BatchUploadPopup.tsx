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
import React, { SyntheticEvent, useEffect, useMemo } from "react";
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
  const [zoom, setZoom] = React.useState<number>(0);
  const [seedCount, setSeedCount] = React.useState<number>(0);
  const [sessionId, setSessionId] = React.useState<string>("");

  const [classList, setClassList] = React.useState<ClassData[]>([]);

  const defaultClass = useMemo(() => {
    return {
      id: -1,
      classId: "",
      label: "",
    };
  }, []);
  const [selectedClass, setSelectedClass] = React.useState<ClassData | null>(
    null,
  );
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
      setSelectedClass(null);
    } else if (typeof newValue === "string") {
      setSelectedClass({
        ...defaultClass,
        label: newValue,
      });
    } else {
      setSelectedClass(newValue);
      setSeedId(newValue.classId);
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

  const handleFilesSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    // TODO validation
    const files = event.target.files;
    if (files !== null) {
      console.log(files);
      setFiles(files);
      setFileCount(files.length);
    }
  };

  const resetUpload = (): void => {
    setUploading(false);
    setUploadProgress(0);
    setUploadTotalProgress(0);
    setUploadError(null);
  };

  const resetForm = (): void => {
    setSelectedClass(null);
    setSeedCount(0);
    setZoom(0);
    setFiles(null);
    setFileCount(0);
    setSessionId("");
  };

  const handleUpload = (): void => {
    if (selectedClass == null) {
      setUploadError("Please select a class");
      return;
    }
    if (seedCount < 1) {
      setUploadError("Please enter a seed count");
      return;
    }
    if (zoom < 1) {
      setUploadError("Please enter a zoom level");
      return;
    }
    if (files == null || files.length === 0) {
      setUploadError("Please select an image");
      return;
    }

    //remove before pr
    if (uploadProgress) {
      console.log("Already uploading");
    }

    batchUploadInit(backendUrl, uuid, containerName, fileCount)
      .then((response) => {
        setSessionId(response.session_id);
        resetUpload();
        setUploading(true);

        //loop

        uploadImage(files[0]);
        setUploadTotalProgress((prev) => prev + 1);
      })
      .catch((error) => {
        setUploadError(error.toString());
      });

    resetUpload();
    resetForm();
  };

  const handleClose = (): void => {
    // setUploadError(null);
    setBatchUploadOpen(false);
  };

  const updateFileList = (): string => {
    if (files === null) {
      return "";
    }
    let fileList = "";
    for (let i = 0; i < files.length; i++) {
      fileList += String(i + 1) + " - " + files[i].name + "\n";
    }
    return fileList;
  };

  useEffect(() => {
    if (backendUrl === "" || backendUrl == null) {
      return;
    }
    requestClassList(backendUrl).then((response) => {
      const classes: ClassData[] = [];
      for (let i = 0; i < response.seeds.length; i++) {
        classes.push({
          id: i,
          classId: response.seeds[i].seed_id,
          label: response.seeds[i].seed_name,
        });
      }
      setClassList(classes);
    });
  }, [backendUrl]);

  return (
    <Overlay>
      <Box
        sx={{
          width: "20%",
          height: "fit-content",
          zIndex: 30,
          border: `0.01vh solid LightGrey`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
        boxShadow={1}
      >
        <CardHeader
          title="Batch Upload Images"
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
          sx={{
            display: "flex",
            width: "auto",
          }}
        />
        <InfoContainer>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
              id="input-seed-class"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Class"
                  error={selectedClass == null}
                />
              )}
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
                marginTop: "0px",
                width: "100%",
              }}
            />

            <TextField
              id="input-seed-count"
              label="Seed Count"
              variant="outlined"
              type="number"
              onChange={(e) => setSeedCount(parseInt(e.target.value))}
              sx={{
                marginTop: "10px",
                width: "100%",
              }}
              inputProps={{
                min: 1,
                max: 100,
                style: { textAlign: "center" },
              }}
              error={seedCount < 1}
            />
            <TextField
              id="input-zoom-level"
              label="Zoom Level"
              variant="outlined"
              type="number"
              onChange={(e) => setZoom(parseInt(e.target.value))}
              sx={{
                marginTop: "10px",
                width: "100%",
              }}
              inputProps={{
                min: 1,
                max: 100,
                style: { textAlign: "center" },
              }}
              error={zoom < 1}
            />

            <Button
              variant="contained"
              component="label"
              sx={{
                marginTop: "10px",
                width: "fit-content",
              }}
            >
              Select Files
              <input
                type="file"
                multiple
                onChange={handleFilesSelected}
                hidden
              />
            </Button>
            {/* scrollable list of file names */}
            {files && fileCount > 0 && (
              <TextField
                id="input-file-list"
                label=""
                variant="filled"
                value={updateFileList()}
                multiline
                maxRows={12}
                sx={{
                  width: "100%",
                }}
                inputProps={{
                  readOnly: true,
                  style: {
                    overflow: "scroll",
                    textWrap: "nowrap",
                    cursor: "pointer",
                  },
                }}
              />
            )}

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
