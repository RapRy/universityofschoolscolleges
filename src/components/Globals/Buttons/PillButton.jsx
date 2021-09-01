import React from "react";
import { Button, makeStyles, ThemeProvider } from "@material-ui/core";

import { ubuntuFont } from "../../../theme/themes";

const PillButton = ({
  text,
  bgColor,
  bgColorHover,
  textColor,
  padding,
  isFullWidth,
}) => {
  const classes = useStyles({
    bgColor,
    bgColorHover,
    textColor,
    padding,
  });
  return (
    <ThemeProvider theme={ubuntuFont}>
      <Button
        variant="contained"
        className={classes.root}
        disableRipple
        fullWidth={isFullWidth}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".85rem",
    color: (props) => props.textColor,
    padding: (props) => props.padding,
    textTransform: "capitalize",
    borderRadius: 50,
    background: (props) => props.bgColor,
    boxShadow: theme.shadows[1],
    "&:hover": {
      background: (props) => props.bgColorHover,
    },
  },
}));

export default PillButton;
