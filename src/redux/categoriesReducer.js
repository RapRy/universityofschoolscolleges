import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState: {
        loading: true,
        categories: []
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
    }
})

export const { update_categories, add_category } = categoriesSlice.actions;

export default categoriesSlice.reducer;