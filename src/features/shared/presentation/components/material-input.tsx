import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";

interface InputProps extends StandardTextFieldProps {
  colorTheme: "white" | "black";
}

export const MaterialInput = styled(
  (props: InputProps) => <TextField {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "colorTheme",
  }
)(({ colorTheme, theme }) => ({
  ...(colorTheme === "white" && {
    "& input": {
      color: "white !important",
      "-webkit-text-fill-color": "white !important",
    },
    "& label": {
      color: "white !important",
    },
    "& fieldset": {
      borderColor: "white !important",
    },
    "&:hover fieldset": {
      borderColor: "white !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white !important",
    },
  }),

  ...(colorTheme === "black" && {
    "& input": {
      color: "#22201A !important",
      "-webkit-text-fill-color": "#22201A !important",
    },
    "& label": {
      color: "#22201A !important",
    },
    "& fieldset": {
      borderColor: "#22201A !important",
    },
    "&:hover fieldset": {
      borderColor: "#22201A !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#22201A !important",
    },
  }),
}));
