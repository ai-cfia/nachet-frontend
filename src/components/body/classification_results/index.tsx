import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Box,
  CardHeader,
  IconButton,
} from "@mui/material";
import { colours } from "../../../styles/colours";
import TuneIcon from "@mui/icons-material/Tune";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface params {
  savedImages: any[];
  imageSrc: string;
  imageIndex: number;
  setResultsTunerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scoreThreshold: number;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  labelOccurrences: any;
  switchTable: boolean;
  setSwitchTable: React.Dispatch<React.SetStateAction<boolean>>;
  windowSize: {
    width: number;
    height: number;
  };
}

const ClassificationResults: React.FC<params> = (props) => {
  const [isAnnotated, setIsAnnotated] = React.useState<boolean>(false);
  const handleSelect = (key: string): void => {
    if (key === props.selectedLabel) {
      props.setSelectedLabel("all");
    } else {
      props.setSelectedLabel(key);
    }
  };

  const checkAnnotated = (): void => {
    props.savedImages.forEach((object: any) => {
      if (object.index === props.imageIndex) {
        setIsAnnotated(
          object.annotated === true && object.classifications.length > 0,
        );
      }
    });
  };

  useEffect(() => {
    checkAnnotated();
  }, [props.savedImages, props.imageIndex]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "22.23vh", // "22.425vh"
        border: `0.01vh solid LightGrey`,
        borderRadius: "0.4vh",
      }}
      boxShadow={0}
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
        sx={{ padding: "0.8vh 1vh 0.8vh 0.8vh" }}
        action={
          <>
            <IconButton
              sx={{ padding: 0, marginTop: "0.27vh", marginRight: "0.4vh" }}
              onClick={() => {
                props.setResultsTunerOpen(true);
              }}
            >
              <TuneIcon
                style={{
                  color: colours.CFIA_Background_Blue,
                  fontSize: "2vh",
                  marginTop: "0.1vh",
                  marginBottom: "0.1vh",
                  marginRight: "0.1vh",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
            </IconButton>
            <IconButton
              sx={{ padding: 0, marginTop: "0.27vh", marginRight: "0.4vh" }}
              onClick={() => {
                props.setSwitchTable(!props.switchTable);
              }}
            >
              <SwitchLeftIcon
                style={{
                  color: colours.CFIA_Background_Blue,
                  fontSize: "2vh",
                  marginTop: "0.1vh",
                  marginBottom: "0.1vh",
                  marginRight: "0.1vh",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
            </IconButton>
          </>
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
          boxShadow: "none",
        }}
        id={"container_with_scrolls"}
      >
        <Table sx={{ borderBottom: 0 }}>
          <TableBody sx={{ borderBottom: 0 }}>
            {/* {!props.switchTable && isAnnotated && (
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
                  Confidence
                </TableCell>
              </TableRow>
            )} */}
            {props.switchTable && isAnnotated && (
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
            )}
            {props.switchTable &&
              Object.keys(props.labelOccurrences).map((key, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor:
                      props.selectedLabel === key
                        ? "#F5F5F5"
                        : colours.CFIA_Background_White,
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
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
                      color: colours.CFIA_Font_Black,
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
                      color: colours.CFIA_Font_Black,
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
                      color: colours.CFIA_Font_Black,
                    }}
                  >
                    {props.labelOccurrences[key]}
                  </TableCell>
                </TableRow>
              ))}

            {!props.switchTable &&
              props.savedImages.map((object: any) => {
                if (
                  object.index === props.imageIndex &&
                  object.annotated === true
                ) {
                  return object.classifications.map(
                    (prediction: any, index: number) => {
                      if (
                        object.scores[index] >= props.scoreThreshold / 100 &&
                        (props.selectedLabel === "all" ||
                          props.selectedLabel === prediction)
                      ) {
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#F5F5F5",
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
                                  console.log("more options");
                                }}
                                sx={{ padding: 0 }}
                              >
                                <MoreVertIcon
                                  style={{
                                    color: colours.CFIA_Background_Blue,
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
                        );
                      }
                      return null;
                    },
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
