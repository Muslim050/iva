import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import backendURL from "src/utils/url";

const initialState = {
  channel: [],
  channelID: [],
  status: "idle",
  error: null,
};

export const fetchChannel = createAsyncThunk (
  "channel/fetchChannel",
  async (id, {getState}) => {
    // const token = localStorage.getItem("token");
    const token = localStorage.getItem ('token')
    let url = new URL (`${backendURL}/publisher/channel/`)
    const params = new URLSearchParams ()
    if (id) {
      params.append ('publisher_id', id)
    }
    url.search = params.toString ()

    try {
      const response = await axios.get (url.href, {
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
          toast.error (errorMessage.detail); // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error ("Ошибка при загрузке"); // Общее сообщение об ошибке, если детали не доступны
      }
      throw error;
    }
  }
);


export const addChannel = createAsyncThunk (
  "channel/addChannel",
  async ({data}) => {
    const token = localStorage.getItem ("token");

    try {
      const response = await axios.post (
        `${backendURL}/publisher/channel/`,
        {
          publisher: data.publisher,
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          channel_id: data.channelId,
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
      toast.error (error.message.detail);
      throw error.detail;
    }
  }
);

const channelSlice = createSlice ({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase (fetchChannel.pending, (state) => {
        state.status = "loading";
      })
      .addCase (fetchChannel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channel = action.payload;
      })
      .addCase (fetchChannel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase (addChannel.fulfilled, (state, action) => {
        state.channel.push (action.payload.data);
      });

    // .addCase(updateUser.fulfilled, (state, action) => {
    //   const { id, firstName, lastName, email } = action.payload;
    //   const user = state.users.find((user) => user.id === id);
    //   if (user) {
    //     user.firstName = firstName;
    //     user.lastName = lastName;
    //     user.email = email;
    //   }
    //   state.userToEdit = null;
    // })
  },
});

export default channelSlice.reducer;
