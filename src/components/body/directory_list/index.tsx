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
// import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderOffIcon from "@mui/icons-material/FolderOff";

interface params {
  azureStorageDir: any[];
  curDir: string;
  setCreateDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDelDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDirChange: (dir: string) => void;
}
const StorageDirectory: React.FC<params> = (props) => {
  const handleDelete = (): void => {
    if (props.curDir !== "") {
      props.setDelDirectoryOpen(true);
    } else {
      alert("Please select a directory to delete.");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "22.425vh",
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
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
              onClick={() => {
                props.setCreateDirectoryOpen(true);
              }}
            >
              <CreateNewFolderIcon
                color="info"
                style={{
                  fontSize: "2vh",
                  marginTop: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
            </IconButton>
            <IconButton
              sx={{ padding: 0, marginTop: "0.27vh", marginRight: "0.4vh" }}
              onClick={handleDelete}
            >
              <FolderOffIcon
                color="warning"
                style={{
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
          height: "18.75vh",
          maxHeight: "18.75vh",
          border: 0,
        }}
        id={"container_with_scrolls"}
        component={Paper}
      >
        <Table>
          <TableBody>
            {props.azureStorageDir.map((folder: any, index: number) => (
              <TableRow
                key={index}
                sx={{
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
                    backgroundColor:
                      folder.split("/")[0] === props.curDir
                        ? "#D3D3D3"
                        : colours.CFIA_Background_White,
                  }}
                  onClick={() => {
                    props.handleDirChange(folder.split("/")[0]);
                  }}
                >
                  {folder.split("/")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StorageDirectory;
