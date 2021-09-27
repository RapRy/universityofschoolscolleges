import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import axios from "axios";

import Post from "../Globals/Posts/Post";
import {
  withParticipants,
  withCategory,
  withAuthor,
  withLastCommentor,
} from "../HOC";
import { HeaderWithCta } from "../Globals/Headers";
import { IconTextBtn } from "../Globals/Buttons";

const PostWithParticipants = withParticipants(Post);
const PostWithCategory = withCategory(PostWithParticipants);
const PostWithLastCommentor = withLastCommentor(PostWithCategory);
const PostWithAuthor = withAuthor(PostWithLastCommentor);

const TopicsPanelLg = ({ header, API, reduxDispatch, selectorName }) => {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.topics);

  const classes = useStyles();

  const { url } = useRouteMatch();

  useEffect(() => {
    const source = axios.CancelToken.source();

    API(10, source)
      .then((res) => {
        if (res.status === 200) {
          dispatch(reduxDispatch(res.data));
        }
      })
      .catch((err) => console.log(err));

    return () => source.cancel("request cancelled");
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className={classes.mainContainer}>
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
              color="secondary"
              size=".8rem"
              isLowercase={true}
              event={null}
            />
          </Link>
        }
      />
      <Grid container direction="row" spacing={2}>
        {topics[selectorName].map((top) => (
          <Grid item xs={12} md={6} key={top._id}>
            <PostWithAuthor topic={top} fromHome={false} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginBottom: theme.spacing(5),
  },
}));

export default TopicsPanelLg;
