import React from "react";
import { Container } from "@material-ui/core";

import { ForumStatsPanel, TopicsPanelLg, UsersPanelLg } from "../../Panels";
import * as api from "../../../api";
import {
  get_latest_topics,
  get_hot_topics,
} from "../../../redux/topicsReducer";
import {
  new_users_panel,
  active_users_panel,
} from "../../../redux/usersReducer";

const Overview = () => {
  return (
    <Container>
      <ForumStatsPanel />

      <UsersPanelLg
        header="new users"
        API={api.getNewUsers}
        reduxDispatch={new_users_panel}
        selectorName="newUsers"
      />

      <UsersPanelLg
        header="active users"
        API={api.getActiveUsers}
        reduxDispatch={active_users_panel}
        selectorName="activeUsers"
      />

      <TopicsPanelLg
        header="latest topics"
        API={api.getLatestTopics}
        reduxDispatch={get_latest_topics}
        selectorName="latestTopics"
      />
      <TopicsPanelLg
        header="hot topics"
        API={api.getHotTopics}
        reduxDispatch={get_hot_topics}
        selectorName="hotTopics"
      />
    </Container>
  );
};

export default Overview;
