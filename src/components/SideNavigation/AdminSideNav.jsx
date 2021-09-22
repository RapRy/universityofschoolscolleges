import React from "react";
import {
  Container,
  makeStyles,
  Divider,
  ThemeProvider,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";

import SearchBar from "../Globals/Search/SearchBar";
import { SideNavButton } from "../Globals/Buttons";
import { PanelHeader } from "../Globals/Headers";
import { ManagePanel } from "../Panels";
import { poppinsFont } from "../../theme/themes";

const manageArr = [
  {
    header: "manage users",
    options: [
      { _id: "active-users", name: "active users" },
      { _id: "registered-users", name: "registered users" },
      { _id: "blacklisted-users", name: "blacklisted users" },
    ],
  },
  {
    header: "manage forum",
    options: [
      { _id: "categories", name: "categories" },
      { _id: "topics", name: "topics all" },
    ],
  },
];

const AdminSideNav = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {/* <PanelButton opt={{ name: "overview", _id: "" }} /> */}
      <SearchBar />
      <ThemeProvider theme={poppinsFont}>
        <Divider className={classes.divider} />
        <SideNavButton
          data={{ _id: "", name: "Overview" }}
          icon={<DashboardIcon />}
        />
        <div>
          {manageArr.map((manage, i) => (
            <div key={i}>
              <Divider className={classes.divider} />
              <PanelHeader
                title={manage.header}
                isWhite={true}
                isSmall={true}
              />
              <ManagePanel manage={manage} />
            </div>
          ))}
        </div>
      </ThemeProvider>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.primary.main,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default AdminSideNav;
