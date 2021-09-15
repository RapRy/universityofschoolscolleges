import React from "react";
import {
  Button,
  Divider,
  Typography,
  Avatar,
  Box,
  Grid,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { logout } from "../../redux/authReducer";
import { ubuntuFont } from "../../theme/themes";

const ProfileMenu = ({ max960, setShowAside }) => {
  const { profile } = useSelector((state) => state.auth);
  const profileLs = JSON.parse(localStorage.getItem("profile")).result;
  const dispatch = useDispatch();

  const classes = useStyles();

  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout(history));
  };

  const handleProfileClick = () => {
    setShowAside((prevState) => !prevState);
  };

  return (
    <div className={classes.container}>
      <ThemeProvider theme={ubuntuFont}>
        {max960 && (
          <>
            <Box marginBottom="25px" marginTop="20px">
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs={"auto"}>
                  <Avatar>{profile.result?.username?.charAt(0)}</Avatar>
                </Grid>
                <Grid item>
                  <Typography className={classes.username}>
                    {profile.result?.username}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider className={classes.divider} />
          </>
        )}
        <Box>
          <Link
            to={`/forum/profile/${profile.result?._id || profileLs?._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="text"
              color="secondary"
              startIcon={<AccountCircleIcon />}
              onClick={handleProfileClick}
              className={classes.buttons}
            >
              My Profile
            </Button>
          </Link>
          <Divider className={classes.divider} />
          <Button
            variant="text"
            color="secondary"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            className={classes.buttons}
          >
            Log Out
          </Button>
        </Box>
      </ThemeProvider>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "250px",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  username: {
    fontSize: ".9rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
  },
  buttons: {
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: ".8rem",
    transition: "color 300ms linear",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));

export default ProfileMenu;
