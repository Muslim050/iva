import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "src/utils/toastConfig";
import backendURL from "src/utils/url";

const initialState = {
  statistics: [],
  statisticsChannel: [],
  statisticsVideo: [],
  status: "",
  error: null,
};

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ id, startDate, endDate }) => {
    const token = localStorage.getItem("token");
    let url = `${backendURL}/order/statistics/?order_id=${id}`;

    if (startDate && endDate) {
      url += `&start_date=${startDate}&end_date=${endDate}`;
    } else if (startDate) {
      url += `&start_date=${startDate}`;
    } else if (endDate) {
      url += `&end_date=${endDate}`;
    } 
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
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
export const fetchVideoStatistics = createAsyncThunk(
  "statistics/fetchVideoStatistics",
  async ({ id }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${backendURL}/publisher/channel/${id}/video-statistics/`,

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
          toast.error(errorMessage.detail, toastConfig);
        } else {
          toast.error("Unknown error occurred", toastConfig);
        }
      } else {
        toast.error("Error occurred while loading", toastConfig);
      }
      throw error;
    }
  }
);

export const fetchChannelStatistics = createAsyncThunk(
  "statistics/fetchChannelStatistics",
  async ({ id }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${backendURL}/publisher/channel/${id}/statistics/`,

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
          toast.error(errorMessage.detail);
        } else {
          toast.error("Unknown error occurred");
        }
      } else {
        toast.error("Error occurred while loading");
      }
      throw error;
    }
  }
);

const staticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    clearStatistics: (state) => {
      state.statisticsChannel = [];
      state.statisticsVideo = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchVideoStatistics.pending, (state) => {
        state.status = "loading";
        state.statisticsVideo = [];
      })
      .addCase(fetchVideoStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statisticsVideo = action.payload;
      })
      .addCase(fetchVideoStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchChannelStatistics.pending, (state) => {
        state.status = "loading";
        state.statisticsChannel = [];
      })
      .addCase(fetchChannelStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statisticsChannel = action.payload;
      })
      .addCase(fetchChannelStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { clearStatistics } = staticsSlice.actions;

export default staticsSlice.reducer;
