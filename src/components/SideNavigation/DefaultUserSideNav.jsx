import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";
import CommentIcon from "@material-ui/icons/Comment";
import { makeStyles } from "@material-ui/styles";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import * as api from "../../api";
import { TopicsPanelSm, CategoriesPanel } from "../Panels";
import {
  get_latest_topics,
  get_related_topics,
  get_hot_topics,
} from "../../redux/topicsReducer";

const DefaultUserSideNav = () => {
  const { profile } = useSelector((state) => state.auth);

  const match = useRouteMatch("/forum/:category/:topicId");
  const matchSearch = useRouteMatch("/forum/search/:keyword");

  const min960 = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        direction={min960 ? "column" : "row"}
        spacing={min960 ? 0 : 4}
      >
        <Grid item xs={6} md={12}>
          <CategoriesPanel />
        </Grid>
        {min960 && matchSearch === null && match !== null && (
          <Grid item md={12}>
            <TopicsPanelSm
              header="related topics"
              API={api.getRelatedTopics}
              reduxDispatch={get_related_topics}
              selectorName="relatedTopics"
              icon={<TodayIcon classes={{ root: classes.svg }} />}
              limitOrId={match?.params?.topicId}
            />
          </Grid>
        )}
        {min960 && profile.result?.accountType === 0 && (
          <Grid item md={12}>
            <TopicsPanelSm
              header="latest topics"
              API={api.getLatestTopics}
              reduxDispatch={get_latest_topics}
              selectorName="latestTopics"
              icon={<TodayIcon classes={{ root: classes.svg }} />}
              limitOrId={8}
            />
          </Grid>
        )}
        {min960 && profile.result?.accountType === 0 && (
          <Grid item md={12}>
            <TopicsPanelSm
              header="hot topics"
              API={api.getHotTopics}
              reduxDispatch={get_hot_topics}
              selectorName="hotTopics"
              icon={<CommentIcon classes={{ root: classes.svg }} />}
              limitOrId={8}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  svg: {
    color: theme.palette.primary.light,
    fontSize: ".95rem",
    verticalAlign: "middle",
  },
}));

export default DefaultUserSideNav;
