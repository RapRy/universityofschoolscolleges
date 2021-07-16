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

export const update_topic = createAsyncThunk(
    'topics/update_topic',
    async (data) => {
        return data
    }
)

export const update_active_status = createAsyncThunk(
    'topics/update_active_status',
    async (id, { getState }) => {
        const { status } = await api.updateTopicActiveStatus(id)

        if(status === 200){
            const { topics, selectedTopic } = getState().topics

            const updatedTopics = topics.map(top => top._id === id ? { ...top, 'active': 0 } : top)
            const updatedSelected = { ...selectedTopic.topic, 'active': 0 }

            return { updatedTopics, updatedSelected }
        }
    }
)

export const get_latest_topics_view_all = createAsyncThunk(
    'topics/get_latest_topics_view_all',
    async (limit) => {
        const { data, status } = await api.getLatestTopics(limit)

        if(status === 200) return data
    }
)

export const get_hot_topics_view_all = createAsyncThunk(
    'topics/get_latest_topics_view_all',
    async (limit) => {
        const { data, status } = await api.getHotTopics(limit)

        if(status === 200) return data
    }
)

export const get_related_topics_view_all = createAsyncThunk(
    'topics/get_related_topics_view_all',
    async (id) => {
        const { data, status } = await api.getRelatedTopics(id)

        if(status === 200) return data
    }
)

export const get_topics_by_user = createAsyncThunk(
    'topics/get_topics_by_user',
    async (id) => {
        const { data, status } = await api.getTopicsByUser(id)

        if(status === 200) return data
    }
)

export const search_topics = createAsyncThunk(
    'topics/search_topics',
    async (keyword) => {
        const { data, status } = await api.searchTopics(keyword)

        if(status === 200) return data
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
            state.selectedTopic = { ...state.selectedTopic, 'replies': [ ...state.selectedTopic.replies, action.payload ] }
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
        },
        [update_topic.pending]: (state) => {
            state.status = "loading"
        },
        [update_topic.fulfilled]: (state, action) => {
            const newTopics = state.topics.filter(top => top._id !== action.payload._id)
            state.topics = [ ...newTopics, action.payload ]
            state.status = "idle"
        },
        [update_topic.rejected]: (state) => {
            state.status = "failed"
        },
        [update_active_status.pending]: (state) => {
            state.status = 'loading'
        },
        [update_active_status.fulfilled]: (state, action) => {
            state.topics = action.payload.updatedTopics
            state.selectedTopic.topic = action.payload.updatedSelected
            state.status = "idle"
        },
        [update_active_status.rejected]: (state) => {
            state.status = "failed"
        },
        [get_latest_topics_view_all.pending]: (state) => {
            state.status = 'loading'
        },
        [get_latest_topics_view_all.fulfilled]: (state, action) => {
            state.topics = action.payload
            state.status = "idle"
        },
        [get_latest_topics_view_all.rejected]: (state) => {
            state.status = "failed"
        },
        [get_hot_topics_view_all.pending]: (state) => {
            state.status = 'loading'
        },
        [get_hot_topics_view_all.fulfilled]: (state, action) => {
            state.topics = action.payload
            state.status = "idle"
        },
        [get_hot_topics_view_all.rejected]: (state) => {
            state.status = "failed"
        },
        [get_related_topics_view_all.pending]: (state) => {
            state.status = 'loading'
        },
        [get_related_topics_view_all.fulfilled]: (state, action) => {
            state.topics = action.payload
            state.status = "idle"
        },
        [get_related_topics_view_all.rejected]: (state) => {
            state.status = "failed"
        },
        [get_topics_by_user.pending]: (state) => { state.status = "loading" },
        [get_topics_by_user.fulfilled]: (state, action) => {
            state.topics = action.payload
            state.status = "idle"
        },
        [get_topics_by_user.rejected]: (state) => { state.status = "failed" },
        [search_topics.pending]: (state) => { state.status = "loading" },
        [search_topics.fulfilled]: (state, action) => {
            state.topics = action.payload
            state.status = "idle"
        },
        [search_topics.rejected]: (state) => { state.status = "failed" }
    }
})

export const { get_latest_topics, get_hot_topics, get_related_topics } = topicsSlice.actions

export default topicsSlice.reducer