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
} from "@mui/material";
import { colours } from "../../../styles/colours";

interface params {
  azureStorageDir: any[];
}
const AzureStorageWorkspace: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "27.6vh",
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="AZURE STORAGE DIRECTORY"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.3vh",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
      />
      <TableContainer
        sx={{
          overflow: "auto",
          height: "23.9vh",
          maxHeight: "23.9vh",
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
            {props.azureStorageDir.map((folders: any) => {
              return folders.folders.map((folder: any, index: number) => (
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
                    }}
                  >
                    {folder}
                  </TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AzureStorageWorkspace;
