import React from "react";
import {
  makeStyles,
  Typography,
  ThemeProvider,
  Avatar,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import { poppinsFont } from "../../../../theme/themes";

const StatCounter = ({ count, label, color, isAuthor, author }) => {
  const classes = useStyles({ color });

  return (
    <ThemeProvider theme={poppinsFont}>
      <div className={classes.container}>
        {isAuthor ? (
          <>
            <PersonIcon className={classes.avatar} />
            <Typography variant="body1" className={classes.author}>
              {author.username}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body1" className={classes.count}>
              {count}
            </Typography>
            <Typography variant="body1" className={classes.label}>
              {label}
            </Typography>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    display: "inline-block",
    background: (props) =>
      props.color === "primary"
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },
  count: {
    display: "inline-block",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".95rem",
    marginRight: theme.spacing(1),
    color: (props) =>
      props.color === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
  label: {
    display: "inline-block",
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: ".75rem",
    color: theme.palette.common.black,
    textTransform: "lowercase",
  },
  avatar: {
    fontSize: "1.2rem",
    verticalAlign: "middle",
    marginRight: theme.spacing(1),
    marginBottom: "3px",
    color: theme.palette.primary.dark,
  },
  author: {
    display: "inline-block",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".85rem",
    color: theme.palette.primary.main,
    textTransform: "capitalize",
  },
}));

export default StatCounter;
