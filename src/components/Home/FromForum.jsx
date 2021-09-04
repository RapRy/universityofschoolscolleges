import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";

import MainHeader from "../Globals/MainHeader";
import Post from "../Globals/Posts/Post";
import { withAuthor, withParticipants, withCategory } from "../HOC";
import * as api from "../../api";

const PostWithParticipants = withParticipants(Post);
const PostWithCategory = withCategory(PostWithParticipants);
const PostWithAuthor = withAuthor(PostWithCategory);
const FromForum = () => {
  const classes = useStyles();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    api
      .getTopicsWithLimit(12, source)
      .then((res) => {
        if (res.status === 200) setTopics(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(err.message);
          return;
        }
        console.log(err);
      });

    return () => {
      source.cancel("Request Cancelled");
    };
  }, []);

  return (
    <div className={classes.bg}>
      <Container>
        <MainHeader heading="from the forum" cta="view all" />
        <Grid container direction="row" spacing={4}>
          {topics &&
            topics.map((topic) => (
              <Grid item xs={12} md={6} lg={4} key={topic._id}>
                <PostWithAuthor topic={topic} fromHome={true} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  bg: {
    background: theme.palette.primary.contrastText,
    padding: theme.spacing(30, 0),
  },
}));

export default FromForum;
