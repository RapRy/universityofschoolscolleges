import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../api'

export const active_users_list = createAsyncThunk(
    'users/active_users_list',
    async (limit) => {
        const { data, status } = await api.getActiveUsers(limit)

        if(status === 200) return data   
    }
)

export const registered_users_list = createAsyncThunk(
    'users/registered_suers_list',
    async () => {
        const { data, status } = await api.getRegisteredUsers()

        if(status === 200) return data
    }
)

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        status: "idle",
        newUsers: [],
        registeredUsers: [],
        blacklistedUsers: [],
        activeUsers: []
    },
    reducers: {
        new_users_panel: (state, action) => {
            state.newUsers = action.payload
        },
        active_users_panel: (state, action) => {
            state.activeUsers = action.payload
        }
    },
    extraReducers: {
        [active_users_list.pending]: (state) => { state.status = "loading" },
        [active_users_list.fulfilled]: (state, action) => {
            state.activeUsers = action.payload
            state.status = "idle"
        },
        [active_users_list.rejected]: (state) => { state.status = "failed" },
        [registered_users_list.pending]: (state) => { state.status = "loading" },
        [registered_users_list.fulfilled]: (state, action) => {
            state.registeredUsers = action.payload
            state.status = "idle"
        },
        [registered_users_list.rejected]: (state) => { state.status = "failed" }
    }
})

export const { new_users_panel, active_users_panel } = usersSlice.actions

export default usersSlice.reducer