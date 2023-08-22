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
import ImageIcon from "@mui/icons-material/Image";
import { colours } from "../../../styles/colours";

interface params {
  savedImages: any[];
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  removeImage: (src: string) => void;
  clearImageCache: () => void;
  imageIndex: number;
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
        height: "22.23vh",
        border: `0.01vh solid ${colours.CFIA_Font_Black}`,
        borderRadius: "0.4vh",
        marginTop: "0.95vh",
        marginBottom: "0.95vh",
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
              style={{
                color: "red",
                fontSize: "2.3vh",
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: "0.3vw",
                paddingLeft: "0.3vw",
              }}
            />
          </IconButton>
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
        }}
        id={"container_with_scrolls_"}
        component={Paper}
      >
        <Table sx={{ borderBottom: 0 }}>
          <TableBody sx={{ borderBottom: 0 }}>
            {props.savedImages.map((item: any, i) => (
              <TableRow
                key={i}
                sx={{
                  backgroundColor:
                    item.index === props.imageIndex
                      ? "#D3D3D3"
                      : colours.CFIA_Background_White,
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                    transition: "0.1s ease-in-out all",
                  },
                }}
              >
                <TableCell
                  sx={{
                    cursor: "pointer",
                    paddingRight: 0,
                    fontSize: "1.1vh",
                    paddingTop: "0.5vh",
                    paddingBottom: "0.5vh",
                    paddingLeft: "0.8vh",
                    width: "11vw",
                    maxWidth: "11vw",
                    textOverflow: "break-word",
                    color: colours.CFIA_Font_Black,
                  }}
                  align="left"
                  onClick={() => {
                    props.setImageIndex(item.index);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <ImageIcon
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
                    <span>CAPTURE {item.index}</span>
                  </div>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    cursor: "pointer",
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: "0.5vh",
                    paddingBottom: "0.2vh",
                  }}
                >
                  {item.annotated === true ? (
                    <CropFreeIcon
                      style={{
                        fontSize: "1.7vh",
                        marginTop: 0,
                        marginBottom: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        color: colours.CFIA_Background_Blue,
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
                      style={{
                        color: "red",
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
