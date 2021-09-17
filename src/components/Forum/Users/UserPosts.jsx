import React, { useEffect } from "react";
import { Container, LinearProgress, Box, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { get_topics_by_user } from "../../../redux/topicsReducer";
import Empty from "../../Globals/Empty/Empty";
import Topic from "../Topics/Topic";
import { withCategory, withAuthor } from "../../HOC";
import { get_categories } from "../../../redux/categoriesReducer";

// const PostWithCategory = withCategory(Post);
// const PostWithAuthor = withAuthor(PostWithCategory);

const PostWithCategory = withCategory(Topic);
const PostWithAuthor = withAuthor(PostWithCategory);

const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { topics, status } = useSelector((state) => state.topics);

  useEffect(() => {
    const promiseTopics = dispatch(get_topics_by_user(userId));
    const promiseCategories = dispatch(get_categories());

    return () => {
      promiseCategories.abort();
      promiseTopics.abort();
    };
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      {status === "loading" && <LinearProgress style={{ margin: "30px 0" }} />}

      {status === "idle" && topics.length === 0 && (
        <Empty message="No post created" />
      )}

      {topics.map((topic, i) => (
        <div key={topic._id}>
          {i !== 0 && <Divider style={{ marginTop: "40px" }} />}
          <Box marginTop="40px">
            <PostWithAuthor topic={topic} topicInd={i} isFromProfile={true} />
          </Box>
        </div>
      ))}
    </Container>
  );
};

export default UserPosts;
