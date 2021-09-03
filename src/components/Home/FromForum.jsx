import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import MainHeader from "../Globals/MainHeader";
import TopicWithThumbnail from "../Globals/Topics/TopicWithThumbnail";
import Post from "../Globals/Posts/Post";
import { withAuthor, withParticipants } from "../HOC";
import * as api from "../../api";

const PostWithParticipants = withParticipants(Post);
const PostWithAuthor = withAuthor(PostWithParticipants);
const FromForum = () => {
  const classes = useStyles();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted === true) {
      try {
        const fetchTopics = async () => {
          const { data, status } = await api.getTopicsWithLimit(0);

          if (status === 200) {
            setTopics(data);
          }
        };

        fetchTopics();
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={classes.bg}>
      <Container>
        <MainHeader heading="from the forum" cta="view all" />
        <Grid container direction="row" spacing={4}>
          {topics &&
            topics.map((topic) => (
              <Grid item xs={12} md={6} key={topic._id}>
                {/* <TopicWithThumbnail topic={topic} from="home" /> */}
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
    padding: `${theme.spacing(10)}px 0px ${theme.spacing(13)}px`,
  },
}));

export default FromForum;
