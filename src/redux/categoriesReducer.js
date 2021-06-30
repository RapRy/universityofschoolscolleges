import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api'

export const update_categories = createAsyncThunk(
    'categories/update_categories',
    async () => {
        const { data, status } = await api.getCategories()

        if(status === 200) return data.categories
    }
)

export const set_selected = createAsyncThunk(
    'categories/set_selected',
    async (topicId) => {
        if(topicId === "topics"){
            return { name: "" }
        }

        const { data, status } = await api.getCategory(topicId)

        if(status === 200) return data.category
    }
)

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        status: "idle",
        categories: [],
        selectedCat: {}
    },
    reducers: {
        update_categories: (state, action) => {
            const { categories, loading } = action.payload
            state.categories = categories
            state.loading = loading
        },
        add_category: (state, action) => {
            state.categories = [ ...state.categories, action.payload ]
        }
    },
    extraReducers: {
        [update_categories.pending]: (state) => {
            state.status = "loading"
        },
        [update_categories.fulfilled]: (state, action) => {
            state.categories = action.payload
            state.status = "idle"
        },
        [update_categories.rejected]: (state) => {
            state.status = "failed"
        },
        [set_selected.pending]: (state) => {
            state.status = "loading"
        },
        [set_selected.fulfilled]: (state, action) => {
            state.selectedCat = action.payload
            state.status = "idle"
        },
        [set_selected.rejected]: (state) => {
            state.status = "failed"
        }
    }
})

export const { add_category } = categoriesSlice.actions;

export default categoriesSlice.reducer;