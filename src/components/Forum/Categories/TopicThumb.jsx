import React from "react";
import {
  Container,
  Typography,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { poppinsFont, ubuntuFont } from "../../../theme/themes";

const TopicThumb = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <ThemeProvider theme={ubuntuFont}>
        <Link
          to={`/forum/${props.category?.name?.replace(" ", "-")}/${
            props.topic?._id
          }`}
          style={{ textDecoration: "none", overflowX: "hidden" }}
        >
          <Typography variant="h6" className={classes.title}>
            {props.topic?.title}
          </Typography>
        </Link>
      </ThemeProvider>
      <ThemeProvider theme={poppinsFont}>
        <>
          <Typography variant="body1" className={classes.counterContainer}>
            <InsertCommentIcon className={classes.counterIcon} />{" "}
            {props.topic?.meta?.replies?.length}
          </Typography>
          <Typography variant="body1" className={classes.counterContainer}>
            <VisibilityIcon className={classes.counterIcon} />{" "}
            {props.topic?.meta?.views?.length}
          </Typography>
          <Typography variant="body1" className={classes.counterContainer}>
            <ThumbUpIcon className={classes.counterIcon} />{" "}
            {props.topic?.meta?.upvotes?.length}
          </Typography>
          <Typography variant="body1" className={classes.counterContainer}>
            <ThumbDownIcon className={classes.counterIcon} />{" "}
            {props.topic?.meta?.downvotes?.length}
          </Typography>
          <Typography variant="body1" className={classes.counterContainer}>
            <AccountBoxIcon className={classes.counterIcon} />{" "}
            {props.author?.username}
          </Typography>
        </>
      </ThemeProvider>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    overflowX: "hidden",
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    color: theme.palette.common.black,
    fontSize: ".9rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflowX: "hidden",
  },
  counterContainer: {
    display: "inline-block",
    color: theme.palette.common.black,
    fontSize: ".75rem",
    marginRight: theme.spacing(2),
  },
  counterIcon: {
    verticalAlign: "middle",
    fontSize: ".95rem",
    marginRight: "3px",
  },
}));

export default TopicThumb;
