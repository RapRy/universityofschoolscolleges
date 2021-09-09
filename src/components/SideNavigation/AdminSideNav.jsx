import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";

import PanelButton from "../Globals/PanelButton";
import { ManagePanel } from "../Panels";

const manageArr = [
  {
    header: "manage users",
    options: [
      { _id: "active-users", naSme: "active users" },
      { _id: "registered-users", name: "registered users" },
      { _id: "blacklisted-users", name: "blacklisted users" },
    ],
  },
  {
    header: "manage forum",
    options: [
      { _id: "categories", name: "categories" },
      { _id: "topics", name: "topics" },
    ],
  },
];

const AdminSideNav = () => {
  const max960 = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const max600 = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  return (
    <>
      <PanelButton opt={{ name: "overview", _id: "" }} />
      <Grid
        container
        direction={max960 === false || max600 === true ? "column" : "row"}
        spacing={2}
      >
        {manageArr.map((manage, i) => (
          <ManagePanel key={i} manage={manage} />
        ))}
      </Grid>
    </>
  );
};

export default AdminSideNav;
