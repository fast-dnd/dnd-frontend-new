import { DungeonTag } from "@/utils/dungeon-options";
import { StylesConfig } from "react-select";

const tagsComboboxStyles: StylesConfig<{ label: DungeonTag; value: DungeonTag }> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "transparent",
    border: "#ffffff50 1px solid",
    borderRadius: 0,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    boxShadow: "none",
    outline: "#ffffff50 1px solid",
    "&:hover": {
      borderColor: "#ffffff50",
    },
    ":focus-within": {
      borderColor: "#ff5a5a",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  clearIndicator: () => ({
    display: "none",
  }),
  multiValue: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#ffffff10",
    lineHeight: "28px",
    letterSpacing: "2.4px",
    paddingLeft: "8px",
  }),
  multiValueLabel: (baseStyles, state) => ({
    ...baseStyles,
    color: "#ffffff",
    fontSize: "12px",
    padding: 0,
    textTransform: "capitalize",
  }),
  multiValueRemove: (baseStyles, state) => ({
    ...baseStyles,
    paddingRight: "8px",
    color: "#ffffff",
    ":hover": {
      backgroundColor: "#ffffff10",
      color: "#ffffff",
    },
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#606768",
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    padding: "16px",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#555b5c",
    color: "#ffffff",
    ":hover": {
      backgroundColor: "#ffffff10",
      color: "#ffffff",
    },
    width: "fit-content",
    cursor: "pointer",
    transition: "all 0.2s ease",
    duration: "0.2s",
    textTransform: "capitalize",
  }),
  noOptionsMessage: (baseStyles, state) => ({
    ...baseStyles,
    color: "#ffffff",
    textAlign: "center",
    width: "100%",
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    color: "#ffffff",
  }),
};

export default tagsComboboxStyles;
