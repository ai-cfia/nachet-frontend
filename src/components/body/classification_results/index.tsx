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
  windowSize: {
    width: number;
    height: number;
  };
}
const ClassificationResults: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: props.windowSize.width * 0.174,
        height: props.windowSize.height * 0.2426,
        border: 1,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="CLASSIFICATION RESULTS"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.1rem",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "10px 10px 10px 10px" }}
      />
      <TableContainer
        sx={{ overflow: "auto", height: props.windowSize.height * 0.207 }}
        id={"container_with_scrolls"}
        component={Paper}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 600 }}>
                Index
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Type
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Score
              </TableCell>
            </TableRow>
            {props.savedImages.map((object: any) => {
              if (object.src === props.imageSrc && object.annotated === true) {
                return object.predictions.map(
                  (prediction: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="center">
                        {prediction.split(" ").slice(1).join(" ")}
                      </TableCell>
                      <TableCell align="right">
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
