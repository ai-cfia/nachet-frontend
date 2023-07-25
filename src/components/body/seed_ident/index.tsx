import React from "react";
import { Box, CardHeader } from "@mui/material";
import { colours } from "../../../styles/colours";

interface params {
  windowSize: {
    width: number;
    height: number;
  };
}
const SeedIdentForm: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: props.windowSize.width * 0.174,
        height: "48.9vh",
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="SEED INFORMATION"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.3vh",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
      />
    </Box>
  );
};

export default SeedIdentForm;
