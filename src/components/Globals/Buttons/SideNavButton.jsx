import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

const SideNavButton = ({ data, icon }) => {
  const { url } = useRouteMatch();
  const classes = useStyles();
  return (
    <Link
      to={data._id !== "" ? `${url}/${data._id}` : "/forum"}
      className={classes.link}
    >
      <Button
        disableRipple
        disableFocusRipple
        fullWidth
        startIcon={icon}
        classes={{
          root: classes.cat,
          label: classes.catlabel,
        }}
      >
        {data.name}
      </Button>
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  cat: {
    color: theme.palette.common.white,
    textTransform: "capitalize",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".8rem",
    textAlign: "left",
    padding: theme.spacing(1, 2),
    transition: "background 400ms linear",
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
  catlabel: {
    justifyContent: "flex-start",
  },
  link: {
    textDecoration: "none",
    marginBottom: theme.spacing(2),
    display: "block",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  activeCat: {
    background: theme.palette.primary.dark,
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
}));

export default SideNavButton;
