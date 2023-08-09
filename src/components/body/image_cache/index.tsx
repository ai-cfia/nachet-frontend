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
import CloseIcon from "@mui/icons-material/Close";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { colours } from "../../../styles/colours";

interface params {
  savedImages: any[];
  loadImage: (index: number) => void;
  removeImage: (src: string) => void;
  clearImageCache: () => void;
  windowSize: {
    width: number;
    height: number;
  };
}

const ImageCache: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "22.425vh",
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
        marginTop: "0.665vh",
        marginBottom: "0.665vh",
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
        action={
          <IconButton
            sx={{ padding: 0, marginTop: "0.27vh", marginRight: "0.4vh" }}
            onClick={() => {
              props.clearImageCache();
            }}
          >
            <ClearAllIcon
              color="warning"
              style={{
                fontSize: "2.4vh",
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
          </IconButton>
        }
      />
      <TableContainer
        sx={{
          overflow: "auto",
          height: "18.75vh",
          maxHeight: "18.75vh",
          border: 0,
        }}
        id={"container_with_scrolls_"}
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
                    fontSize: "1vh",
                    paddingTop: "0.5vh",
                    paddingBottom: "0.5vh",
                    paddingLeft: "0.8vh",
                  }}
                  align="left"
                  onClick={() => {
                    props.loadImage(item.index);
                  }}
                >
                  CAPTURE: {item.index}
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
                    sx={{ padding: 0 }}
                  >
                    <CloseIcon
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
