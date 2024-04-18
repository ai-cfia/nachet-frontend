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
import { ReactNode, useState, MouseEvent } from "react";
import styled from "styled-components";
import { SpeciesData } from "../../../common/types";

const FeedbackPopover = styled(Popover)`
  .MuiPopover-paper {
    padding: 10px;
  }
`;

const filter = createFilterOptions<SpeciesData>();

const getSpeciesLabel = (speciesData: SpeciesData): string => {
  return speciesData.label;
};

const FeedbackForm = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [negative, setNegative] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showInput, setShowInput] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [selectedSpecies, setSelectedSpecies] = useState<string | SpeciesData>(
    "",
  );
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
  const [feedbackType, setFeedbackType] = useState<number>(0);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setNegative(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNegative(false);
  };

  const handleSubmit = () => {
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
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

      <IconButton size="small" onClick={handleClick}>
        <CancelOutlinedIcon
          sx={{
            color: "red",
          }}
        />
      </IconButton>

      {negative && (
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
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label={"Wrong Seed in Model"}
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label={"Wrong Seed not in Model"}
              ></FormControlLabel>
            </RadioGroup>
            {showInput && (
              <Autocomplete
                id="wrong-seed-in-list"
                renderInput={(params) => (
                  <TextField {...params} label="Species" />
                )}
                options={
                  feedbackType === 3 ? speciesListKnown : speciesListUnknown
                }
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
                    typeof option === "string"
                      ? { id: -1, label: option }
                      : option,
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
          {children}
        </FeedbackPopover>
      )}
    </Box>
  );
};

export default FeedbackForm;
