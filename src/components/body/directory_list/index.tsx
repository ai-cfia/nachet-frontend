import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Box,
  CardHeader,
  IconButton,
} from "@mui/material";
import { colours } from "../../../styles/colours";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import FilterIcon from "@mui/icons-material/Filter";

interface params {
  azureStorageDir: any;
  curDir: string;
  setCurDir: React.Dispatch<React.SetStateAction<string>>;
  setCreateDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDelDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDirChange: (dir: string) => void;
  windowSize: {
    width: number;
    height: number;
  };
}
const StorageDirectory: React.FC<params> = (props) => {
  const handleDelete = (folder: string): void => {
    props.handleDirChange(folder);
    props.setDelDirectoryOpen(true);
  };
  const handleSelect = (folder: string): void => {
    if (folder === props.curDir) {
      props.handleDirChange("General");
    } else {
      props.handleDirChange(folder);
    }
  };
  const handleCreateDirectory = (): void => {
    props.setCreateDirectoryOpen(true);
    props.setCurDir("");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "22.23vh",
        border: `0.01vh solid LightGrey`,
        borderRadius: "0.4vh",
      }}
      boxShadow={0}
    >
      <CardHeader
        title="DIRECTORIES"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.3vh",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "0.8vh 1vh 0.8vh 0.8vh" }}
        action={
          <div>
            <IconButton
              sx={{ padding: 0, marginTop: "0.27vh", marginRight: "0.4vh" }}
              onClick={handleCreateDirectory}
            >
              <CreateNewFolderIcon
                style={{
                  color: colours.CFIA_Background_Blue,
                  fontSize: "2vh",
                  marginTop: "0.1vh",
                  marginBottom: "0.1vh",
                  marginRight: "0.1vh",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
            </IconButton>
          </div>
        }
      />
      <TableContainer
        sx={{
          overflow: "auto",
          height: "18.465vh", // 18.75
          maxHeight: "18.465vh",
          border: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTop: `0.01vh solid LightGrey`,
          borderBottom: 0,
          boxShadow: "none",
        }}
        id={"container_with_scrolls"}
      >
        <Table sx={{ borderBottom: 0 }}>
          <TableBody sx={{ borderBottom: 0 }}>
            {Object.keys(props.azureStorageDir).map(
              (folderKey: string, index: number) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor:
                      folderKey === props.curDir
                        ? "#F5F5F5"
                        : colours.CFIA_Background_White,
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                      transition: "0.1s ease-in-out all",
                    },
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{
                      cursor: "pointer",
                      paddingRight: 0,
                      fontSize: "1.1vh",
                      paddingTop: "0.5vh",
                      paddingBottom: "0.5vh",
                      paddingLeft: "0.8vh",
                      width: "10vw",
                      maxWidth: "10vw",
                      textOverflow: "break-word",
                      color: colours.CFIA_Font_Black,
                    }}
                    onClick={() => {
                      handleSelect(folderKey);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <FolderIcon
                        style={{
                          color: colours.CFIA_Background_Blue,
                          fontSize: "1.8vh",
                          marginTop: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingRight: "0.3vw",
                        }}
                      />
                      <span>{folderKey}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      cursor: "pointer",
                      fontSize: "1.15vh",
                      paddingTop: "0.5vh",
                      paddingBottom: "0.5vh",
                      paddingLeft: "0.8vh",
                      color: colours.CFIA_Font_Black,
                    }}
                    onClick={() => {
                      handleSelect(folderKey);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "flex-end",
                        alignContent: "center",
                        marginLeft: "1vw",
                      }}
                    >
                      <span style={{ marginRight: "0.1vw" }}>
                        {props.azureStorageDir[folderKey]}
                      </span>
                      <FilterIcon
                        style={{
                          color: colours.CFIA_Background_Blue,
                          fontSize: "1.7vh",
                          marginTop: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingLeft: "0.3vw",
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      cursor: "pointer",
                      paddingLeft: 0,
                      fontSize: "1.0vh",
                      paddingTop: "0.5vh",
                      paddingBottom: "0.5vh",
                      paddingRight: "0.8vh",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        handleDelete(folderKey);
                      }}
                      sx={{ padding: 0 }}
                      disabled={folderKey === "General"}
                    >
                      <CloseIcon
                        style={{
                          color: colours.CFIA_Background_Blue,
                          fontSize: "1.8vh",
                          marginTop: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StorageDirectory;
