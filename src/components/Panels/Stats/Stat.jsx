import React, { useEffect } from "react";
import { makeStyles, Typography, ThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { update_count } from "../../../redux/statsReducer";
import { poppinsFont } from "../../../theme/themes";

const Stat = ({ header, icon, apiReq, index, colorType, allUsersCount }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stats);
  const classes = useStyles({ colorType });

  useEffect(() => {
    const source = axios.CancelToken.source();
    apiReq(source)
      .then((res) => {
        dispatch(update_count({ count: res.data.count, index }));
      })
      .catch((err) => {
        if (err.response.status === 500) {
          console.log(`${header}: Please refresh page!`);
          return;
        }
      });

    return () => source.cancel();
  }, [dispatch, index, apiReq]);

  return (
    <div className={classes.container}>
      {icon}
      <ThemeProvider theme={poppinsFont}>
        <Typography variant="h1" className={classes.count}>
          {state[index]}
          {allUsersCount !== undefined ? (
            <span className={classes.countSpan}>{` / ${allUsersCount}`}</span>
          ) : (
            ""
          )}
        </Typography>
        <Typography variant="body1" className={classes.header}>
          {header}
        </Typography>
      </ThemeProvider>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    margin: theme.spacing(0, 2, 2, 0),
    display: "inline-block",
    background: (props) =>
      props.colorType === "primary"
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },
  count: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "2.2rem",
    display: "inline-block",
    textAlign: "right",
    paddingLeft: theme.spacing(2),
    color: (props) =>
      props.colorType === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
  countSpan: {
    fontSize: "1.6rem",
    color: theme.palette.common.black,
    display: "inline-block",
    marginLeft: theme.spacing(1),
  },
  header: {
    textAlign: "left",
    fontSize: ".9rem",
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: "uppercase",
  },
}));

export default Stat;
