import React from "react";
import { Button, makeStyles, ThemeProvider } from "@material-ui/core";
import { ubuntuFont } from "../../../theme/themes";

const IconTextBtn = ({ icon, text, color, size, isLowercase, event }) => {
  const classes = useStyles({ color, size, isLowercase });
  return (
    <ThemeProvider theme={ubuntuFont}>
      <Button
        disableFocusRipple
        disableRipple
        variant="text"
        startIcon={icon}
        classes={{ root: classes.root }}
        onClick={event}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    marginRight: theme.spacing(3),
    color: (props) =>
      props.color === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    fontSize: (props) => props.size,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: (props) => (props.isLowercase ? "lowercase" : "capitalize"),
    transition: "color 400ms linear",
    "&:hover": {
      background: "transparent",
      color: (props) =>
        props.color === "primary"
          ? theme.palette.primary.light
          : theme.palette.secondary.light,
    },
  },
}));

export default IconTextBtn;
