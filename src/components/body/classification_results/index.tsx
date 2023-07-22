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
        height: 330,
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
          color: colours.CFIA_Font_Black,
        }}
      />
      <TableContainer
        sx={{ overflow: "auto", height: 266 }}
        id={"container_with_scrolls"}
        component={Paper}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left">Type</TableCell>
              <TableCell align="center">Index</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
            {props.savedImages.map((object: any) => {
              if (object.src === props.imageSrc && object.annotated === true) {
                return object.predictions.map(
                  (prediction: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        {prediction.split(" ").slice(1).join(" ")}
                      </TableCell>
                      <TableCell align="center">{index + 1}</TableCell>
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