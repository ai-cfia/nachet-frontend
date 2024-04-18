import { Button, Popover } from "@mui/material";
import React from "react";
import { Images } from "../../../common/types";

const ScaledInferenceBox = (props: {
  imageWidth: number;
  imageHeight: number;
  box: Images["boxes"][0];
  canvasWidth: number;
  canvasHeight: number;
  label: string;
  color: string;
  visible: boolean;
  children?: React.ReactNode;
}): JSX.Element => {
  const {
    box,
    visible,
    color,
    imageWidth,
    imageHeight,
    canvasWidth,
    canvasHeight,
    children,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const scaleFactorWidth = canvasWidth / imageWidth;
  const scaleFactorHeight = canvasHeight / imageHeight;
  const scaledWidth = (box.bottomX - box.topX) * scaleFactorWidth;
  const scaledHeight = (box.bottomY - box.topY) * scaleFactorHeight;
  const scaledTopX = box.topX * scaleFactorWidth;
  const scaledTopY = box.topY * scaleFactorHeight;
  return (
    <>
      <Button
        sx={{
          position: "absolute",
          minWidth: scaledWidth + 1,
          minHeight: scaledHeight + 1,
          maxWidth: scaledWidth + 1,
          maxHeight: scaledHeight + 1,
          left: scaledTopX,
          top: scaledTopY,
          border: `0.3vh solid ${color}`,
          borderRadius: 0,
          display: visible ? "block" : "none",
          zIndex: 10,
          "&:hover": {
            bgcolor: "rgba(175, 247, 148, 0.3)",
          },
        }}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ backgroundColor: "transparent", boxShadow: "none", zIndex: "30" }}
      >
        {children}
      </Popover>
    </>
  );
};

export default ScaledInferenceBox;
