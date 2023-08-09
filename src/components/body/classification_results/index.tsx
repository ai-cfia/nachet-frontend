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
import TuneIcon from "@mui/icons-material/Tune";

interface params {
  savedImages: any[];
  imageSrc: string;
  imageIndex: number;
  setResultsTunerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scoreThreshold: number;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  windowSize: {
    width: number;
    height: number;
  };
}
const ClassificationResults: React.FC<params> = (props) => {

  const handleSelect = (key: string) => {
    if (key === props.selectedLabel) {
      props.setSelectedLabel("all");
    } else {
      props.setSelectedLabel(key);
    }
  }

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
        title="RESULTS"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.3vh",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
        action={
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              sx={{ padding: 0, marginTop: "0.27vh", marginRight: "0.4vh" }}
              onClick={() => {
                props.setResultsTunerOpen(true);
              }}
            >
              <TuneIcon
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
                Classification
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
                Total
              </TableCell>
            </TableRow>
            {props.savedImages
              .map((object: any) => {
                if (
                  object.index === props.imageIndex &&
                  object.annotated === true
                ) {
                  return Object.keys(object.labelOccurrence).map((key, index) => (
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
                        onClick={() => {
                          handleSelect(key);
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
                        onClick={() => {
                          handleSelect(key);
                        }}
                      >
                        {key.split(" ").slice(1).join(" ")}
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
                        {object.labelOccurrence[key]}
                      </TableCell>
                    </TableRow>
                  ));
                }
              })
              .flat()}
            {/* {props.savedImages.map((object: any) => {
              if (
                object.index === props.imageIndex &&
                object.annotated === true
              ) {
                return object.classifications.map(
                  (prediction: any, index: number) => {
                    if (object.scores[index] >= props.scoreThreshold / 100) {
                      return (
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
                            {(object.scores[index] * 100).toFixed(0)}%
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  },
                );
              } else {
                return null;
              }
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassificationResults;
