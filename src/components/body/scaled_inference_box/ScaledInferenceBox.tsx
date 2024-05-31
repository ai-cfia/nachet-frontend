import { Button } from "@mui/material";
import { MouseEvent, useState } from "react";
import { BoxCSS, Images } from "../../../common/types";
import { SimpleFeedbackForm } from "../feedback_form";
import { getScaledBounds } from "../../../common";

const ScaledInferenceBox = (props: {
  index: number;
  imageWidth: number;
  imageHeight: number;
  box: Images["boxes"][0];
  canvasWidth: number;
  canvasHeight: number;
  label: string;
  visible: boolean;
  submitPositiveFeedback: (index: number) => void;
  handleNegativeFeedback: (
    index: number | null,
    boxPosition: BoxCSS | null,
  ) => void;
}): JSX.Element => {
  const {
    index,
    box,
    visible,
    imageWidth,
    imageHeight,
    canvasWidth,
    canvasHeight,
    submitPositiveFeedback,
    handleNegativeFeedback,
  } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { scaledHeight, scaledWidth, scaledTopX, scaledTopY } = getScaledBounds(
    canvasWidth,
    canvasHeight,
    imageWidth,
    imageHeight,
    box,
  );

  const boxPosition: BoxCSS = {
    minWidth: scaledWidth,
    minHeight: scaledHeight,
    maxWidth: scaledWidth,
    maxHeight: scaledHeight,
    left: scaledTopX,
    top: scaledTopY,
  };

  const style = {
    ...boxPosition,
    position: "absolute",
    border: "none",
    borderRadius: 0,
    display: visible ? "block" : "none",
    zIndex: 10,
    "&:hover": {
      bgcolor: "rgba(175, 247, 148, 0.3)",
    },
  };

  return (
    <>
      <Button sx={style} onClick={handleClick} />
      <SimpleFeedbackForm
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        submitPositiveFeedback={() => submitPositiveFeedback(index)}
        handleNegativeFeedback={() =>
          handleNegativeFeedback(index, boxPosition)
        }
      />
    </>
  );
};

export default ScaledInferenceBox;
