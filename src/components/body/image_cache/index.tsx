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
  loadImage: (src: string) => void;
  removeImage: (src: string) => void;
}

const ImageCache: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: 400,
        height: "322px",
        maxHeight: "322px",
        border: 1,
        borderRadius: 1,
        marginTop: "10px",
      }}
    >
      <CardHeader
        title="CACHE"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          color: colours.CFIA_Font_Black,
        }}
      />
      <TableContainer
        sx={{ overflow: "auto", height: 258 }}
        id={"container_with_scrolls"}
        component={Paper}
      >
        <Table>
          <TableBody>
            {props.savedImages.map((item: any, index) => (
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
                  sx={{
                    cursor: "pointer",
                    paddingRight: 0,
                  }}
                  align="left"
                  onClick={() => {
                    props.loadImage(item.src);
                  }}
                >
                  {item.label}
                </TableCell>
                <TableCell align="center">
                  {item.annotated === true ? (
                    <CropFreeIcon
                      color="success"
                      fontSize="medium"
                      sx={{ padding: 0, margin: 0 }}
                    />
                  ) : (
                    <> </>
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      props.removeImage(item.src);
                    }}
                  >
                    <DeleteIcon color="warning" />
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
