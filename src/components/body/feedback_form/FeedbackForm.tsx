import {
  Popover,
  Box,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Autocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState, MouseEvent } from "react";
import styled from "styled-components";
import { SpeciesData } from "../../../common/types";
import EditIcon from "@mui/icons-material/Edit";

const FeedbackPopover = styled(Popover)`
  .MuiPopover-paper {
    padding: 10px;
  }
`;

const filter = createFilterOptions<SpeciesData>();

const getSpeciesLabel = (speciesData: SpeciesData): string => {
  return speciesData.label;
};

interface SimpleFeedbackFormProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  toggleShowInference: (state: boolean) => void;
  toggleEditMode: () => void;
}

export const SimpleFeedbackForm = (
  props: SimpleFeedbackFormProps,
): JSX.Element => {
  const { anchorEl, onClose, canvasRef, toggleShowInference, toggleEditMode } =
    props;
  const [childAnchorEl, setChildAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-feedback" : undefined;

  const handleNegativeFeedback = (event: MouseEvent<HTMLButtonElement>) => {
    setChildAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setChildAnchorEl(null);
    onClose();
  };

  const handleEditMode = () => {
    toggleShowInference(false);
    toggleEditMode();
    handleClose();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          border: `0.01vh solid LightGrey`,
          flexWrap: "wrap",
        }}
      >
        <IconButton size="small">
          <CheckCircleOutlinedIcon
            sx={{
              color: "green",
            }}
          />
        </IconButton>

        <IconButton size="small" onClick={handleNegativeFeedback}>
          <CancelOutlinedIcon
            sx={{
              color: "red",
            }}
          />
        </IconButton>
        <NegativeFeedbackForm
          anchorEl={childAnchorEl}
          onClose={handleClose}
          canvasRef={canvasRef}
          handleEditMode={handleEditMode}
        />
      </Box>
    </Popover>
  );
};

interface NegativeFeedbackFormProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleEditMode: () => void;
}

export const NegativeFeedbackForm = (
  props: NegativeFeedbackFormProps,
): JSX.Element => {
  const { anchorEl, onClose, canvasRef, handleEditMode } = props;
  const [showInput, setShowInput] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const id = open ? "negative-feedback" : undefined;
  const [selectedSpecies, setSelectedSpecies] = useState<string | SpeciesData>(
    "",
  );
  const [feedbackType, setFeedbackType] = useState<number>(0);

  /* TODO: update when backend is defined Section stub convert to prop or use state when backend defined */
  const speciesListKnown = [
    {
      id: 1,
      label: "Species stub 1",
    },
    {
      id: 2,
      label: "Species stub 2",
    },
  ];
  const speciesListUnknown = [
    {
      id: 1000,
      label: "Species stub 1000",
    },
    {
      id: 1001,
      label: "Species stub 1001",
    },
  ];
  /* Section stub convert to prop or use state when backend defined */
  const handleBoundingBoxAdjustment = () => {
    handleEditMode();
    if (canvasRef.current) {
      canvasRef.current.style.zIndex = "100";
    }
  };

  const handleClose = () => {
    if (canvasRef.current) {
      canvasRef.current.style.zIndex = "0";
    }
    onClose();
  };

  const handleSubmit = () => {
    // TODO: update when backend is defined
    handleClose();
  };

  const handleCancel = () => {
    // TODO: update when backend is defined
    handleClose();
  };

  return (
    <FeedbackPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{ zIndex: 30, padding: "10px" }}
    >
      <FormControl size="small">
        <FormLabel id="radio-buttons-group">Negative Feedback</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group"
          defaultValue="No Seed"
          name="radio-buttons-group"
          onChange={(e) => {
            setShowInput(e.target.value === "3" || e.target.value === "4");
            setFeedbackType(parseInt(e.target.value));
          }}
        >
          <FormControlLabel value="1" control={<Radio />} label="No Seed" />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Multi Seed"
            disabled
            sx={{
              visibility: "collapse",
            }}
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label={"Wrong Seed in Model"}
            disabled
            sx={{
              visibility: "collapse",
            }}
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label={"Wrong Seed not in Model"}
            disabled
            sx={{
              visibility: "collapse",
            }}
          ></FormControlLabel>
        </RadioGroup>
        <Button
          color="inherit"
          variant="outlined"
          // disabled={disabled}
          onClick={handleBoundingBoxAdjustment}
          //sx={buttonStyle}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {<EditIcon />}
            <span>Adjust Bounding Box</span>
          </div>
        </Button>
        {showInput && (
          <Autocomplete
            id="wrong-seed-in-list"
            renderInput={(params) => <TextField {...params} label="Species" />}
            options={feedbackType === 3 ? speciesListKnown : speciesListUnknown}
            value={selectedSpecies}
            onChange={(event, newValue) => {
              event.preventDefault();
              if (typeof newValue === "string") {
                setSelectedSpecies(newValue);
              } else {
                setSelectedSpecies(newValue ?? "");
              }
            }}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            filterOptions={(options, params) => {
              const { inputValue } = params;
              if (inputValue === "") {
                return options;
              }
              const filtered = filter(options, params);

              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.label,
              );
              if (inputValue !== "" && feedbackType === 4 && !isExisting) {
                filtered.push({
                  id: -1,
                  label: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            disablePortal
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo={feedbackType === 4}
            getOptionLabel={(option) =>
              getSpeciesLabel(
                typeof option === "string" ? { id: -1, label: option } : option,
              )
            }
          />
        )}
        {feedbackType > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <Button
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": {
                  backgroundColor: "green",
                  opacity: 0.6,
                },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "red",
                  opacity: 0.5,
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        )}
      </FormControl>
    </FeedbackPopover>
  );
};
