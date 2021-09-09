import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const get_categories = createAsyncThunk(
  "categories/get_categories",
  async (thunkAPI) => {
    try {
      const { data, status } = await api.getCategories();

      if (status === 200) return data.categories;
    } catch (error) {
      console.log(error);
      const { data, status } = error.response;
      return thunkAPI.rejectWithValue({ message: data.message, status });
    }
  }
);

export const set_selected = createAsyncThunk(
  "categories/set_selected",
  async (topicId) => {
    if (topicId === "topics") {
      return { name: "" };
    }

    const { data, status } = await api.getCategory(topicId);

    if (status === 200) return data.category;
  }
);

export const update_active_status = createAsyncThunk(
  "categories/update_active_status",
  async (id, { getState }) => {
    const { status } = await api.updateActiveStatus(id);

    if (status === 200) {
      const { categories } = getState().categories;

      const updatedCategories = categories.map((cat) =>
        cat._id === id ? { ...cat, active: 0 } : cat
      );

      return updatedCategories;
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    error: {},
    status: "idle",
    categories: [],
    selectedCat: {},
  },
  reducers: {
    update_categories: (state, action) => {
      const { categories, loading } = action.payload;
      state.categories = categories;
      state.loading = loading;
    },
    add_category: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
  },
  extraReducers: {
    [get_categories.pending]: (state) => {
      state.status = "loading";
    },
    [get_categories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.status = "idle";
    },
    [get_categories.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [set_selected.pending]: (state) => {
      state.status = "loading";
    },
    [set_selected.fulfilled]: (state, action) => {
      state.selectedCat = action.payload;
      state.status = "idle";
    },
    [set_selected.rejected]: (state) => {
      state.status = "failed";
    },
    [update_active_status.pending]: (state) => {
      state.status = "loading";
    },
    [update_active_status.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.status = "idle";
    },
    [update_active_status.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { add_category } = categoriesSlice.actions;

export default categoriesSlice.reducer;
