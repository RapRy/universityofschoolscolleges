import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        loading: false,
        errors: [],
        profile: {}
    },
    reducers: {
        sign_in: (state, action) => {
            state.profile = { ...action.payload }
        },
        sign_up: (state, action) => {
            state.profile = { ...action.payload }
        },
        toggle_loading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { sign_in, sign_up, toggle_loading } = authSlice.actions

export default authSlice.reducer