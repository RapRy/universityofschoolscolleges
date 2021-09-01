import React from "react";
import { Typography, Grid, makeStyles, ThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";

import { ubuntuFont } from "../../theme/themes";

const MainHeader = ({ heading, cta }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={ubuntuFont}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={9} md={11}>
          <Typography variant="h3" className={classes.header}>
            {heading}
          </Typography>
        </Grid>
        {cta !== "" && (
          <Grid item xs={3} sm={2} md={"auto"} style={{ textAlign: "right" }}>
            <Link to="#" className={classes.cta}>
              {cta}
            </Link>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.dark,
    fontSize: "1.3rem",
    marginBottom: theme.spacing(3),
  },
  cta: {
    textTransform: "uppercase",
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.light,
    fontSize: ".8rem",
    textDecoration: "none",
    transition: "color 200ms ease-in-out",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default MainHeader;
