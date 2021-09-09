import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, IconButton, Avatar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

import * as api from "../../../api";

const UserDataList = ({ user, selectorName, setRefresher }) => {
  const classes = useRowStyles();

  const { enqueueSnackbar } = useSnackbar();

  const dateString = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const updatedAt = new Date(user.updatedAt);
    const createdAt = new Date(user.createdAt);

    switch (selectorName) {
      case "activeUsers":
        return `${
          months[updatedAt.getMonth()]
        } ${updatedAt.getDate()}, ${updatedAt.getFullYear()}`;
      case "blacklistedUsers":
        return `${
          months[updatedAt.getMonth()]
        } ${updatedAt.getDate()}, ${updatedAt.getFullYear()}`;
      default:
        return `${
          months[createdAt.getMonth()]
        } ${createdAt.getDate()}, ${createdAt.getFullYear()}`;
    }
  };

  const blockUser = async () => {
    try {
      const { status } = await api.blockUser(user._id);

      if (status === 200) {
        enqueueSnackbar(`${user.username} blocked`, { variant: "success" });
        setRefresher(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unblockUser = async () => {
    try {
      const { status } = await api.unblockUser(user._id);

      if (status === 200) {
        enqueueSnackbar(`${user.username} unblocked`, { variant: "success" });
        setRefresher(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activateUser = async () => {
    try {
      const { status } = await api.activateUser(user._id);

      if (status === 200) {
        enqueueSnackbar(`${user.username} is now active`, {
          variant: "success",
        });
        setRefresher(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deactivateUser = async () => {
    try {
      const { status } = await api.deactivateUser(user._id);

      if (status === 200) {
        enqueueSnackbar(`${user.username} is now inactive`, {
          variant: "success",
        });
        setRefresher(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableRow className={classes.tableRowMain}>
        <TableCell>
          <Avatar>{user.username.charAt(0)}</Avatar>
        </TableCell>
        <TableCell classes={{ root: classes.tableCellMainData }} align="left">
          {user.schoolId}
        </TableCell>
        <TableCell classes={{ root: classes.tableCellMainData }} align="left">
          <Link to={`/forum/profile/${user._id}`} className={classes.nameLink}>
            {user.username}
          </Link>
        </TableCell>
        <TableCell classes={{ root: classes.tableCellMainData }} align="left">
          {user.email}
        </TableCell>
        <TableCell classes={{ root: classes.tableCellMainData }} align="left">
          {dateString()}
        </TableCell>
        <TableCell align="left">
          {(selectorName === "activeUsers" ||
            selectorName === "blacklistedUsers") && (
            <IconButton
              classes={{ root: `${classes.buttonBlue} ${classes.marginRight}` }}
            >
              <PersonIcon className={classes.globalBtn} />
            </IconButton>
          )}
          {selectorName === "activeUsers" && (
            <IconButton
              onClick={blockUser}
              classes={{
                root: `${classes.buttonOrange} ${classes.marginRight}`,
              }}
            >
              <BlockIcon className={classes.globalBtn} />
            </IconButton>
          )}
          {selectorName === "registeredUsers" && user.active === 0 && (
            <IconButton
              onClick={activateUser}
              classes={{ root: `${classes.buttonBlue} ${classes.marginRight}` }}
            >
              <PersonAddIcon className={classes.globalBtn} />
            </IconButton>
          )}
          {selectorName === "blacklistedUsers" && (
            <IconButton
              onClick={unblockUser}
              classes={{ root: `${classes.buttonBlue} ${classes.marginRight}` }}
            >
              <HowToRegIcon className={classes.globalBtn} />
            </IconButton>
          )}
          <IconButton
            onClick={deactivateUser}
            classes={{ root: classes.buttonOrange }}
          >
            <DeleteIcon className={classes.globalBtn} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

const useRowStyles = makeStyles((theme) => ({
  tableRowMain: {
    background: theme.palette.secondary.contrastText,
    padding: theme.spacing(3),
  },
  tableCellMainData: {
    fontSize: ".8rem",
    color: theme.palette.secondary.dark,
    fontWeight: theme.typography.fontWeightBold,
  },
  nameLink: {
    textDecoration: "none",
    color: theme.palette.secondary.dark,
  },
  globalBtn: {
    color: theme.palette.secondary.contrastText,
  },
  buttonBlue: {
    background: theme.palette.primary.main,
    padding: "5px",
    borderRadius: theme.shape.borderRadius,
  },
  buttonOrange: {
    background: theme.palette.secondary.main,
    padding: "5px",
    borderRadius: theme.shape.borderRadius,
  },
  marginRight: {
    marginRight: "5px",
  },
}));

export default UserDataList;
