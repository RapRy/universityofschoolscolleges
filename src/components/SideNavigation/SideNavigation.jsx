import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import UserProfile from "../Forum/Users/UserProfile";
import AdminSideNav from "./AdminSideNav";
import DefaultUserSideNav from "./DefaultUserSideNav";

const SideNavigation = () => {
  const { profile } = useSelector((state) => state.auth);
  // const classes = useStyles({ profile });

  const matchProfile = useRouteMatch("/forum/profile/:userId");

  // profile page
  if (matchProfile !== null) {
    return (
      <Container>
        <UserProfile />
      </Container>
    );
  }

  return (
    <Container>
      {profile.result?.accountType === 1 ? (
        <AdminSideNav />
      ) : (
        <DefaultUserSideNav />
      )}
    </Container>
  );
};

export default SideNavigation;
