import {
  Popover,
  Box,
  IconButton,
  FormControl,
  // FormLabel,
  Button,
  Autocomplete,
  TextField,
  createFilterOptions,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
// import styled from "styled-components";
import {
  BoxCSS,
  FeedbackDataNegative,
  SpeciesData,
} from "../../../common/types";
// import EditIcon from "@mui/icons-material/Edit";
import Draggable from "react-draggable";

// const FeedbackPopover = styled(Popover)`
//   .MuiPopover-paper {
//     padding: 10px;
//   }
// `;

const filter = createFilterOptions<SpeciesData>();

const getSpeciesLabel = (speciesData: SpeciesData): string => {
  return speciesData.label;
};

interface SimpleFeedbackFormProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  submitPositiveFeedback: () => void;
  handleNegativeFeedback: () => void;
}

export const SimpleFeedbackForm = (
  props: SimpleFeedbackFormProps,
): JSX.Element => {
  const { anchorEl, onClose, submitPositiveFeedback, handleNegativeFeedback } =
    props;

  const open = Boolean(anchorEl);
  const id = open ? "simple-feedback" : undefined;

  const handlePositiveFeedback = () => {
    submitPositiveFeedback();
    onClose();
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
        <IconButton size="small" onClick={handlePositiveFeedback}>
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
      </Box>
    </Popover>
  );
};

interface NegativeFeedbackFormProps {
  inference: FeedbackDataNegative;
  position: BoxCSS;
  onCancel: () => void;
  onSubmit: (feedbackDataNegative: FeedbackDataNegative) => void;
}

export const NegativeFeedbackForm = (
  props: NegativeFeedbackFormProps,
): JSX.Element => {
  const reasons = [
    "No Seed",
    "Multi Seed",
    "Wrong Seed in List",
    "Wrong Seed not in List",
  ];

  const { inference, position, onCancel, onSubmit } = props;
  const [selectedSpecies, setSelectedSpecies] = useState<string | SpeciesData>(
    "",
  );
  const [comment, setComment] = useState<string>(reasons[0]);

  /* TODO: update when backend is defined Section stub convert to prop or use state when backend defined */
  const speciesList = [
    {
      id: 1,
      label: "Species stub 1",
    },
    {
      id: 2,
      label: "Species stub 2",
    },
  ];
  /* Section stub convert to prop or use state when backend defined */

  const handleCommentChange = (event: SelectChangeEvent<string>) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // TODO: update when backend is defined
    onSubmit({
      ...inference,
      boxes: [
        {
          ...inference.boxes[0],
          label:
            typeof selectedSpecies === "string"
              ? selectedSpecies
              : selectedSpecies.label,
          comment: comment,
        },
      ],
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Draggable
      defaultPosition={{
        x: position.left,
        y: position.top,
      }}
      bounds="parent"
      disabled={false}
    >
      <Box sx={{ id: "negative-feedback", zIndex: 30, padding: "10px" }}>
        <FormControl size="small">
          <Autocomplete
            id="feedback-class"
            renderInput={(params) => <TextField {...params} label="Class" />}
            options={speciesList}
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
              if (inputValue !== "" && !isExisting) {
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
            freeSolo={comment === "Wrong Seed not in List"}
            getOptionLabel={(option) =>
              getSpeciesLabel(
                typeof option === "string" ? { id: -1, label: option } : option,
              )
            }
          />
          <Select
            labelId="comment-select-label"
            id="feedback-comment"
            value={reasons[0]}
            label="Feedback Comment"
            onChange={handleCommentChange}
          >
            {reasons.map((reason, index) => {
              return (
                <MenuItem key={index} value={reason}>
                  {reason}
                </MenuItem>
              );
            })}
          </Select>

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
        </FormControl>
      </Box>
    </Draggable>
  );
};
