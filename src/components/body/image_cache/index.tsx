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
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface params {
  savedImages: any[];
  loadImage: (src: string) => void;
  removeImage: (src: string) => void;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  saveOpen: boolean;
  clearImageCache: () => void;
  uploadOpen: boolean;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageCache: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: 600,
        height: 301,
        paddingBottom: 0.6,
        border: 1,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="Capture Cache"
        subheader="Select a capture to load"
        titleTypographyProps={{ variant: "h6" }}
        action={
          <>
            <Button
              onClick={() => {
                props.setSaveOpen(true);
              }}
            >
              Download
            </Button>
            <Button
              onClick={() => {
                props.setUploadOpen(true);
              }}
            >
              Load
            </Button>
            <Button>Azure</Button>
            <Button onClick={props.clearImageCache}>Clear</Button>
          </>
        }
      />
      <TableContainer sx={{ overflow: "auto", height: 218 }} component={Paper}>
        <Table>
          <TableBody>
            {props.savedImages.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    cursor: "pointer",
                  }}
                  align="left"
                  onClick={() => {
                    props.loadImage(item.src);
                  }}
                >
                  {item.label}
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
