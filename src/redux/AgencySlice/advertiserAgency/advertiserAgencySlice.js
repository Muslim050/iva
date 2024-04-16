import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { toastConfig } from 'src/utils/toastConfig'
import backendURL from 'src/utils/url'

const initialState = {
  advertiserAgency: [],
  status: 'idle',
  error: null,
}

export const fetchAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/fetchAdvertiserAgency',
  async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.get(
        `${backendURL}/advertiser/advertising-agency/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error
        if (errorMessage.detail) {
          toast.error(errorMessage.detail) // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error('Ошибка при загрузке') // Общее сообщение об ошибке, если детали не доступны
      }
      throw error
    }
  },
)
export const addAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/addAdvertiserAgency',
  async ({ data }) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(
        `${backendURL}/advertiser/advertising-agency/`,
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error
        if (errorMessage.detail) {
          toast.error(errorMessage.detail) // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error('Ошибка при загрузке', toastConfig) // Общее сообщение об ошибке, если детали не доступны
      }
      throw error
    }
  },
)

export const editAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/editAdvertiserAgency',
  async ({ id, data }) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.patch(
        `${backendURL}/advertiser/advertising-agency/${id}`,
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          commission_rate: data.commission_rate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error
        if (errorMessage.detail) {
          toast.error(errorMessage.detail) // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error('Ошибка при загрузке', toastConfig) // Общее сообщение об ошибке, если детали не доступны
      }
      throw error
    }
  },
)
const advertiserAgencySlice = createSlice({
  name: 'advertiserAgency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiserAgency.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdvertiserAgency.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.advertiserAgency = action.payload
      })
      .addCase(fetchAdvertiserAgency.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAdvertiserAgency.fulfilled, (state, action) => {
        state.advertiserAgency.push(action.payload)
        state.status = 'succeeded'
      })
      .addCase(editAdvertiserAgency.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editAdvertiserAgency.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(editAdvertiserAgency.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default advertiserAgencySlice.reducer
