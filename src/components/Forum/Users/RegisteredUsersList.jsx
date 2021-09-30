import React from "react";
import { Container, Typography, LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import UsersList from "./UsersList";
import { PanelHeader } from "../../Globals/Headers";

const RegisteredUsersList = () => {
  const { status, registeredUsers } = useSelector((state) => state.users);

  return (
    <Container>
      <PanelHeader title="Registered Users" isWhite={false} isSmall={false} />
      {status === "loading" && registeredUsers.length === 0 && (
        <LinearProgress style={{ margin: "30px 0" }} />
      )}

      <UsersList
        selectorName="registeredUsers"
        emptyMessage="No Registered Users"
      />
    </Container>
  );
};

export default RegisteredUsersList;
