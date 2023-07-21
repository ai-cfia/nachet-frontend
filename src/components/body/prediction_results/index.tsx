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

interface params {
  savedImages: any[];
  imageSrc: string;
}
const Results: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: 400,
        height: 320,
        border: 1,
        borderRadius: 1,
        marginBottom: 1.5,
      }}
    >
      <CardHeader
        title="Prediction Results"
        titleTypographyProps={{ variant: "h6" }}
      />
      <TableContainer sx={{ overflow: "auto", height: 255 }} component={Paper}>
        <Table>
          <TableBody>
            {props.savedImages.map((object: any, index) => {
              if (object.src === props.imageSrc && object.annotated === true) {
                return object.predictions.map(
                  (prediction: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell align="left">
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

export default Results;
