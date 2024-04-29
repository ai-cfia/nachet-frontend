import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

interface FreeformBoxProps {
  open: boolean;
  position: {
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    left: number;
    top: number;
  };

  toggleShowInference: (state: boolean) => void;
}

const FreeformBox = (props: FreeformBoxProps) => {
  const { toggleShowInference, open, position } = props;

  const handleClose = () => {
    toggleShowInference(true);
  };

  return (
    <>
      {open && (
        <Draggable
          defaultPosition={{
            x: position.left,
            y: position.top,
          }}
        >
          <Resizable
            style={{
              position: "absolute",
              zIndex: 100,
              backgroundColor: "none",
              border: "2px solid green",
              padding: "10px",
              minWidth: "5px",
              minHeight: "5px",
            }}
            defaultSize={{
              width: position.minWidth,
              height: position.minHeight,
            }}
          ></Resizable>
        </Draggable>
      )}
    </>
  );
};

export default FreeformBox;
