import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Divider,
  LinearProgress,
  Collapse,
  useMediaQuery,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useSnackbar } from "notistack";
import moment from "moment";
import { Edit, Delete } from "@material-ui/icons";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

import { get_topic_details } from "../../../redux/topicsReducer";
import AddReply from "../../Globals/Forms/AddReply";
import Reply from "./Reply";
import * as api from "../../../api";
import AddTopicForm from "../../Globals/Forms/AddTopicForm";
import DeleteDialog from "../../Globals/DeleteDialog";
import {
  update_active_status,
  update_topic_votes,
} from "../../../redux/topicsReducer";
import { poppinsFont, ubuntuFont } from "../../../theme/themes";
import { IconTextBtn, VotesBtn } from "../../Globals/Buttons";
import StatCounter from "./Stats/StatCounter";

const Topic = () => {
  let profileLS = null || JSON.parse(localStorage.getItem("profile")).result;

  const max600 = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const classes = useStyles();

  const { params, url } = useRouteMatch();
  const history = useHistory();

  const [edit, setEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [votes, setVotes] = useState({ up: false, down: false });

  const dispatch = useDispatch();
  const { selectedTopic, status } = useSelector((state) => state.topics);
  const { profile } = useSelector((state) => state.auth);

  const { enqueueSnackbar } = useSnackbar();

  const expandReplies = () => setShowReplies((prevState) => !prevState);

  const handleDelete = () => setOpenDelete(true);

  const handleCloseDialog = () => setOpenDelete(false);

  const handleConfirmDelete = () => {
    dispatch(update_active_status(selectedTopic.topic._id));
    enqueueSnackbar(`${selectedTopic.topic.title} deleted`, {
      variant: "success",
    });
    setOpenDelete(false);
    history.push(`/forum/${selectedTopic.topic.ref.category}`);
  };

  const handleEdit = () => setEdit(true);

  const handleUpVote = () => {
    const formData = {
      topicId: selectedTopic.topic?._id,
      userId: profile.result?._id,
      type: "upvote",
    };

    api
      .voteTopic(formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(update_topic_votes(formData));
          setVotes({ up: true, down: false });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDownVote = () => {
    const formData = {
      topicId: selectedTopic.topic?._id,
      userId: profile.result?._id,
      type: "downvote",
    };

    api
      .voteTopic(formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(update_topic_votes(formData));
          setVotes({ up: false, down: true });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (profile.result === null || profileLS === null) {
      history.push("/auth");
      return;
    }

    // profileLS = JSON.parse(localStorage.getItem('profile')).result

    dispatch(get_topic_details(params.topicId))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const { description, meta } = res.payload.topic;
          setVotes({
            up: meta.upvotes.includes(profileLS._id),
            down: meta.downvotes.includes(profileLS._id),
          });

          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(description))
            )
          );
        }
      })
      .catch((err) => console.log(err));

    try {
      const data = {
        topicId: params.topicId,
        viewer: profile.result?._id || profileLS._id,
      };
      api.addTopicViews(data);
    } catch (error) {
      console.log(error);
    }
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      {status === "loading" && <LinearProgress style={{ margin: "30px 0" }} />}

      {openDelete && (
        <DeleteDialog
          status={openDelete}
          message={`Click confirm to delete ${selectedTopic.topic.title}`}
          handleDelete={handleConfirmDelete}
          handleCancel={handleCloseDialog}
        />
      )}

      {status === "idle" && (
        <>
          <div className={classes.titleContainer}>
            {(profileLS?._id === selectedTopic.topic?.ref?.creator ||
              profile.result?._id === selectedTopic.topic?.ref?.creator) && (
              <div className={classes.ctaContainer}>
                <IconTextBtn
                  icon={<Edit style={{ fontSize: "1.1rem" }} />}
                  text="edit post"
                  color="secondary"
                  size=".8rem"
                  isLowercase={true}
                  event={handleEdit}
                />
                <IconTextBtn
                  icon={<Delete style={{ fontSize: "1.1rem" }} />}
                  text="delete post"
                  color="secondary"
                  size=".8rem"
                  isLowercase={true}
                  event={handleDelete}
                />
              </div>
            )}

            <ThemeProvider theme={ubuntuFont}>
              <Typography variant="h3" className={classes.title}>
                {selectedTopic.topic?.title}
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={poppinsFont}>
              <Typography variant="body1" className={classes.updatesDetails}>
                Asked by{" "}
                {
                  <Link
                    to={`/forum/profile/${selectedTopic.creator?._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <span className={classes.span}>
                      {selectedTopic.creator?.username}
                    </span>
                  </Link>
                }{" "}
                on{" "}
                {moment(selectedTopic.topic.createdAt).format("MMMM D, YYYY")}{" "}
                in{" "}
                {
                  <Link
                    to={`/forum/${selectedTopic.category?._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <span className={classes.span}>
                      {selectedTopic.category?.name}
                    </span>
                  </Link>
                }
              </Typography>
            </ThemeProvider>
            {/* stats */}
            <div>
              <StatCounter
                count={selectedTopic.topic?.meta?.replies.length}
                label="comments"
                color="secondary"
                isAuthor={false}
              />
              <StatCounter
                count={selectedTopic.topic?.meta?.views.length}
                label="views"
                color="secondary"
                isAuthor={false}
              />
              <StatCounter
                count={0}
                label=""
                color="primary"
                isAuthor={true}
                author={selectedTopic.creator}
              />
            </div>
            {/* votes */}
            <div>
              <VotesBtn isVoted={votes.up} icon="up" event={handleUpVote} />
              <VotesBtn
                isVoted={votes.down}
                icon="down"
                event={handleDownVote}
              />
            </div>
          </div>

          {edit && <AddTopicForm action="edit" />}

          <Divider className={classes.divider} />

          <div className={classes.descContainer}>
            <Editor editorState={editorState} toolbarHidden />
          </div>

          <div>
            <Typography
              onClick={expandReplies}
              variant="h5"
              className={classes.repliesCount}
            >
              {selectedTopic.replies?.length > 1
                ? `${selectedTopic.replies?.length} Replies`
                : `${selectedTopic.replies?.length} Reply`}{" "}
              {showReplies ? (
                <ExpandLessIcon className={classes.arrow} />
              ) : (
                <ExpandMoreIcon className={classes.arrow} />
              )}
            </Typography>

            <Divider />

            <div>
              <Collapse in={showReplies}>
                {selectedTopic.replies &&
                  selectedTopic.replies.map((reply) => (
                    <Reply reply={reply} key={reply._id} />
                  ))}
              </Collapse>
            </div>

            <AddReply
              categoryId={selectedTopic.topic?.ref?.category}
              topicId={selectedTopic.topic?._id}
            />
          </div>
        </>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginTop: 0,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(5),
    },
  },
  title: {
    fontSize: "1.1rem",
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
  },
  updatesDetails: {
    fontSize: ".7rem",
    color: theme.palette.common.black,
  },
  span: {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
  ctaContainer: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
  descContainer: {
    margin: `${theme.spacing(3)}px 0`,
  },
  description: {
    fontSize: ".8rem",
    color: theme.palette.secondary.dark,
    lineHeight: "1.5rem",
    wordWrap: "break-word",
  },
  repliesCount: {
    fontSize: ".85rem",
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.dark,
    cursor: "pointer",
  },
  arrow: {
    verticalAlign: "middle",
    float: "right",
  },
}));

export default Topic;
