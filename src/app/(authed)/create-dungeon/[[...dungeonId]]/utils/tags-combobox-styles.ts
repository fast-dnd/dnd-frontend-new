import { StylesConfig } from "react-select";

const tagsComboboxStyles: (error: boolean) => StylesConfig = (error) => ({
  control: (baseStyles, _state) => ({
    ...baseStyles,
    backgroundColor: "transparent",
    border: `1px solid ${error ? "#fc0000" : "#ffffff50"}`,
    borderRadius: 0,
    padding: "10px",
    boxShadow: "none",
    WebkitBorderRadius: 5,
    outline: "#ffffff50 1px solid",
    "&:hover": {
      borderColor: error ? "#fc0000" : "#ffffff50",
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
  multiValue: (baseStyles, _state) => ({
    ...baseStyles,
    backgroundColor: "#ffffff10",
    lineHeight: "28px",
    letterSpacing: "2.4px",
    paddingLeft: "8px",
    borderRadius: "5px",
  }),
  multiValueLabel: (baseStyles, _state) => ({
    ...baseStyles,
    color: "#ffffff",
    fontSize: "12px",
    padding: 0,
    textTransform: "capitalize",
  }),
  multiValueRemove: (baseStyles, _state) => ({
    ...baseStyles,
    paddingRight: "8px",
    color: "#ffffff",
    ":hover": {
      backgroundColor: "#ffffff10",
      color: "#ffffff",
    },
  }),
  menu: (baseStyles, _state) => ({
    ...baseStyles,
    backgroundColor: "#606768",
  }),
  menuList: (baseStyles, _state) => ({
    ...baseStyles,
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    padding: "16px",
  }),
  option: (baseStyles, _state) => ({
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
    borderRadius: "5px",
  }),
  noOptionsMessage: (baseStyles, _state) => ({
    ...baseStyles,
    color: "#ffffff",
    textAlign: "center",
    width: "100%",
  }),
  input: (baseStyles, _state) => ({
    ...baseStyles,
    color: "#ffffff",
  }),
});

export default tagsComboboxStyles;
