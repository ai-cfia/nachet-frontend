// Classification Results
// \src\components\body\classification_results\index.tsx
import React, { useState } from "react";
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
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CropFreeIcon from "@mui/icons-material/CropFree";
import LabelIcon from "@mui/icons-material/Label";
import Typography from "@mui/material/Typography";

interface params {
  savedImages: any[];
  imageSrc: string;
  imageIndex: number;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  labelOccurrences: any;
  switchTable: boolean;
  setSwitchTable: React.Dispatch<React.SetStateAction<boolean>>;
  modelDisplayName: string;
  windowSize: {
    width: number;
    height: number;
  };
}

const ClassificationResults: React.FC<params> = (props) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSelect = (key: string): void => {
    if (key === props.selectedLabel) {
      props.setSelectedLabel("all");
    } else {
      props.setSelectedLabel(key);
    }
  };

  const handleRowClick = (rowId: string): void => {
    // Toggle expanded row. Collapse if the same row is clicked again.
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
    }
  };

  const renderTopResults = (
    topN: Array<{ score: number | string; label: string }>,
  ): JSX.Element => {
    return (
      <>
        <Typography
          variant="subtitle2"
          style={{
            fontWeight: "bold",
            marginTop: "-15px",
            paddingTop: "0px",
            paddingBottom: "4px",
            fontSize: "0.75em",
          }}
        >
          Top Results
        </Typography>
        {topN.map((result, index) => {
          // Parse the score to a float if it's a string, then immediately declare it as a const.
          const score =
            typeof result.score === "number"
              ? result.score
              : parseFloat(result.score);

          // Convert the score to a percentage string, handling very small numbers.
          const percentageString =
            score > 0 && score < 0.0001
              ? "< 0.01%" // If the score is greater than 0 but less than 0.01%, show '< 0.01%'
              : `${(score * 100).toFixed(2)}%`; // Otherwise, convert to percentage and format

          return (
            <Typography
              key={index}
              variant="body2"
              style={{
                fontSize: "0.75em",
                paddingTop: "1px",
                paddingBottom: "1px",
              }}
            >
              {`${index + 1}. ${result.label}: ${percentageString}`}
            </Typography>
          );
        })}
      </>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%", // "22.425vh"
        minHeight: "100%",
        minWidth: "100%",
        padding: "0px",
        margin: "0px",
        border: `1px solid LightGrey`,
        borderRadius: "5px",
      }}
      boxShadow={0}
      data-testid="classification-results-component"
    >
      <CardHeader
        title={
          <span>
            {"RESULTS | "}
            <strong>{props.modelDisplayName}</strong>
          </span>
        }
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "14px",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "10px" }}
        action={
          <>
            <IconButton
              sx={{ padding: 0, marginRight: "5px", marginTop: "5px" }}
              onClick={() => {
                props.setSwitchTable(!props.switchTable);
              }}
            >
              <SwitchLeftIcon
                style={{
                  color: colours.CFIA_Background_Blue,
                  fontSize: "24px",
                }}
              />
            </IconButton>
          </>
        }
      />
      <TableContainer
        sx={{
          overflow: "auto",
          height: "100%",
          border: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTop: `1px solid LightGrey`,
          borderBottom: 0,
          boxShadow: "none",
        }}
        id={"container_with_scrolls"}
      >
        <Table sx={{ borderBottom: 0 }}>
          <TableBody sx={{ borderBottom: 0 }}>
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <LabelIcon
                        style={{
                          color: colours.CFIA_Background_Blue,
                          fontSize: "1.8vh",
                          marginTop: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingRight: "0.3vw",
                        }}
                      />
                      <span style={{ width: "0.7vw", textAlign: "left" }}>
                        {index + 1}
                      </span>
                    </div>
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
                      paddingRight: 0,
                      fontSize: "1.15vh",
                      paddingTop: "0.5vh",
                      paddingBottom: "0.5vh",
                      paddingLeft: "0.8vh",
                      color: colours.CFIA_Font_Black,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "right",
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ width: "0.7vw", textAlign: "right" }}>
                        {props.labelOccurrences[key]}
                      </span>
                      <CropFreeIcon
                        style={{
                          color: colours.CFIA_Background_Blue,
                          fontSize: "1.7vh",
                          marginTop: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingLeft: "0.3vw",
                        }}
                      />
                    </div>
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
              ))}

            {!props.switchTable &&
              props.savedImages.map((object: any, objectIndex: number) => {
                if (
                  object.index === props.imageIndex &&
                  object.annotated === true
                ) {
                  return object.classifications.map(
                    (prediction: any, classificationIndex: number) => {
                      const rowId = `${objectIndex}-${classificationIndex}`;
                      const topN = object.topN[classificationIndex];
                      const isExpanded = expandedRow === rowId;
                      const labelMatchesSelection =
                        props.selectedLabel === "all" ||
                        props.selectedLabel === prediction;

                      if (labelMatchesSelection) {
                        return (
                          <React.Fragment key={rowId}>
                            <TableRow
                              key={rowId}
                              sx={{
                                "&:hover": {
                                  backgroundColor: "#F5F5F5",
                                  transition: "0.1s ease-in-out all",
                                },
                              }}
                              onClick={() => {
                                handleRowClick(rowId);
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
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <LabelIcon
                                    style={{
                                      color: colours.CFIA_Background_Blue,
                                      fontSize: "1.8vh",
                                      marginTop: 0,
                                      marginBottom: 0,
                                      paddingTop: 0,
                                      paddingBottom: 0,
                                      paddingRight: "0.3vw",
                                    }}
                                  />
                                  <span
                                    style={{
                                      width: "0.7vw",
                                      textAlign: "left",
                                    }}
                                  >
                                    {classificationIndex + 1}
                                  </span>
                                </div>
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
                                {(
                                  object.scores[classificationIndex] * 100
                                ).toFixed(0)}
                                %
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  fontSize: "1.0vh",
                                  paddingTop: "0.5vh",
                                  paddingBottom: "0.5vh",
                                  paddingRight: "0.8vh",
                                }}
                              >
                                {/* Content or modifications for this cell */}
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
                                    // logic to handle more options
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
                            {isExpanded && (
                              <TableRow>
                                <TableCell colSpan={6}>
                                  <Box p={2}>
                                    {topN?.length > 0 && renderTopResults(topN)}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
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
