import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "src/utils/toastConfig";
import backendURL, { instance } from "src/utils/url";

export const login = createAsyncThunk("auth/login", async ({ data }) => {
  try {
    const response = await axios.post(
      `${backendURL}/user/token`,
      {
        username: data.login,
        password: data.password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      // Обработка успешного ответа
      toast.success("Вы успешно вошли в систему!", toastConfig);
      return response.data;
    } else {
      throw new Error("Ошибка при загрузке: некорректный статус ответа");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      if (errorMessage.detail) {
        toast.error("Неверный логин или пароль!", toastConfig);
      }
    }
    throw new Error("Ошибка при загрузке: " + error.message);
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/user/change-password/${data.id}/`,
        {
          old_password: data.data.oldPassword,
          password: data.data.newPassword,
          password2: data.data.confirmPassword,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Обработка успешного ответа
        toast.success("Пароль успешно изменен!", toastConfig);
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.detail) {
          toast.error(
            "Ошибка при изменении пароля. Пожалуйста, попробуйте снова.",
            toastConfig
          );
        }
      }
      throw new Error("Ошибка при загрузке: " + error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false,
    error: null,
    idPublisher: null,
    role: "",
  },
  reducers: {
    logout() {
      localStorage.removeItem("channelId");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.data.access;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        localStorage.setItem("role", action.payload.data.role);
        localStorage.setItem("channelId", action.payload.data.id);
        localStorage.setItem("token", action.payload.data.access);
        localStorage.setItem("username", action.payload.data.username);

        // localStorage.setItem("refresh_token", action.payload.data.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.message
          : "Unknown error occurred.";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        // localStorage.setItem("refresh_token", action.payload.data.refresh);
      });
    // .addCase(refreshAccessToken.fulfilled, (state, action) => {
    //   state.token = action.payload.token;
    //   localStorage.setItem("token", action.payload.data.access);
    // });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
