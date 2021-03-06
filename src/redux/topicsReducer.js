import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateVotes } from "./authReducer";
import axios from "axios";

import * as api from "../api";

export const publish_topic = createAsyncThunk(
  "topics/publish_topic",
  async (data) => {
    return data;
  }
);

export const get_topics = createAsyncThunk(
  "topics/get_topics",
  async (topicId) => {
    const { data, status } = await api.getTopics(topicId);

    if (status === 200) return data;
  }
);

export const get_topic_details = createAsyncThunk(
  "topics/get_topic_details",
  async (topicId) => {
    const { data, status } = await api.getTopic(topicId);

    if (status === 200) return data;
  }
);

export const update_a_topic_replies = createAsyncThunk(
  "topics/update_a_topic_replies",
  async (data, { getState }) => {
    const { topics } = getState().topics;

    const getOtherTopics = topics.filter((topic, i) => i !== data.topicInd);
    const selectedTopic = topics[data.topicInd];

    const updatedRepliesArr = [data.replyId, ...selectedTopic.meta.replies];
    const meta = { ...selectedTopic.meta, replies: updatedRepliesArr };
    const updatedTopic = { ...selectedTopic, meta: meta };
    // insert at assign index the updated topic
    getOtherTopics.splice(data.topicInd, 0, updatedTopic);

    return getOtherTopics;
  }
);

export const update_selected_topic_replies = createAsyncThunk(
  "topics/update_selected_topic_replies",
  async (data) => {
    return data;
  }
);

export const update_topic = createAsyncThunk(
  "topics/update_topic",
  async (data, { getState }) => {
    const { topics, selectedTopic } = getState().topics;
    if (data.isFromProfile) {
      const otherTopics = topics.filter((top) => top._id !== data.data._id);
      // insert updated topic back to its index inside the array
      otherTopics.splice(data.topicInd, 0, data.data);

      return { updatedTopics: otherTopics, isFromProfile: data.isFromProfile };
    }

    if (!data.isFromProfile) {
      const updatedSelectedTopic = { ...selectedTopic, topic: data.data };
      return { updatedSelectedTopic, isFromProfile: data.isFromProfile };
    }
  }
);

export const update_active_status = createAsyncThunk(
  "topics/update_active_status",
  async (id, { getState }) => {
    const { status } = await api.updateTopicActiveStatus(id);

    if (status === 200) {
      const { topics, selectedTopic } = getState().topics;

      const updatedTopics = topics.map((top) =>
        top._id === id ? { ...top, active: 0 } : top
      );
      const updatedSelected = { ...selectedTopic.topic, active: 0 };

      return { updatedTopics, updatedSelected };
    }
  }
);

export const update_topic_votes = createAsyncThunk(
  "topics/update_topic_votes",
  async (formData, { getState, dispatch }) => {
    const auth = getState().auth;
    const selectedTopic = getState().topics.selectedTopic;
    const { meta } = selectedTopic.topic;

    let upvotes = [];
    let downvotes = [];

    const profile = auth.profile;

    if (formData.type === "upvote") {
      downvotes = meta.downvotes.filter((id) => id !== formData.userId);
      upvotes = [...meta.upvotes, formData.userId];

      const profileDownVotes = profile.result.post.downvotes.filter(
        (id) => id !== formData.topicId
      );
      const profileUpVotes = [...profile.result.post.upvotes, formData.topicId];

      const updatedPost = {
        ...profile.result.post,
        upvotes: profileUpVotes,
        downvotes: profileDownVotes,
      };

      const updatedResult = { ...profile.result, post: updatedPost };

      const updatedProfile = { ...profile, result: updatedResult };

      dispatch(updateVotes(updatedProfile));
    } else if (formData.type === "downvote") {
      upvotes = meta.upvotes.filter((id) => id !== formData.userId);
      downvotes = [...meta.downvotes, formData.userId];

      const profileUpVotes = profile.result.post.upvotes.filter(
        (id) => id !== formData.topicId
      );
      const profileDownVotes = [
        ...profile.result.post.downvotes,
        formData.topicId,
      ];

      const updatedPost = {
        ...profile.result.post,
        upvotes: profileUpVotes,
        downvotes: profileDownVotes,
      };

      const updatedResult = { ...profile.result, post: updatedPost };

      const updatedProfile = { ...profile, result: updatedResult };

      dispatch(updateVotes(updatedProfile));
    }

    return { upvotes, downvotes };
  }
);

export const get_latest_topics_view_all = createAsyncThunk(
  "topics/get_latest_topics_view_all",
  async (formData) => {
    const { data, status } = await api.getLatestTopics(
      formData.limit,
      formData.source
    );

    if (status === 200) return data;
  }
);

export const get_hot_topics_view_all = createAsyncThunk(
  "topics/get_latest_topics_view_all",
  async (formData) => {
    const { data, status } = await api.getHotTopics(
      formData.limit,
      formData.source
    );

    if (status === 200) return data;
  }
);

export const get_related_topics_view_all = createAsyncThunk(
  "topics/get_related_topics_view_all",
  async (formData) => {
    const { data, status } = await api.getRelatedTopics(
      formData.id,
      formData.source
    );

    if (status === 200) return data;
  }
);

export const get_topics_by_user = createAsyncThunk(
  "topics/get_topics_by_user",
  async (id, { signal, rejectWithValue }) => {
    try {
      const source = axios.CancelToken.source();
      signal.addEventListener("abort", () => {
        source.cancel();
      });
      const { data, status } = await api.getTopicsByUser(id, source);

      if (status === 200) return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ message: data.message, status });
    }
  }
);

export const search_topics = createAsyncThunk(
  "topics/search_topics",
  async (keyword) => {
    const { data, status } = await api.searchTopics(keyword);

    if (status === 200) return data;
  }
);

export const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    insertReplyStatus: "idle",
    voteStatus: "idle",
    status: "idle",
    topics: [],
    selectedTopic: {
      topic: {},
      creator: {},
      category: {},
      replies: [],
      test: {},
    },
    latestTopics: [],
    hotTopics: [],
    relatedTopics: [],
  },
  reducers: {
    get_latest_topics: (state, action) => {
      state.latestTopics = action.payload;
    },
    get_hot_topics: (state, action) => {
      state.hotTopics = action.payload;
    },
    get_related_topics: (state, action) => {
      state.relatedTopics = action.payload;
    },
  },
  extraReducers: {
    [get_topics.pending]: (state) => {
      state.status = "loading";
    },
    [get_topics.fulfilled]: (state, action) => {
      state.topics = action.payload;
      state.status = "idle";
    },
    [get_topics.rejected]: (state) => {
      state.status = "failed";
    },
    [get_topic_details.pending]: (state) => {
      state.status = "loading";
    },
    [get_topic_details.fulfilled]: (state, action) => {
      state.selectedTopic = action.payload;
      state.status = "idle";
    },
    [get_topic_details.rejected]: (state) => {
      state.status = "failed";
    },
    [update_a_topic_replies.pending]: (state) => {
      state.insertReplyStatus = "loading";
    },
    [update_a_topic_replies.fulfilled]: (state, action) => {
      state.insertReplyStatus = "idle";
      state.topics = action.payload;
    },
    [update_a_topic_replies.rejected]: (state, action) => {
      state.insertReplyStatus = "failed";
    },
    [update_selected_topic_replies.pending]: (state) => {
      state.insertReplyStatus = "loading";
    },
    [update_selected_topic_replies.fulfilled]: (state, action) => {
      state.selectedTopic = {
        ...state.selectedTopic,
        replies: [action.payload, ...state.selectedTopic.replies],
      };
      state.insertReplyStatus = "idle";
    },
    [update_selected_topic_replies.rejected]: (state) => {
      state.insertReplyStatus = "failed";
    },
    [publish_topic.pending]: (state) => {
      state.status = "loading";
    },
    [publish_topic.fulfilled]: (state, action) => {
      state.topics = [...state.topics, action.payload];
      state.status = "idle";
    },
    [publish_topic.rejected]: (state) => {
      state.status = "failed";
    },
    [update_topic.pending]: (state) => {
      state.status = "loading";
    },
    [update_topic.fulfilled]: (state, action) => {
      const { isFromProfile } = action.payload;

      if (isFromProfile) {
        state.topics = action.payload.updatedTopics;
      }

      if (!isFromProfile) {
        state.selectedTopic = action.payload.updatedSelectedTopic;
      }

      state.status = "idle";
    },
    [update_topic.rejected]: (state) => {
      state.status = "failed";
    },
    [update_active_status.pending]: (state) => {
      state.status = "loading";
    },
    [update_active_status.fulfilled]: (state, action) => {
      state.topics = action.payload.updatedTopics;
      state.selectedTopic.topic = action.payload.updatedSelected;
      state.status = "idle";
    },
    [update_active_status.rejected]: (state) => {
      state.status = "failed";
    },
    [get_latest_topics_view_all.pending]: (state) => {
      state.status = "loading";
    },
    [get_latest_topics_view_all.fulfilled]: (state, action) => {
      state.topics = action.payload;
      state.status = "idle";
    },
    [get_latest_topics_view_all.rejected]: (state) => {
      state.status = "failed";
    },
    [get_hot_topics_view_all.pending]: (state) => {
      state.status = "loading";
    },
    [get_hot_topics_view_all.fulfilled]: (state, action) => {
      state.topics = action.payload;
      state.status = "idle";
    },
    [get_hot_topics_view_all.rejected]: (state) => {
      state.status = "failed";
    },
    [get_related_topics_view_all.pending]: (state) => {
      state.status = "loading";
    },
    [get_related_topics_view_all.fulfilled]: (state, action) => {
      state.topics = action.payload;
      state.status = "idle";
    },
    [get_related_topics_view_all.rejected]: (state) => {
      state.status = "failed";
    },
    [get_topics_by_user.pending]: (state) => {
      state.status = "loading";
    },
    [get_topics_by_user.fulfilled]: (state, action) => {
      state.topics = action.payload;
      state.status = "idle";
    },
    [get_topics_by_user.rejected]: (state) => {
      state.status = "failed";
    },
    [search_topics.pending]: (state) => {
      state.status = "loading";
    },
    [search_topics.fulfilled]: (state, action) => {
      state.topics = action.payload;
      state.status = "idle";
    },
    [search_topics.rejected]: (state) => {
      state.status = "failed";
    },
    [update_topic_votes.pending]: (state) => {
      state.voteStatus = "idle";
    },
    [update_topic_votes.fulfilled]: (state, action) => {
      state.selectedTopic.topic.meta.upvotes = action.payload.upvotes;
      state.selectedTopic.topic.meta.downvotes = action.payload.downvotes;
      state.voteStatus = "idle";
    },
    [update_topic_votes.rejected]: (state) => {
      state.voteStatus = "failed";
    },
  },
});

export const { get_latest_topics, get_hot_topics, get_related_topics } =
  topicsSlice.actions;

export default topicsSlice.reducer;
