import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";

const IconBtn = ({ icon, color, colorHover, event, type }) => {
  const classes = useStyles({ color, colorHover });
  return (
    <IconButton
      disableFocusRipple
      disableRipple
      classes={{ root: classes.root }}
      onClick={event}
      type={type}
    >
      {icon}
    </IconButton>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => props.color,
    borderRadius: theme.spacing(1),
    padding: "5px",
    boxShadow: theme.shadows[3],
    color: theme.palette.common.white,
    cursor: "pointer",
    "&:hover": {
      background: (props) => props.colorHover,
    },
    // padding: theme.spacing(2),
    // height: "100%",
    // display: "inline-block",
    // color: theme.palette.common.white,
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: ({ color }) =>
    //   color === "primary"
    //     ? theme.palette.primary.dark
    //     : theme.palette.secondary.main,
    // "&:hover": {
    //   backgroundColor: ({ color }) =>
    //     color === "primary"
    //       ? theme.palette.primary.main
    //       : theme.palette.secondary.light,
    // },
  },
}));

export default IconBtn;
