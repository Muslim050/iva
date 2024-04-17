import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import backendURL from 'src/utils/url'

const initialState = {
  publisher: [],
  status: 'idle',
  error: null,
  publisherReport: [],
}

export const fetchPublisher = createAsyncThunk(
  'publisher/fetchPublisher',
  async (_, { getState }) => {
    // const token = localStorage.getItem("token");
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(
        `${backendURL}/publisher/`,

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
      if (error.response.status === 401) {
        window.location.href = 'login'
      }
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

export const addPublisher = createAsyncThunk(
  'publisher/addPublisher',
  async ({ data }) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(
        `${backendURL}/publisher/`,
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
      return response.data
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

export const addPublisherReport = createAsyncThunk(
  'publisher/addPublisherReport',
  async ({ id, startDate, endDate, format, advertiser }) => {
    console.log('advertiser', advertiser)
    const token = localStorage.getItem('token')
    let url = new URL(`${backendURL}/publisher/report/`)
    const params = new URLSearchParams()
    if (id) {
      params.append('channel_id', id)
    }
    if (startDate) {
      params.append('start_date', startDate)
    }
    if (endDate) {
      params.append('end_date', endDate)
    }
    if (format) {
      params.append('order_format', format)
    }
    if (advertiser) {
      params.append('advertiser_id', advertiser)
    }
    url.search = params.toString()
    console.log('url.href', url.href)
    try {
      const response = await axios.get(url.href, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data.data
    } catch (error) {
      throw error
    }
  },
)

export const deletePublisher = createAsyncThunk(
  'publisher/deletePublisher',
  async (userId) => {
    const token = localStorage.getItem('token')

    await axios.delete(`${backendURL}/publisher/${userId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return userId
  },
)

const publisherSlice = createSlice({
  name: 'publisher',
  initialState,
  reducers: {
    resetPublisherReport(state) {
      state.publisherReport = [] // Resets to an empty array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublisher.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPublisher.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.publisher = action.payload
      })
      .addCase(fetchPublisher.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addPublisher.fulfilled, (state, action) => {
        state.publisher.push(action.payload.data)
      })
      .addCase(deletePublisher.fulfilled, (state, action) => {
        state.publisher = state.publisher.filter(
          (user) => user.id !== action.payload,
        )
      })
      .addCase(addPublisherReport.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addPublisherReport.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.publisherReport = action.payload
      })
      .addCase(addPublisherReport.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

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
})
export const { resetPublisherReport } = publisherSlice.actions

export default publisherSlice.reducer
