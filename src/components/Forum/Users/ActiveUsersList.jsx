import React from "react";
import { Container, LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import UsersList from "./UsersList";
import { PanelHeader } from "../../Globals/Headers";

const ActiveUsersList = () => {
  const { status, activeUsers } = useSelector((state) => state.users);

  return (
    <Container>
      <PanelHeader title="Active Users" isWhite={false} isSmall={false} />
      {status === "loading" && activeUsers.length === 0 && (
        <LinearProgress style={{ margin: "30px 0" }} />
      )}

      <UsersList selectorName="activeUsers" emptyMessage="No Active Users" />
    </Container>
  );
};

export default ActiveUsersList;
