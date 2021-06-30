import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../api'

export const publish_topic = createAsyncThunk(
    'topics/publish_topic',
    async () => {
        console.log('this is dummy')
    }
)

export const get_topics = createAsyncThunk(
    'topics/get_topics',
    async (topicId) => {
        const { data, status } = await api.getTopics(topicId)

        if(status === 200) return data
    }
)

export const topicsSlice = createSlice({
    name: "topics",
    initialState: {
        status: "idle",
        topics: [],
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
        }
    }
})

export default topicsSlice.reducer