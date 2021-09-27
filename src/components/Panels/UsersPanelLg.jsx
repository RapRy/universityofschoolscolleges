import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import axios from "axios";

import UserThumbnailPanel from "../Forum/Users/UserThumbnailPanel";
import { HeaderWithCta } from "../Globals/Headers";
import { IconTextBtn } from "../Globals/Buttons";

const UsersPanelLg = ({ header, API, reduxDispatch, selectorName }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const classes = useStyles();

  const { url } = useRouteMatch();

  useEffect(() => {
    const source = axios.CancelToken.source();
    API(6, source)
      .then((res) => {
        if (res.status === 200) {
          dispatch(reduxDispatch(res.data));
        }
      })
      .catch((err) => console.log(err));

    return () => source.cancel("request cancelled");
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className={classes.container}>
      <HeaderWithCta
        title={header}
        ctaButton={
          <Link
            to={`${url}/${header.replace(" ", "-")}`}
            style={{ textDecoration: "none" }}
          >
            <IconTextBtn
              icon={<DynamicFeedIcon style={{ fontSize: "1.1rem" }} />}
              text="show more"
              color="primary"
              size=".8rem"
              isLowercase={true}
              event={null}
            />
          </Link>
        }
      />
      <Grid container direction="row" spacing={4}>
        {users[selectorName] &&
          users[selectorName].map((user) => (
            <Grid item xs={6} sm={4} md={3} key={user._id}>
              <UserThumbnailPanel user={user} type={selectorName} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(5),
  },
}));

export default UsersPanelLg;
