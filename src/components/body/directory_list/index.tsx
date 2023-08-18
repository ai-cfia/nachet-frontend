import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
  CardHeader,
  IconButton,
} from "@mui/material";
import { colours } from "../../../styles/colours";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CloseIcon from "@mui/icons-material/Close";

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
      props.handleDirChange("");
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
        border: `0.01vh solid ${colours.CFIA_Font_Black}`,
        borderRadius: "0.4vh",
      }}
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
        sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
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
                  marginTop: 0,
                  marginBottom: 0,
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
        }}
        id={"container_with_scrolls"}
        component={Paper}
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
                        ? colours.CFIA_Background_Blue
                        : colours.CFIA_Background_White,
                    "&:hover": {
                      backgroundColor: "#D3D3D3",
                      transition: "0.1s ease-in-out all",
                    },
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{
                      cursor: "pointer",
                      paddingRight: 0,
                      fontSize: "1.0vh",
                      paddingTop: "0.5vh",
                      paddingBottom: "0.5vh",
                      paddingLeft: "0.8vh",
                      color:
                        folderKey === props.curDir
                          ? colours.CFIA_Font_White
                          : colours.CFIA_Font_Black,
                    }}
                    onClick={() => {
                      handleSelect(folderKey);
                    }}
                  >
                    {folderKey}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      cursor: "pointer",
                      paddingRight: 0,
                      fontSize: "1.0vh",
                      paddingTop: "0.5vh",
                      paddingBottom: "0.5vh",
                      paddingLeft: "0.8vh",
                      color:
                        folderKey === props.curDir
                          ? colours.CFIA_Font_White
                          : colours.CFIA_Font_Black,
                    }}
                    onClick={() => {
                      handleSelect(folderKey);
                    }}
                  >
                    {props.azureStorageDir[folderKey]}
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
                    >
                      <CloseIcon
                        style={{
                          color: "red",
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
