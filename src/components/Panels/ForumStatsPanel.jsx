import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { People, Forum, Comment, Folder } from "@material-ui/icons";

import { PanelHeader } from "../Globals/Headers";
import * as api from "../../api";
import Stat from "./Stats/Stat";
import { withAllUsersCount } from "../HOC";

const StatWithAllUsersCount = withAllUsersCount(Stat);

const ForumStatsPanel = () => {
  const { profile } = useSelector((state) => state.auth);

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <PanelHeader title="forum statistics" />
      {profile.result?.accountType === 0 && (
        <Stat
          header="members"
          icon={<People fontSize="large" className={classes.iconBlue} />}
          apiReq={api.getActiveUsersCount}
          index="activeUsersCount"
          colorType="primary"
        />
      )}
      {profile.result?.accountType === 1 && (
        <>
          <StatWithAllUsersCount
            header="active members"
            icon={<People fontSize="large" className={classes.iconBlue} />}
            apiReq={api.getActiveUsersCount}
            index="activeUsersCount"
            colorType="primary"
          />
          <Stat
            header="categories"
            icon={<Folder fontSize="large" className={classes.iconOrange} />}
            apiReq={api.getCategoriesCount}
            index="categoriesCount"
            colorType="secondary"
          />
        </>
      )}
      <Stat
        header="topics"
        icon={<Forum fontSize="large" className={classes.iconOrange} />}
        apiReq={api.getTopicCount}
        index="topicsCount"
        colorType="secondary"
      />
      <Stat
        header="comments"
        icon={<Comment fontSize="large" className={classes.iconOrange} />}
        apiReq={api.repliesCount}
        index="repliesCount"
        colorType="secondary"
      />
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(4),
  },
  iconBlue: {
    verticalAlign: "bottom",
    color: theme.palette.primary.main,
  },
  iconOrange: {
    verticalAlign: "bottom",
    color: theme.palette.secondary.main,
  },
}));

export default ForumStatsPanel;
