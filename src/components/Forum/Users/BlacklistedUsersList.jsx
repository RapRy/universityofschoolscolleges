import React from "react";
import { Container, LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import UsersList from "./UsersList";
import { PanelHeader } from "../../Globals/Headers";

const BlacklistedUsersList = () => {
  const { status, blacklistedUsers } = useSelector((state) => state.users);

  return (
    <Container>
      <PanelHeader title="Blacklisted Users" isWhite={false} isSmall={false} />
      {status === "loading" && blacklistedUsers.length === 0 && (
        <LinearProgress style={{ margin: "30px 0" }} />
      )}

      <UsersList
        selectorName="blacklistedUsers"
        emptyMessage="No Blacklisted Users"
      />
    </Container>
  );
};

export default BlacklistedUsersList;
