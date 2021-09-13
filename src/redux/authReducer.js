import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const sign_up = createAsyncThunk(
  "auth/sign_up",
  async (formData, { rejectWithValue }) => {
    try {
      const { data, status } = await api.signUp(formData);

      if (status === 200) {
        return data;
      }
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ message: data.message, status });
    }
  }
);

export const sign_in = createAsyncThunk(
  "auth/sign_in",
  async (props, { rejectWithValue }) => {
    try {
      let { data, status } = await api.signIn(props.formData);

      if (status === 200) {
        localStorage.setItem("profile", JSON.stringify({ ...data }));
        props.history.push("/forum");
        return data;
      }
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ message: data.message, status });
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (history) => {
  localStorage.removeItem("profile");

  history.push("/");
});

export const update_profile = createAsyncThunk(
  "auth/update_profile",
  async (data) => {
    localStorage.setItem("profile", JSON.stringify({ ...data }));
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    error: {},
    profile: {},
  },
  reducers: {
    sign_in_LS: (state, action) => {
      state.profile = { ...action.payload };
    },
    updateVotes: (state, action) => {
      state.profile = { ...action.payload };
    },
  },
  extraReducers: {
    [sign_up.pending]: (state) => {
      state.status = "loading";
      state.error = {};
    },
    [sign_up.fulfilled]: (state) => {
      state.status = "idle";
    },
    [sign_up.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [sign_in.pending]: (state) => {
      state.status = "loading";
      state.error = {};
    },
    [sign_in.fulfilled]: (state, action) => {
      state.profile = { ...action.payload };
      state.status = "idle";
    },
    [sign_in.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [logout.pending]: (state) => {
      state.status = "loading";
    },
    [logout.fulfilled]: (state) => {
      state.error = {};
      state.profile = {};
      state.status = "idle";
    },
    [logout.rejected]: (state) => {
      state.status = "failed";
    },
    [update_profile.pending]: (state) => {
      state.status = "loading";
    },
    [update_profile.fulfilled]: (state, action) => {
      state.profile = { ...action.payload };
      state.status = "idle";
    },
    [update_profile.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { sign_in_LS, updateVotes } = authSlice.actions;

export default authSlice.reducer;
