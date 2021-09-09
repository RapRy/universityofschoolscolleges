import React, { useEffect } from "react";
import { Avatar, makeStyles, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

const UserMenu = ({ setShowAside, showAside }) => {
  const classes = useStyles();

  const { profile } = useSelector((state) => state.auth);

  return (
    <Grid container justify="flex-end">
      <Avatar
        onClick={() => setShowAside(!showAside)}
        className={classes.avatar}
        src={
          profile.result?.accountType === 0
            ? `${process.env.PUBLIC_URL}/assets/defaultProPic.jpg`
            : `${process.env.PUBLIC_URL}/assets/adminProPic.jpg`
        }
      >
        {profile.result?.username.charAt(0)}
      </Avatar>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: "pointer",
  },
}));

export default UserMenu;
