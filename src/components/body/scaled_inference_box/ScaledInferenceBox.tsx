import { Button } from "@mui/material";
import { MouseEvent, useState } from "react";
import { Images } from "../../../common/types";
import { FreeformBox, SimpleFeedbackForm } from "../feedback_form";
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
  canvasRef: React.RefObject<HTMLCanvasElement>;
  toggleShowInference: (state: boolean) => void;
  submitPositiveFeedback: (index: number) => void;
}): JSX.Element => {
  const {
    index,
    box,
    visible,
    imageWidth,
    imageHeight,
    canvasWidth,
    canvasHeight,
    canvasRef,
    toggleShowInference,
    submitPositiveFeedback,
  } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [adjustMode, setAdjustMode] = useState<boolean>(false);

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

  const boxPosition = {
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

  const handleFreeformClose = () => {
    toggleShowInference(true);
    setAdjustMode(false);
  };

  return (
    <>
      <Button sx={style} onClick={handleClick} />
      <SimpleFeedbackForm
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        canvasRef={canvasRef}
        toggleShowInference={toggleShowInference}
        toggleEditMode={() => setAdjustMode(!adjustMode)}
        submitPositiveFeedback={() => submitPositiveFeedback(index)}
      />
      <FreeformBox
        position={boxPosition}
        open={adjustMode}
        handleClose={handleFreeformClose}
      />
    </>
  );
};

export default ScaledInferenceBox;
