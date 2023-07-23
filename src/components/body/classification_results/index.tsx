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
}
const ClassificationResults: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: 400,
        height: "330px",
        maxHeight: "330px",
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
          fontSize: "18px",
          color: colours.CFIA_Font_Black,
        }}
      />
      <TableContainer
        sx={{ overflow: "auto", height: 269 }}
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
