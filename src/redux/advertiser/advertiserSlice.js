import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "src/utils/toastConfig";
import backendURL from "src/utils/url";

const initialState = {
  advertisers: [],
  status: "idle",
  error: null,
};

export const fetchAdvertiser = createAsyncThunk(
  "advertiser/fetchAdvertiser",
  async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${backendURL}/advertiser/`, {
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

export const addAdvertiser = createAsyncThunk(
  "advertiser/addAdvertiser",
  async ({ data }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${backendURL}/advertiser/`,
        {
          advertising_agency: data.agency,
          name: data.name,
          email: data.email,
          phone_number: data.phone,
        },
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

const advertiserSlice = createSlice({
  name: "advertiser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdvertiser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.advertisers = action.payload;
      })
      .addCase(fetchAdvertiser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAdvertiser.fulfilled, (state, action) => {
        state.advertisers.push(action.payload);
        state.status = "succeeded";
      });
  },
});

export default advertiserSlice.reducer;
