import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const BackToTop = () => {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const backToZero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight <= window.scrollY) {
        if (show === false) {
          setShow(true);
        }
      } else if (window.scrollY < 500) {
        if (show === true) {
          setShow(false);
        }
      }

      return () => {
        setShow(false);
        window.removeEventListener("scroll");
      };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    show && (
      <IconButton className={classes.buttonOrange} onClick={backToZero}>
        <ArrowUpwardIcon className={classes.globalBtn} />
      </IconButton>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  buttonOrange: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    background: theme.palette.secondary.main,
    padding: "5px",
    borderRadius: theme.shape.borderRadius,
    zIndex: 2000,
    "&:hover": {
      background: theme.palette.secondary.dark,
    },
  },
  globalBtn: {
    color: theme.palette.secondary.contrastText,
  },
}));

export default BackToTop;
