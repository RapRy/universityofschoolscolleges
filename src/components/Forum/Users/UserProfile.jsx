import React, { useEffect, useState } from "react";
import {
  Container,
  Avatar,
  Typography,
  Box,
  Divider,
  Button,
  Grid,
  useMediaQuery,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DescriptionIcon from "@material-ui/icons/Description";
import ForumIcon from "@material-ui/icons/Forum";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import * as api from "../../../api";
import { ubuntuFont, poppinsFont } from "../../../theme/themes";
import { IconTextBtn } from "../../Globals/Buttons";

const UserProfile = () => {
  const max600 = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();
  const [user, setUser] = useState({});

  const history = useHistory();

  const matchEdit = useRouteMatch("/forum/profile/edit/:userId");
  const matchProfile = useRouteMatch("/forum/profile/:userId");

  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (profile.result === null) history.push("/auth");

    const source = axios.CancelToken.source();

    api
      .getUser(matchEdit?.params.userId || matchProfile?.params.userId, source)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      source.cancel("request cancelled");
    };
  }, [matchProfile?.params?.userId, matchEdit?.params?.userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className={classes.container}>
      <Grid container direction="row" spacing={5} alignItems="center">
        <Grid item xs={"auto"} sm={"auto"} md={12}>
          <Box
            position="relative"
            maxWidth="192px"
            minWidth="144px"
            width="100%"
            margin="0 auto"
          >
            <Avatar
              className={classes.avatar}
              src={
                user.accountType === 0
                  ? `${process.env.PUBLIC_URL}/assets/defaultProPic.jpg`
                  : `${process.env.PUBLIC_URL}/assets/adminProPic.jpg`
              }
            >
              {user.username?.charAt(0)}
            </Avatar>
            <div className={classes.addPhotoIconContainer}>
              <AddAPhotoIcon className={classes.addPhotoIcon} />
            </div>
          </Box>
        </Grid>
        <Grid item xs={6} sm={8} md={12}>
          <ThemeProvider theme={ubuntuFont}>
            <Typography className={classes.typoName}>
              {user.name?.firstName || "First Name"}{" "}
              {user.name?.lastName || "Last Name"}
            </Typography>
          </ThemeProvider>
          <ThemeProvider theme={poppinsFont}>
            <Box marginTop="20px">
              <Typography
                className={`${classes.typoWithIcon} ${classes.marginTop2}`}
              >
                <AccountCircleIcon className={classes.typoIcon} />{" "}
                {user.username}
              </Typography>
              <Typography
                className={`${classes.typoWithIcon} ${classes.marginTop1}`}
              >
                <AlternateEmailIcon className={classes.typoIcon} /> {user.email}
              </Typography>
            </Box>
            <div className={classes.statsContainer}>
              <Box
                display={max600 ? "inline-block" : "block"}
                marginRight={max600 ? "20px" : "0"}
              >
                <Typography className={classes.statNum}>
                  {user.post?.topics.length}
                </Typography>
                <Typography className={classes.statSting}>
                  {user.post?.topics.length > 1 ? "Posts" : "Post"}
                </Typography>
              </Box>
              <Divider className={classes.divider} />
              <Box
                className={classes.marginTop1}
                display={max600 ? "inline-block" : "block"}
              >
                <Typography className={classes.statNum}>
                  {user.post?.replies.length}
                </Typography>
                <Typography className={classes.statSting}>
                  {user.post?.replies.length > 1 ? "Replies" : "Reply"}
                </Typography>
              </Box>
              <Divider className={classes.divider} />
              <Box
                className={classes.marginTop1}
                display={max600 ? "inline-block" : "block"}
              >
                <Typography className={classes.statNum}>
                  {user.post?.upvotes.length}
                </Typography>
                <Typography className={classes.statSting}>
                  {user.post?.upvotes.length > 1 ? "Up Votes" : "Up Vote"}
                </Typography>
              </Box>
              <Divider className={classes.divider} />
              <Box
                className={classes.marginTop1}
                display={max600 ? "inline-block" : "block"}
              >
                <Typography className={classes.statNum}>
                  {user.post?.downvotes.length}
                </Typography>
                <Typography className={classes.statSting}>
                  {user.post?.downvotes.length > 1 ? "Down Votes" : "Down Vote"}
                </Typography>
              </Box>
            </div>
          </ThemeProvider>
        </Grid>
      </Grid>
      {
        // (user._id === profileLs?._id || user._id === profile.result?._id) &&
        user._id === profile.result?._id && (
          <ThemeProvider theme={ubuntuFont}>
            <Divider className={classes.divider2} />
            <Link
              to="/forum"
              style={{
                textDecoration: "none",
                marginRight: "16px",
                display: "block",
              }}
            >
              <IconTextBtn
                icon={<ForumIcon />}
                text="Back to Forum"
                color="secondary"
                isLowercase={false}
                event={null}
              />
            </Link>

            {matchEdit !== null ? (
              <Link
                to={`/forum/profile/${user._id}`}
                style={{
                  textDecoration: "none",
                  marginRight: "16px",
                  display: "block",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                <IconTextBtn
                  icon={<DescriptionIcon />}
                  text="Posts"
                  color="secondary"
                  isLowercase={false}
                  event={null}
                />
              </Link>
            ) : (
              <Link
                to={`/forum/profile/edit/${user._id}`}
                style={{
                  textDecoration: "none",
                  marginRight: "16px",
                  display: "block",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                <IconTextBtn
                  icon={<EditIcon />}
                  text="Edit Profile"
                  color="primary"
                  isLowercase={false}
                  event={null}
                />
              </Link>
            )}
            <IconTextBtn
              icon={<ExitToAppIcon />}
              text="Deactivate Account"
              color="primary"
              isLowercase={false}
              event={null}
            />
          </ThemeProvider>
        )
      }
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    background: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  },
  avatar: {
    width: theme.spacing(24),
    height: theme.spacing(24),
    fontSize: theme.spacing(18),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(18),
      height: theme.spacing(18),
      fontSize: theme.spacing(12),
    },
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginTop1: {
    marginTop: theme.spacing(1),
  },
  typoName: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "1rem",
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  typoWithIcon: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: ".8rem",
  },
  typoIcon: {
    verticalAlign: "middle",
    fontSize: "1.1rem",
    marginRight: "5px",
  },
  statNum: {
    fontSize: "1.7rem",
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
    display: "inline-block",
    marginRight: theme.spacing(2),
  },
  statSting: {
    fontSize: ".9rem",
    color: theme.palette.common.white,
    display: "inline-block",
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  divider2: {
    margin: theme.spacing(4, 0),
  },
  button: {
    color: theme.palette.secondary.main,
    fontSize: ".85rem",
    fontWeight: theme.typography.fontWeightBold,
    textAlign: "left",
    display: "inline-block",
  },
  btnDeact: {
    color: theme.palette.secondary.contrastText,
    fontSize: ".85rem",
    background: theme.palette.primary.dark,
    fontWeight: theme.typography.fontWeightBold,
    textAlign: "left",
  },
  addPhotoIconContainer: {
    position: "absolute",
    right: "5px",
    bottom: "5px",
    background: theme.palette.primary.light,
    borderRadius: "50px",
    width: theme.spacing(5),
    height: theme.spacing(5),
    cursor: "pointer",
  },
  addPhotoIcon: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    fontSize: "1.3rem",
    color: theme.palette.common.white,
  },
  statsContainer: {
    background: theme.palette.secondary.main,
    padding: theme.spacing(2, 3),
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(4),
  },
}));

export default UserProfile;
