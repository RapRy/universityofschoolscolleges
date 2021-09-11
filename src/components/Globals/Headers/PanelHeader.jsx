import React from "react";
import { Typography, makeStyles, ThemeProvider } from "@material-ui/core";
import { poppinsFont } from "../../../theme/themes";

const PanelHeader = ({ title }) => {
  const classes = useStyles();
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
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".9rem",
    textTransform: "capitalize",
    marginBottom: theme.spacing(2),
  },
}));

export default PanelHeader;
