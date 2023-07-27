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
  savedImages: any[];
  imageSrc: string;
  imageIndex: number;
  windowSize: {
    width: number;
    height: number;
  };
}
const ClassificationResults: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: "100%", // props.windowSize.width * 0.174
        height: "27.6vh",
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="CLASSIFICATION RESULTS"
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
                Index
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1.0vh",
                  paddingRight: 0,
                  paddingLeft: 0,
                  paddingTop: "0.5vh",
                  paddingBottom: "0.5vh",
                }}
              >
                Type
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  cursor: "pointer",
                  paddingLeft: 0,
                  fontSize: "1.0vh",
                  paddingTop: "0.5vh",
                  paddingBottom: "0.5vh",
                  paddingRight: "0.8vh",
                }}
              >
                Confidence
              </TableCell>
            </TableRow>
            {props.savedImages.map((object: any) => {
              if (
                object.index === props.imageIndex &&
                object.annotated === true
              ) {
                return object.predictions.map(
                  (prediction: any, index: number) => (
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
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          cursor: "pointer",
                          paddingRight: 0,
                          fontSize: "1.0vh",
                          paddingLeft: 0,
                          paddingTop: "0.5vh",
                          paddingBottom: "0.5vh",
                        }}
                      >
                        {prediction.split(" ").slice(1).join(" ")}
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
                        {object.scores[index] * 100}%
                      </TableCell>
                    </TableRow>
                  ),
                );
              } else {
                return null;
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassificationResults;
