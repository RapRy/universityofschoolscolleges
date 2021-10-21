import React from "react";
import {
  TableRow,
  TableCell,
  Avatar,
  makeStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import * as api from "../../../api";
import { ubuntuFont } from "../../../theme/themes";
import { IconBtn } from "../../Globals/Buttons";

const UserDataList = ({ user, selectorName, setRefresher }) => {
  const classes = useRowStyles();
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

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
      <ThemeProvider theme={ubuntuFont}>
        <TableRow className={classes.tableRowMain}>
          <TableCell>
            <Avatar
              src={
                user?.accountType === 0
                  ? `${process.env.PUBLIC_URL}/assets/defaultProPic.jpg`
                  : `${process.env.PUBLIC_URL}/assets/adminProPic.jpg`
              }
            >
              {user.username.charAt(0)}
            </Avatar>
          </TableCell>
          <TableCell classes={{ root: classes.tableCellMainData }} align="left">
            {user.schoolId}
          </TableCell>
          <TableCell classes={{ root: classes.tableCellMainData }} align="left">
            <Link
              to={`/forum/profile/${user._id}`}
              className={classes.nameLink}
            >
              {user.username}
            </Link>
          </TableCell>
          <TableCell classes={{ root: classes.tableCellMainData }} align="left">
            {user.email}
          </TableCell>
          <TableCell classes={{ root: classes.tableCellMainData }} align="left">
            <Moment format="MMMM D, YYYY">{user.createdAt}</Moment>
          </TableCell>
          <TableCell align="left">
            {(selectorName === "activeUsers" ||
              selectorName === "blacklistedUsers") && (
              <IconBtn
                icon={<PersonIcon />}
                color={theme.palette.primary.main}
                colorHover={theme.palette.primary.light}
                event={null}
                type="button"
              />
            )}
            {selectorName === "activeUsers" && (
              <IconBtn
                icon={<BlockIcon />}
                color={theme.palette.error.dark}
                colorHover={theme.palette.error.main}
                event={blockUser}
                type="button"
              />
            )}
            {selectorName === "registeredUsers" && user.active === 0 && (
              <IconBtn
                icon={<PersonAddIcon />}
                color={theme.palette.primary.main}
                colorHover={theme.palette.primary.light}
                event={activateUser}
                type="button"
              />
            )}
            {selectorName === "blacklistedUsers" && (
              <IconBtn
                icon={<HowToRegIcon />}
                color={theme.palette.primary.main}
                colorHover={theme.palette.primary.light}
                event={unblockUser}
                type="button"
              />
            )}
            <IconBtn
              icon={<DeleteIcon />}
              color={theme.palette.error.dark}
              colorHover={theme.palette.error.main}
              event={deactivateUser}
              type="button"
            />
          </TableCell>
        </TableRow>
      </ThemeProvider>
    </>
  );
};

const useRowStyles = makeStyles((theme) => ({
  tableRowMain: {
    background: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
  },
  tableCellMainData: {
    fontSize: ".8rem",
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
  nameLink: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));

export default UserDataList;
