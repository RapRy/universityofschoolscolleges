import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

import UserDataList from "./UserDataList";
import {
  active_users_list,
  registered_users_list,
  new_users_list,
  blacklisted_list,
} from "../../../redux/usersReducer";
import Empty from "../../Globals/Empty/Empty";
import { poppinsFont } from "../../../theme/themes";

const UsersList = ({ selectorName, emptyMessage }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const classes = useStyles();

  const [refresher, setRefresher] = useState("");

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      switch (selectorName) {
        case "activeUsers":
          dispatch(active_users_list(0));
          break;
        case "newUsers":
          dispatch(new_users_list(10));
          break;
        case "blacklistedUsers":
          dispatch(blacklisted_list());
          break;
        default:
          dispatch(registered_users_list());
          break;
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, refresher, selectorName]);

  if (users.status === "idle" && users[selectorName].length === 0) {
    return <Empty message={emptyMessage} />;
  }

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <ThemeProvider theme={poppinsFont}>
          <TableHead>
            <TableRow>
              <TableCell classes={{ root: classes.cell }} />
              <TableCell classes={{ root: classes.cell }} align="left">
                ID
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="left">
                Username
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="left">
                Email
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="left">
                Latest Activity
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="left">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
        </ThemeProvider>
        <TableBody>
          {users[selectorName].map((user) => (
            <UserDataList
              key={user._id}
              user={user}
              selectorName={selectorName}
              setRefresher={setRefresher}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  cell: {
    borderBottom: `1px solid ${theme.palette.grey.A200}`,
    color: theme.palette.common.Black,
    fontSize: ".75rem",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default UsersList;
