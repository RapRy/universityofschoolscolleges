import React from "react";
import {
  Container,
  Avatar,
  Box,
  Typography,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Moment from "react-moment";
import "moment-timezone";
import { Link } from "react-router-dom";

import { poppinsFont, ubuntuFont } from "../../../theme/themes";

const Post = (props) => {
  const { topic, fromHome } = props;
  const classes = useStyles({ fromHome });
  return (
    <Container className={classes.container}>
      {fromHome && (
        <ThemeProvider theme={poppinsFont}>
          <Typography variant="body1" className={classes.topDate}>
            <Moment format="MMM Do YYYY">{topic.createdAt}</Moment>
          </Typography>
        </ThemeProvider>
      )}
      <ThemeProvider theme={ubuntuFont}>
        <Link
          to={`/forum/${props.category?.name?.replace(" ", "-")}/${topic._id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography variant="body1" className={classes.title}>
            {topic.title}
          </Typography>
        </Link>
      </ThemeProvider>
      {/* for updated message */}
      {!fromHome && <Typography variant="body1"></Typography>}
      <ThemeProvider theme={poppinsFont}>
        <Box>
          <Typography variant="body1" className={classes.counterContainer}>
            <InsertCommentIcon className={classes.counterIcon} />{" "}
            {topic.meta.replies.length}
          </Typography>
          <Typography variant="body1" className={classes.counterContainer}>
            <VisibilityIcon className={classes.counterIcon} />{" "}
            {topic.meta.views.length}
          </Typography>
          <Typography variant="body1" className={classes.counterContainer}>
            <ThumbUpIcon className={classes.counterIcon} /> {10}
          </Typography>
          <Typography variant="body1" className={classes.counterContainer}>
            <ThumbDownIcon className={classes.counterIcon} /> {3}
          </Typography>
          <Typography variant="body1" className={classes.counterContainer}>
            <AccountBoxIcon className={classes.counterIcon} />{" "}
            {props.author?.username}
          </Typography>
        </Box>
      </ThemeProvider>
      <div className={classes.avatarGroup}>
        <AvatarGroup max={3} classes={{ avatar: classes.avatarBorder }}>
          <Avatar classes={{ colorDefault: classes.avatarBgAuthor }}>
            {props.author?.username?.charAt(0)}
          </Avatar>
          {props.participants?.map((user) => (
            <Avatar key={user._id} classes={{ colorDefault: classes.avatarBg }}>
              {user.username.charAt(0)}
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
  },
  topDate: {
    color: theme.palette.common.black,
    fontSize: ".85rem",
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(2),
  },
  title: {
    overflowX: (props) => (props.fromHome ? "hidden" : "visible"),
    whiteSpace: (props) => (props.fromHome ? "nowrap" : "normal"),
    textOverflow: (props) => (props.fromHome ? "ellipsis" : "clip"),
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    fontSize: "1rem",
    marginBottom: theme.spacing(1),
    transition: "color 300ms ease-in-out",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  counterContainer: {
    display: "inline-block",
    color: theme.palette.common.black,
    fontSize: ".85rem",
    marginRight: theme.spacing(2),
  },
  counterIcon: {
    verticalAlign: "middle",
    fontSize: ".95rem",
    marginRight: "3px",
  },
  avatarGroup: {
    marginTop: theme.spacing(4),
  },
  avatarBgAuthor: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.background.paper,
  },
  avatarBg: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.paper,
  },
  avatarBorder: {
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

export default Post;
