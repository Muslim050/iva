import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import backendURL from "src/utils/url";

const initialState = {
  channelUsers: [],
  status: "idle",
  error: null,
};

export const fetchChannelUsers = createAsyncThunk(
  "channelusers/fetchChannelUsers",
  async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${backendURL}/publisher/channel/user/`,

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
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.detail) {
          toast.error(errorMessage.detail); // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error("Ошибка при загрузке"); // Общее сообщение об ошибке, если детали не доступны
      }
      throw error;
    }
  }
);

export const addChannelUsers = createAsyncThunk(
  "channelusers/addChannelUsers",
  async ({ data }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${backendURL}/publisher/channel/user/`,
        {
          channel: data.channel,
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
        toast.error("Ошибка при загрузке"); // Общее сообщение об ошибке, если детали не доступны
      }
      throw error;
    }
  }
);

// export const deletePublisherUsers = createAsyncThunk(
//   "publisherusers/deletePublisherUsers",
//   async ({ id }) => {
//     console.log(id);
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//       `/publisher/user/${id}/`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response;
//   }
// );

const publisherUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channelUsers = action.payload;
      })
      .addCase(fetchChannelUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addChannelUsers.fulfilled, (state, action) => {
        state.channelUsers.push(action.payload.data);
        state.status = "succeeded";
      });
    // .addCase(deletePublisherUsers.fulfilled, (state, action) => {
    //   state.publisherUsers = state.publisherUsers.filter(
    //     (user) => user.id !== action.payload
    //   );
    // });
  },
});
export const selectUsers = (state) => state.users.users;

export default publisherUsersSlice.reducer;
