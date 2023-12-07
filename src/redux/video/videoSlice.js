import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "src/utils/toastConfig";
import backendURL from "src/utils/url";

const initialState = {
  videos: [],
  status: "idle",
  error: null,
};

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${backendURL}/inventory/video/`,

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
});

export const addVideos = createAsyncThunk(
  "videos/addVideos",
  async ({ data }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${backendURL}/inventory/video/`,
        {
          channel: data.channelID,
          name: data.namevideo,
          category: data.category,
          publication_time: data.startdate,
          duration: data.timecod,
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

export const fetchEditVideo = createAsyncThunk(
  "video/fetchEditVideo",
  async ({ id, data }) => {
    console.log("datadatadatadata", data, id);
    const token = localStorage.getItem("token");

    const requestData = { ...data };

    try {
      const response = await axios.patch(
        `${backendURL}/inventory/video/${id}/`,
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch order");
    }
  }
);

export const DeleteVideo = createAsyncThunk(
  "video/DeleteVideo",
  async ({ id }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${backendURL}/inventory/video/${id}/`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch order");
    }
  }
);

// export const deleteInventory = createAsyncThunk(
//   "inventory/deleteInventory",
//   async ({ id }) => {
//     console.log("data", id);
//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.delete(
//         `${backendURL}/inventory/${id}`,

//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         throw new Error("Failed to fetch order");
//       }
//       throw error;
//     }
//   }
// );

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addVideos.fulfilled, (state, action) => {
        state.videos.push(action.payload.data);
        state.status = "succeeded";
      })
      .addCase(fetchEditVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEditVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchEditVideo.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const selectUsers = (state) => state.users.users;

export default videoSlice.reducer;
