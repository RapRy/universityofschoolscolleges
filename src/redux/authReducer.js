import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../api'

export const sign_up = createAsyncThunk(
    'auth/sign_up',
    async (formData) => {
        let { data, status } = await api.signUp(formData);

        if(status === 200){
            localStorage.setItem('profile', JSON.stringify({ ...data }));

            return data;
        }
    }
)

export const sign_in = createAsyncThunk(
    'auth/sign_in',
    async ({ formData, history }) => {
        let { data, status } = await api.signIn(formData);

        if(status === 200){
            localStorage.setItem('profile', JSON.stringify({ ...data }));

            history.push('/forum')
            return data;
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (history, thunkAPI) => {
        localStorage.removeItem('profile')

        history.push('/')
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "idle",
        error: {},
        profile: {}
    },
    reducers: {
        sign_in_LS: (state, action) => {
            state.profile = { ...action.payload }
        }
    },
    extraReducers: {
        [sign_up.pending]: (state) => {
            state.status = "loading"
        },
        [sign_up.fulfilled]: (state, action) => {
            state.profile = { ...action.payload }
            state.status = "idle"
        },
        [sign_up.rejected]: (state) => {
            state.status = "failed"
        },
        [sign_in.pending]: (state) => {
            state.status = "loading"
            state.error = {}
        },
        [sign_in.fulfilled]: (state, action) => {
            state.profile = { ...action.payload }
            state.status = "idle"
        },
        [sign_in.rejected]: (state) => {
            state.status = "failed"
            state.error = { login: "Invalid Credentials" }
        },
        [logout.pending]: (state) => {
            state.status = "loading"
        },
        [logout.fulfilled]: (state) => {
            state.error = {}
            state.profile = {}
            state.status = "idle"
        },
        [logout.rejected]: (state) => {
            state.status = "failed"
        }
    }
})

export const { sign_in_LS } = authSlice.actions

export default authSlice.reducer