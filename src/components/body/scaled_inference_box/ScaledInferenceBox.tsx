import { Button } from "@mui/material";
import { MouseEvent, useState } from "react";
import { Images } from "../../../common/types";
import { SimpleFeedbackForm } from "../feedback_form";
import { getScaledBounds } from "../../../common";

const FEATURE_FLAG = true;

const ScaledInferenceBox = (props: {
  imageWidth: number;
  imageHeight: number;
  box: Images["boxes"][0];
  canvasWidth: number;
  canvasHeight: number;
  label: string;
  visible: boolean;
}): JSX.Element => {
  const { box, visible, imageWidth, imageHeight, canvasWidth, canvasHeight } =
    props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (FEATURE_FLAG) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const { scaledHeight, scaledWidth, scaledTopX, scaledTopY } = getScaledBounds(
    canvasWidth,
    canvasHeight,
    imageWidth,
    imageHeight,
    box,
  );

  const OFFSET = 1; // arbitrary until canvas is fixed
  return (
    <>
      <Button
        sx={{
          position: "absolute",
          minWidth: scaledWidth + OFFSET,
          minHeight: scaledHeight + OFFSET,
          maxWidth: scaledWidth + OFFSET,
          maxHeight: scaledHeight + OFFSET,
          left: scaledTopX,
          top: scaledTopY,
          border: "none",
          borderRadius: 0,
          display: visible ? "block" : "none",
          zIndex: 10,
          "&:hover": {
            bgcolor: "rgba(175, 247, 148, 0.3)",
          },
        }}
        onClick={handleClick}
      />
      <SimpleFeedbackForm
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      />
    </>
  );
};

export default ScaledInferenceBox;
