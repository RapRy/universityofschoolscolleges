import React, { useEffect, useState } from "react";
import { Container, LinearProgress, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import _ from "lodash";
import axios from "axios";

import AddTopicForm from "../../Globals/Forms/AddTopicForm";
import { set_selected } from "../../../redux/categoriesReducer";
import {
  get_topics,
  get_latest_topics_view_all,
  get_hot_topics_view_all,
  get_related_topics_view_all,
} from "../../../redux/topicsReducer";
import Empty from "../../Globals/Empty/Empty";
import { HeaderWithCta } from "../../Globals/Headers";
import { IconTextBtn } from "../../Globals/Buttons";
import Post from "../../Globals/Posts/Post";
import {
  withParticipants,
  withCategory,
  withAuthor,
  withLastCommentor,
} from "../../HOC";

const PostWithParticipants = withParticipants(Post);
const PostWithCategory = withCategory(PostWithParticipants);
const PostWithLastCommentor = withLastCommentor(PostWithCategory);
const PostWithAuthor = withAuthor(PostWithLastCommentor);

const Topics = () => {
  const { category } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [displayCat, setDisplayCat] = useState("");

  const match = useRouteMatch("/forum/:topic");
  const history = useHistory();

  const { selectedCat } = useSelector((state) => state.categories);
  const { topics, status, selectedTopic } = useSelector(
    (state) => state.topics
  );
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let userFromLocal = null || JSON.parse(localStorage.getItem("profile"));

  const toggleShow = () => setShowForm((prevState) => !prevState);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (
      profile?.result === null ||
      userFromLocal?.result === null ||
      selectedCat?.active === 0
    ) {
      history.push("/");
      return;
    }

    // userFromLocal = JSON.parse(localStorage.getItem('profile'))

    setDisplayCat("");

    switch (category) {
      case "latest-topics":
        dispatch(get_latest_topics_view_all({ limit: 20, source }));
        setDisplayCat(category.replace("-", " "));
        dispatch(set_selected("topics"));
        break;
      case "hot-topics":
        dispatch(get_hot_topics_view_all({ limit: 20, source }));
        setDisplayCat(category.replace("-", " "));
        dispatch(set_selected("topics"));
        break;
      case "related-topics":
        if (_.isEmpty(selectedTopic.topic)) {
          history.push("/forum/topics");
          break;
        }

        dispatch(
          get_related_topics_view_all({ id: selectedTopic.topic?._id, source })
        );
        setDisplayCat(category.replace("-", " "));
        dispatch(set_selected("topics"));
        break;
      case "topics":
        dispatch(get_topics(category));
        dispatch(set_selected(category));
        setDisplayCat("all");
        break;
      default:
        dispatch(set_selected(category));
        dispatch(get_topics(category));
        break;
    }

    if (
      profile?.result?.accountType === 1 ||
      userFromLocal?.result?.accountType === 1
    )
      setShowForm(true);

    return () => source.cancel("request cancelled");
  }, [match.url]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "loading") {
    return <LinearProgress style={{ margin: "30px 0" }} />;
  }

  return (
    <Container>
      <HeaderWithCta
        title={`Topics / ${displayCat !== "" ? displayCat : selectedCat.name}`}
        ctaButton={
          <IconTextBtn
            icon={<NoteAddIcon style={{ fontSize: "1.1rem" }} />}
            text="write a post"
            color="secondary"
            size=".8rem"
            isLowercase={true}
            event={toggleShow}
          />
        }
      />
      {showForm === true && (
        <AddTopicForm
          action="add"
          isFromProfile={false}
          topic={undefined}
          category={undefined}
          topicInd={null}
        />
      )}

      <div>
        {status === "idle" && topics.length === 0 && (
          <Empty message="No Topics" />
        )}
        <Grid container spacing={4} direction="row">
          {topics.map((topic) => (
            <Grid item xs={12} md={6} key={topic._id}>
              <PostWithAuthor topic={topic} fromHome={false} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Topics;
