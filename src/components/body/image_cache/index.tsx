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
import CropFreeIcon from '@mui/icons-material/CropFree';

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
        width: 400,
        height: 320,
        paddingBottom: 0.6,
        border: 1,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="Capture Cache"
        titleTypographyProps={{ variant: "h6" }}
      />
      <TableContainer sx={{ overflow: "auto", height: 260 }} component={Paper}>
        <Table>
          <TableBody>
            {props.savedImages.map((item: any, index) => (
              <TableRow key={index}>
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
                    <CropFreeIcon color="success" />
                  )
                   : (<> </>)
                  }
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
