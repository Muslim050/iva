import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {toast} from 'react-toastify'
// import axios from "src/utils/axiosInstance.js";
import backendURL from 'src/utils/url'

const initialState = {
  // order: [],
  status: 'idle',
  error: null,
  statusb: '',
  exportExcelOrder: '',
  confirmedOrders: [],
  exportConfirmed: [],
  shortListData: [],
  listsentPublisher: []
}

//запрос на получения списка
export const fetchOnceListSentToPublisher = createAsyncThunk ('sentToPublisher/sentToPublisher', async ({
                                                                                                          expandedRows,
                                                                                                          is_deactivated
                                                                                                        }) => {
  const token = localStorage.getItem ('token')

  let data = '';

  if (expandedRows) {
    data = `${backendURL}/order/assignments/?order_id=${expandedRows}`;
  } else if (is_deactivated !== undefined) {
    data = `${backendURL}/order/assignments/?is_deactivated=${is_deactivated}`;
  } else {
    data = `${backendURL}/order/assignments/`;
  }

  try {
    const response = await axios.get (data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = 'login'
    }
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error
      if (errorMessage.detail) {
        toast.error (errorMessage.detail) // Отображение деталей ошибки с помощью toast
      }
    } else {
      toast.error ('Ошибка при загрузке') // Общее сообщение об ошибке, если детали не доступны
    }
    throw error
  }
})
//запрос на получения списка


//Добавление записи со стороны админа
export const addRecord = createAsyncThunk ('sentToPublisher/addRecord', async ({data}, thunkAPI) => {
  const token = localStorage.getItem ('token')
  console.log (data)
  try {
    const response = await axios.post (
      `${backendURL}/order/assignments/`,
      {
        order: data.order,
        channel: data.channel,
        format: data.format,
        start_date: data.startdate,
        end_date: data.enddate,
        ordered_number_of_views: data.ordered_number_of_views,
        budget: data.budgett,
        age_range: data.age_range,
        content_language: data.content_language,
        country: data.country,
        notes_text: data.notes_text,
        notes_url: data.notes_url,

      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue (error.response ? error.response.data : error.message);
  }
})
//Добавление записи со стороны админа

//Редактирование записи со стороны админа
export const EditSentToPublisher = createAsyncThunk ('sentToPublisher/EditSentToPublisher', async ({id, data}) => {
    const token = localStorage.getItem ('token')

    const requestData = {};


    // Проверьте, что data.selectedFile не равен null, прежде чем добавить promo_file
    if (data.order && data.order !== null) {
      requestData.order = data.order
    }
    if (data.channel && data.channel !== null) {
      requestData.channel = data.channel
    }
    if (data.format && data.format !== null) {
      requestData.format = data.format
    }
    if (data.startdate && data.startdate !== null) {
      requestData.start_date = data.startdate
    }
    if (data.enddate && data.enddate !== null) {
      requestData.end_date = data.enddate
    }
    if (data.ordered_number_of_views && data.ordered_number_of_views !== null) {
      requestData.ordered_number_of_views = data.ordered_number_of_views
    }
    if (data.budgett && data.budgett !== null) {
      requestData.budget = data.budgett
    }
    if (data.age_range && data.age_range !== null) {
      requestData.age_range = data.age_range
    }
    if (data.content_language && data.content_language !== null) {
      requestData.content_language = data.content_language
    }
    if (data.country && data.country !== null) {
      requestData.country = data.country
    }
    if (data.notes_text && data.notes_text !== null) {
      requestData.notes_text = data.notes_text
    }
    if (data.notes_url && data.notes_url !== null) {
      requestData.notes_url = data.notes_url
    }
    try {
      const response = await axios.patch (
        `${backendURL}/order/assignments/${id}/`,
        requestData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
    } catch (error) {
      throw new Error ('Failed to fetch order')
    }
  },
)
//Редактирование записи со стороны админа


//Отправка записи паблишеру со стороны админа
export const sentToPublisherButton = createAsyncThunk (
  'sentToPublisher/sentToPublisherButton',
  async ({id}) => {
    console.log ("sentToPublisherButton", id)
    const token = localStorage.getItem ('token');

    try {
      const response = await axios.post (
        `${backendURL}/order/assignments/${id}/send-to-publisher/`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;


    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error ('Failed to fetch order');
      }
      throw error;
    }
  }
);
//Отправка записи паблишеру со стороны админа


//Выбор существующего видео  со стороны паблишера/канала
export const AddSelectingVideo = createAsyncThunk ('sentToPublisher/AddAssignToOrderWithExistingVideo', async ({data}, thunkAPI) => {
  const token = localStorage.getItem ('token')
  console.log (data)
  try {
    const response = await axios.post (
      `${backendURL}/inventory/assign-to-order-with-existing-video`,
      {
        expected_number_of_views: data.expected_number_of_views,
        format: data.format,
        promo_start_at: data.promo_start_at,
        promo_duration: data.promo_duration,
        order_assignment_id: data.order_id,
        video_id: data.video_id,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue (error.response ? error.response.data : error.message);
  }
})
//Выбор существующего видео  со стороны паблишера/канала


//Добаввление нового видео  со стороны паблишера/канала
export const AddNewVideo = createAsyncThunk ('sentToPublisher/AddNewVideo', async ({data}, thunkAPI) => {
  const token = localStorage.getItem ('token')
  console.log (data)
  try {
    const response = await axios.post (
      `${backendURL}/inventory/assign-to-order-with-new-video`,
      {
        expected_number_of_views: data.expected_number_of_views,
        format: data.format,
        promo_start_at: data.promo_start_at,
        promo_duration: data.promo_duration,
        order_assignment_id: data.order_id,
        channel_id: data.channel_id,
        video_name: data.video_name,
        category: data.category,
        video_duration: data.video_duration,
        publication_time: data.publication_time,

      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue (error.response ? error.response.data : error.message);
  }
})
//Добаввление нового видео  со стороны паблишера/канала


const sentToPublisherSlice = createSlice ({
  name: 'sentToPublisher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase (fetchOnceListSentToPublisher.pending, (state) => {
        state.status = 'loading'
      })
      .addCase (fetchOnceListSentToPublisher.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.listsentPublisher = action.payload
      })
      .addCase (fetchOnceListSentToPublisher.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase (EditSentToPublisher.pending, (state) => {
        state.status = 'loading'
      })
      .addCase (EditSentToPublisher.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase (EditSentToPublisher.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase (sentToPublisherButton.pending, (state) => {
        state.status = 'loading'
      })
      .addCase (sentToPublisherButton.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase (sentToPublisherButton.rejected, (state, action) => {
        state.status = 'failed'
      })

      .addCase (AddSelectingVideo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase (AddSelectingVideo.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase (AddSelectingVideo.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase (AddNewVideo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase (AddNewVideo.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase (AddNewVideo.rejected, (state, action) => {
        state.status = 'failed'
      })


  },
})

export default sentToPublisherSlice.reducer
