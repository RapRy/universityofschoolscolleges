import React from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import CommentIcon from "@material-ui/icons/Comment";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link } from "react-router-dom";
import moment from "moment";

import { poppinsFont, ubuntuFont } from "../../../theme/themes";

const UserThumbnailPanel = ({ user, type }) => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Box position="relative">
        {type === "newUsers" && <PersonAddIcon className={classes.pAddIcon} />}
        <Link
          to={`/forum/profile/${user._id}`}
          style={{ textDecoration: "none" }}
        >
          <div>
            <Avatar
              src={
                user.accountType === 0
                  ? `${process.env.PUBLIC_URL}/assets/defaultProPic.jpg`
                  : `${process.env.PUBLIC_URL}/assets/adminProPic.jpg`
              }
              className={classes.avatar}
            >
              {user.username.charAt(0)}
            </Avatar>
            <ThemeProvider theme={ubuntuFont}>
              <Typography variant="body1" className={classes.username}>
                {user.username}
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={poppinsFont}>
              {type === "newUsers" && (
                <Typography variant="body1" className={classes.email}>
                  {user.email}
                </Typography>
              )}
              {type === "activeUsers" && (
                <div className={classes.counterContainer}>
                  <div className={classes.counter}>
                    <Typography variant="body1" className={classes.counterText}>
                      <ForumIcon className={classes.icon} />
                      {user.post.topics.length}
                    </Typography>
                  </div>
                  <div className={classes.counter}>
                    <Typography variant="body1" className={classes.counterText}>
                      <CommentIcon className={classes.icon} />
                      {user.post.replies.length}
                    </Typography>
                  </div>
                </div>
              )}
              <Typography variant="body1" className={classes.date}>
                {type === "activeUsers"
                  ? `last activity on ${moment(user.updatedAt).format(
                      "MMM Do YYYY"
                    )}`
                  : `joined on ${moment(user.createdAt).format("MMM Do YYYY")}`}
              </Typography>
            </ThemeProvider>
          </div>
        </Link>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(2, 1),
    background: theme.palette.background.default,
    borderRadius: theme.spacing(2),
  },
  pAddIcon: {
    position: "absolute",
    top: theme.spacing(-1),
    zIndex: 5,
    left: 0,
    background: theme.palette.primary.light,
    borderRadius: theme.spacing(1),
    padding: "5px",
    boxShadow: theme.shadows[3],
    fontSize: "1.8rem",
    color: theme.palette.common.white,
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: "0 auto 20px",
  },
  username: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    fontSize: ".9rem",
    textAlign: "center",
  },
  email: {
    textAlign: "center",
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: ".7rem",
    marginBottom: "20px",
  },
  date: {
    color: theme.palette.grey.A200,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: ".7rem",
    textAlign: "center",
  },
  counterContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  counter: {
    display: "inline-block",
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
  },
  counterText: {
    fontSize: ".8rem",
    color: theme.palette.common.black,
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: ".9rem",
    verticalAlign: "middle",
    marginRight: "5px",
  },
}));

export default UserThumbnailPanel;
