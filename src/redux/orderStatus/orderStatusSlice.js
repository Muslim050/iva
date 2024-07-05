import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import {toastConfig} from "src/utils/toastConfig";
import backendURL from "src/utils/url";

const initialState = {
  status: "idle",
  error: null,
  statusb: "",
};

export const fetchViewStatus = createAsyncThunk (
  "order/fetchViewStatus",
  async (orderID) => {
    const token = localStorage.getItem ("token");

    try {
      const response = await axios.post (
        `${backendURL}/order/accept-order/`,
        {
          order_id: orderID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const assignInventories = createAsyncThunk (
  "order/assignInventories",
  async ({expandedRows, selectedRows}) => {
    const token = localStorage.getItem ("token");

    try {
      const response = await axios.post (
        `${backendURL}/order/assign-inventories/`,
        {
          order_id: expandedRows,
          inventory_ids: selectedRows,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const confirmByChannel = createAsyncThunk (
  "order/comfirmByChannel",
  async (data) => {
    const token = localStorage.getItem ("token");
    try {
      const response = await axios.post (
        `${backendURL}/order/confirm-by-channel/`,
        {
          order_id: data.inventory,
          inventory_id: data.expandedRows,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const removeInventories = createAsyncThunk (
  "order/removeInventories",
  async ({expandedRows, inventory_id}, {rejectWithValue}) => {
    const token = localStorage.getItem ("token");
    try {
      const response = await axios.post (
        `${backendURL}/order/remove-inventory/`,
        {
          order_id: expandedRows,
          inventory_id: inventory_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {expandedRows, inventory_id}; // Возвращаем данные, чтобы использовать их в reducer
    } catch (error) {
      return rejectWithValue (error.response.data); // Возвращаем ошибку с данными из response.data
    }
  }
);

export const deactivateInventories = createAsyncThunk (
  "order/deactivateInventories",
  async ({inventory_id}, {rejectWithValue}) => {
    const token = localStorage.getItem ("token");
    try {
      const response = await axios.post (
        `${backendURL}/inventory/deactivate/`,
        {
          inventory_id: inventory_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {inventory_id}; // Возвращаем данные, чтобы использовать их в reducer
    } catch (error) {
      return rejectWithValue (error.response.data); // Возвращаем ошибку с данными из response.data
    }
  }
);

export const deletedComplitedOrder = createAsyncThunk (
  "order/deletedComplitedOrder",
  async ({inventory_id}, {rejectWithValue}) => {
    const token = localStorage.getItem ("token");
    try {
      const response = await axios.post (
        `${backendURL}/inventory/confirm-removal/`,
        {
          inventory_id: inventory_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {inventory_id}; // Возвращаем данные, чтобы использовать их в reducer
    } catch (error) {
      return rejectWithValue (error.response.data); // Возвращаем ошибку с данными из response.data
    }
  }
);

export const confirmOrder = createAsyncThunk (
  "order/confirmOrder",
  async ({expandedRows}) => {
    const token = localStorage.getItem ("token");

    try {
      const response = await axios.post (
        `${backendURL}/order/confirm-by-admin/`,
        {
          order_id: expandedRows,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const finishOrder = createAsyncThunk (
  "order/finishOrder",
  async ({id}) => {
    const token = localStorage.getItem ("token");

    try {
      const response = await axios.post (
        `${backendURL}/order/finish/`,

        {
          order_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const orderStatusSlice = createSlice ({
  name: "status",
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase (fetchViewStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase (fetchViewStatus.fulfilled, (state, action) => {
        state.statusb = action.payload.status;
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase (fetchViewStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error ("Failed to fetch status", toastConfig);
      })
      .addCase (removeInventories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase (removeInventories.fulfilled, (state, action) => {
        const {expandedRows, inventory_id} = action.payload;

        if (Array.isArray (state.expandedRows)) {
          state.expandedRows = state.expandedRows.filter (
            (row) => row !== expandedRows
          );
        }

        state.status = "succeeded";
      })
      .addCase (removeInventories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase (deactivateInventories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase (deactivateInventories.fulfilled, (state, action) => {
        const {expandedRows, inventory_id} = action.payload;

        if (Array.isArray (state.expandedRows)) {
          state.expandedRows = state.expandedRows.filter (
            (row) => row !== expandedRows
          );
        }

        state.status = "succeeded";
      })
      .addCase (deactivateInventories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase (confirmOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success ("Инвентарь подтвержден!", toastConfig);
      })
      .addCase (confirmOrder.rejected, (state, action) => {
        state.status = "failed";
        toast.error (
          "Инвентори этого заказа все еще открыты или предварительно забронированы.!",
          toastConfig
        );
      })
      .addCase (confirmByChannel.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase (finishOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success ("Заказ успешно финиширован!", toastConfig);
      })
      .addCase (finishOrder.rejected, (state, action) => {
        state.status = "failed";
        // Здесь обрабатываем ошибку запроса
        toast.error (
          "Чтобы завершить заказ, сначала необходимо деактивировать все инвентари этого заказа!",
          toastConfig
        ); // Выводим сообщение об ошибке
        // ...обновление состояния...
      })

      .addCase (deletedComplitedOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase (deletedComplitedOrder.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {setCurrentOrder} = orderStatusSlice.actions;

export default orderStatusSlice.reducer;