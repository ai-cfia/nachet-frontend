import React from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { AppbarWrap, AppbarContainer, AppbarHeader } from "./indexElements";
import { colours } from "../../../styles/colours";

interface Params {
  windowSize: { width: number; height: number };
  switchLanguage: boolean;
  setSwitchLanguage: (value: boolean) => void;
}

const Appbar: React.FC<Params> = (props) => {
  const { t } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value as string;
    i18next.changeLanguage(newLanguage);
    props.setSwitchLanguage(newLanguage === "en");
  };

  const selectStyle = {
    marginRight: 0,
    marginLeft: 0,
    borderRadius: "0.4vh",
    paddingTop: "0.2vh",
    paddingBottom: "0.2vh",
    fontSize: "1.17vh",
    backgroundColor: colours.CFIA_Background_Blue,
    border: `0.01vh solid ${colours.CFIA_Background_Blue}`,
    color: colours.CFIA_Font_White,
    "&:hover": {
      border: `0.01vh solid ${colours.CFIA_Background_White}`,
    },
  };

  return (
    <AppbarWrap width={props.windowSize.width} height={props.windowSize.height}>
      <AppbarContainer
        width={props.windowSize.width}
        height={props.windowSize.height}
      >
        <AppbarHeader>{t("seed_classification_interface")}</AppbarHeader>
        <Select
          value={props.switchLanguage ? "en" : "fr"}
          onChange={handleLanguageChange}
          sx={selectStyle}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
        </Select>
      </AppbarContainer>
    </AppbarWrap>
  );
};

export default Appbar;
