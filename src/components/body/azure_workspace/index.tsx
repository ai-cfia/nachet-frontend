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

interface params {
  azureStorageDir: any[];
  curDir: string;
  setCreateDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDirChange: (dir: string) => void;
}
const AzureStorageWorkspace: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: "22%",
        height: "20vh",
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="STORAGE DIRECTORY"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.3vh",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
        action={
          <IconButton
            sx={{ padding: 0, marginTop: "0.27vh", marginRight: "0.4vh" }}
            onClick={() => {
              props.setCreateDirectoryOpen(true);
            }}
          >
            <CreateNewFolderIcon
              color="success"
              style={{
                fontSize: "2vh",
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
          </IconButton>
        }
      />
      <TableContainer
        sx={{
          overflow: "auto",
          height: "16.3vh",
          maxHeight: "16.3vh",
          border: 0,
        }}
        id={"container_with_scrolls"}
        component={Paper}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  fontWeight: 600,
                  cursor: "pointer",
                  paddingRight: 0,
                  fontSize: "1.0vh",
                  paddingTop: "0.5vh",
                  paddingBottom: "0.5vh",
                  paddingLeft: "0.8vh",
                }}
              >
                Folders
              </TableCell>
            </TableRow>
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
                    color:
                      folder.split("/")[0] === props.curDir
                        ? "red"
                        : colours.CFIA_Font_Black,
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

export default AzureStorageWorkspace;
