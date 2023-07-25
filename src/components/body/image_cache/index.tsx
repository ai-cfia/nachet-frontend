import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Box,
  CardHeader,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { colours } from "../../../styles/colours";

interface params {
  savedImages: any[];
  loadImage: (index: number) => void;
  removeImage: (src: string) => void;
  windowSize: {
    width: number;
    height: number;
  };
}

const ImageCache: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: props.windowSize.width * 0.174,
        height: "23.6vh",
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
        marginTop: "0.83vh",
      }}
    >
      <CardHeader
        title="CACHE"
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
        sx={{ overflow: "auto", height: props.windowSize.height * 0.198 }}
        id={"container_with_scrolls"}
        component={Paper}
      >
        <Table>
          <TableBody>
            {props.savedImages.map((item: any, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:hover": {
                    backgroundColor: "#D3D3D3",
                    transition: "0.1s ease-in-out all",
                  },
                }}
              >
                <TableCell
                  sx={{
                    cursor: "pointer",
                    paddingRight: 0,
                    fontSize: "1.0vh",
                    paddingTop: "0.5vh",
                    paddingBottom: "0.5vh",
                    paddingLeft: "0.8vh",
                  }}
                  align="left"
                  onClick={() => {
                    props.loadImage(item.index);
                  }}
                >
                  CAPTURE {item.index}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    cursor: "pointer",
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: "0.5vh",
                    paddingBottom: "0.5vh",
                  }}
                >
                  {item.annotated === true ? (
                    <CropFreeIcon
                      color="success"
                      style={{
                        fontSize: "1.8vh",
                        marginTop: 0,
                        marginBottom: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                    />
                  ) : (
                    <> </>
                  )}
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
                      props.removeImage(item.index);
                    }}
                  >
                    <DeleteIcon
                      color="warning"
                      style={{
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
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ImageCache;
