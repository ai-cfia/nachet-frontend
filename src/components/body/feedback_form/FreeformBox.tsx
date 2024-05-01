import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { Box, IconButton } from "@mui/material";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import { useState } from "react";

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

  handleClose: () => void;
}

const FreeformBox = (props: FreeformBoxProps) => {
  const { handleClose, open, position } = props;
  const [dragEnabled, setDragEnabled] = useState(true);

  const buttonStyle = {
    borderRadius: "0",
    maxHeight: "25px",
    maxWidth: "25px",
  };

  return (
    <>
      {open && (
        <Draggable
          defaultPosition={{
            x: position.left,
            y: position.top,
          }}
          bounds="parent"
          disabled={!dragEnabled}
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
            enable={{
              top: false,
              right: !dragEnabled,
              bottom: !dragEnabled,
              left: false,
              topRight: false,
              bottomRight: !dragEnabled,
              bottomLeft: false,
              topLeft: false,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -30,
                right: position.minWidth < 50 ? -25 : 0,
                backgroundColor: "white",
                borderRadius: "5%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                border: `0.01vh solid LightGrey`,
                fitContent: "wrap",
              }}
            >
              <IconButton
                sx={{
                  ...buttonStyle,
                  color: "blue",
                }}
                onClick={() => setDragEnabled(!dragEnabled)}
              >
                {dragEnabled ? (
                  <OpenWithOutlinedIcon />
                ) : (
                  <OpenInFullOutlinedIcon />
                )}
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  ...buttonStyle,
                  color: "green",
                }}
              >
                <CheckCircleOutlinedIcon />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  ...buttonStyle,
                  color: "red",
                }}
                onClick={handleClose}
              >
                <CancelOutlinedIcon />
              </IconButton>
            </Box>
          </Resizable>
        </Draggable>
      )}
    </>
  );
};

export default FreeformBox;
