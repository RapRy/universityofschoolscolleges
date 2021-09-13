import React from "react";
import { makeStyles, ThemeProvider, Button } from "@material-ui/core";
import { ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";

import { poppinsFont } from "../../../theme/themes";

const VotesBtn = ({ isVoted, icon, event }) => {
  const classes = useStyles({ isVoted });
  return (
    <ThemeProvider theme={poppinsFont}>
      <Button
        disableFocusRipple
        disableRipple
        disabled={isVoted}
        startIcon={
          icon === "up" ? (
            <ThumbUpAlt className={classes.icon} />
          ) : (
            <ThumbDownAlt className={classes.icon} />
          )
        }
        variant="contained"
        classes={{ root: classes.root }}
        onClick={event}
      >
        {!isVoted ? "+1" : ""}
      </Button>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    color: (props) =>
      !props.isVoted
        ? theme.palette.common.white
        : theme.palette.secondary.main,
    marginLeft: (props) => (props.isVoted ? theme.spacing(1) : 0),
  },
  root: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    height: theme.spacing(4),
    width: theme.spacing(10),
    background: theme.palette.secondary.main,
    "&:hover": {
      background: theme.palette.secondary.light,
    },
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.common.white,
  },
}));

export default VotesBtn;
