import React from "react";
import { Typography, makeStyles, ThemeProvider } from "@material-ui/core";
import { poppinsFont } from "../../../theme/themes";

const PanelHeader = ({ title, isWhite, isSmall }) => {
  const classes = useStyles({ isWhite, isSmall });
  return (
    <ThemeProvider theme={poppinsFont}>
      <Typography variant="h6" className={classes.root}>
        {title}
      </Typography>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: (props) =>
      props.isWhite ? theme.palette.common.white : theme.palette.common.black,
    fontWeight: (props) =>
      props.isSmall
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightBold,
    fontSize: (props) => (props.isSmall ? ".8rem" : "1rem"),
    textTransform: "capitalize",
    marginBottom: theme.spacing(2),
  },
}));

export default PanelHeader;
