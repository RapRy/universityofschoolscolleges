import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../api'

export const publish_topic = createAsyncThunk(
    'topics/publish_topic',
    async (data) => {
        return data
    }
)

export const get_topics = createAsyncThunk(
    'topics/get_topics',
    async (topicId) => {
        const { data, status } = await api.getTopics(topicId)

        if(status === 200) return data
    }
)

export const get_topic_details = createAsyncThunk(
    'topics/get_topic_details',
    async (topicId) => {
        const { data, status } = await api.getTopic(topicId)

        if(status === 200) return data
    }
)

export const update_selected_topic_replies = createAsyncThunk(
    'topics/update_selected_topic_replies',
    async (data) => {
        return data
    }
)

export const topicsSlice = createSlice({
    name: "topics",
    initialState: {
        status: "idle",
        topics: [],
        selectedTopic: {
            topic: {},
            creator: {},
            category: {},
            replies: []
        },
        latestTopics: [],
        hotTopics: [],
        relatedTopics: []
    },
    reducers: {
        get_latest_topics: (state, action) => {
            state.latestTopics = action.payload
        },
        get_hot_topics: (state, action) => {
            state.hotTopics = action.payload
        },
        get_related_topics: (state, action) => {
            state.relatedTopics = action.payload
        }
    },
    extraReducers: {
        [get_topics.pending]: (state) => {
            state.status = "loading"
        },
        [get_topics.fulfilled]: (state, action) => {
            state.topics = action.payload
            state.status = "idle"
        },
        [get_topics.rejected]: (state) => {
            state.status = "failed"
        },
        [get_topic_details.pending]: (state) => {
            state.status = "loading"
        },
        [get_topic_details.fulfilled]: (state, action) => {
            state.selectedTopic = action.payload
            state.status = "idle"
        },
        [get_topic_details.rejected]: (state) => {
            state.status = "failed"
        },
        [update_selected_topic_replies.pending]: (state) => {
            state.status = "loading"
        },
        [update_selected_topic_replies.fulfilled]: (state, action) => {
            state.selectedTopic = { ...state.selectedTopic, ['replies']: [ ...state.selectedTopic.replies, action.payload ] }
            state.status = "idle"
        },
        [update_selected_topic_replies.rejected]: (state) => {
            state.status = "failed"
        },
        [publish_topic.pending]: (state) => {
            state.status = "loading"
        },
        [publish_topic.fulfilled]: (state, action) => {
            state.topics = [ ...state.topics, action.payload ]
            state.status = "idle"
        },
        [publish_topic.rejected]: (state) => {
            state.status = "failed"
        }
    }
})

export const { get_latest_topics, get_hot_topics, get_related_topics } = topicsSlice.actions

export default topicsSlice.reducer