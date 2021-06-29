import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../api'

export const publish_topic = createAsyncThunk(
    'topics/publish_topic',
    async () => {
        console.log('this is dummy')
    }
)

export const topicsSlice = createSlice({
    name: "topics",
    initialState: {
        status: "idle",
        topics: [],
    },
})

export default topicsSlice.reducer