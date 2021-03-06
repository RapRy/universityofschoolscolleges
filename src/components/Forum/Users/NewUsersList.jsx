import React from "react";
import { Container, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

import UsersList from "./UsersList";
import { PanelHeader } from "../../Globals/Headers";

const NewUsersList = () => {
  const classes = useStyles();
  const { status, newUsers } = useSelector((state) => state.users);

  return (
    <div>
      <Container>
        <PanelHeader title="New Users" isWhite={false} isSmall={false} />

        {status === "loading" && newUsers.length === 0 && (
          <LinearProgress style={{ margin: "30px 0" }} />
        )}

        <UsersList selectorName="newUsers" emptyMessage="No New Users" />
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  typoH2: {
    fontWeight: 700,
    fontSize: "1.2rem",
    marginTop: "40px",
    textTransform: "uppercase",
    color: theme.palette.secondary.dark,
  },
}));

export default NewUsersList;
