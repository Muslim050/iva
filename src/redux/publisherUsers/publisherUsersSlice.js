import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "src/utils/toastConfig";
import backendURL from "src/utils/url";

const initialState = {
  publisherUsers: [],
  status: "idle",
  error: null,
};

export const fetchPublisherUsers = createAsyncThunk(
  "publisherusers/fetchPublisherUsers",
  async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${backendURL}/publisher/user/`,

        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = "login";
      }
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.detail) {
          toast.error(errorMessage.detail); // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error("Ошибка при загрузке", toastConfig); // Общее сообщение об ошибке, если детали не доступны
      }
      throw error;
    }
  }
);

export const addPublisherUsers = createAsyncThunk(
  "publisherusers/addPublisherUsers",
  async ({ data }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${backendURL}/publisher/user/`,
        {
          publisher: data.publisher,
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          username: data.username,
          phone_number: data.phone,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.detail) {
          toast.error(errorMessage.detail); // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error("Ошибка при загрузке", toastConfig); // Общее сообщение об ошибке, если детали не доступны
      }
      throw error;
    }
  }
);

const publisherUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublisherUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPublisherUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.publisherUsers = action.payload;
      })
      .addCase(fetchPublisherUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPublisherUsers.fulfilled, (state, action) => {
        state.publisherUsers.push(action.payload.data);
        state.status = "succeeded";
      });
  },
});
export const selectUsers = (state) => state.users.users;

export default publisherUsersSlice.reducer;
