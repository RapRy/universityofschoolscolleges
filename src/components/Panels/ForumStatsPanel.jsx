import React from "react";
import { Container, useMediaQuery, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  People,
  Forum,
  Comment,
  Folder,
  ThumbUpAlt,
  ThumbDownAlt,
} from "@material-ui/icons";

import { PanelHeader } from "../Globals/Headers";
import * as api from "../../api";
import Stat from "./Stats/Stat";
import { withAllUsersCount } from "../HOC";

const StatWithAllUsersCount = withAllUsersCount(Stat);

const ForumStatsPanel = () => {
  const { profile } = useSelector((state) => state.auth);

  const min960 = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const classes = useStyles({ min960 });

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
      <Stat
        header="up votes"
        icon={<ThumbUpAlt fontSize="large" className={classes.iconOrange} />}
        apiReq={api.getUpVotesCount}
        index="upvotesCount"
        colorType="secondary"
      />
      <Stat
        header="up votes"
        icon={<ThumbDownAlt fontSize="large" className={classes.iconOrange} />}
        apiReq={api.getDownVotesCount}
        index="downvotesCount"
        colorType="secondary"
      />
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: (props) => (props.min960 ? 0 : theme.spacing(5)),
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
