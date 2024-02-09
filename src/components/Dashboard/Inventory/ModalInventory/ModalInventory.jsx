import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addInventory } from 'src/redux/inventory/inventorySlice'
import { Controller, useForm } from 'react-hook-form'
import { toastConfig } from 'src/utils/toastConfig'
import { hideModalInventory } from 'src/redux/modalSlice'
import { ReactComponent as Close } from 'src/assets/Modal/Close.svg'
import backendURL from 'src/utils/url'
import InventoryForm from './InventoryForm'

const format = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'midroll1', text: 'Mid-roll 1' },
  { value: 'midroll2', text: 'Mid-roll 2' },
  { value: 'midroll3', text: 'Mid-roll 3' },
  { value: 'midroll4', text: 'Mid-roll 4' },
]
export default function ModalInventory() {
  const dispatch = useDispatch()
  const id = Number(localStorage.getItem('channelId'))
  const user = localStorage.getItem('role')

  const [selectedTimer, setSelectedTimer] = React.useState('')
  const [videoModal, setVideoModal] = React.useState([])
  const [channelModal, setChannelModal] = React.useState([])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      channelID: '',
      video: '',
      formatv: '',
      timecod: 0,
      videotiming: '',
      numberview: '',
    },
    mode: 'onBlur',
  })

  const cId = watch('channelID')
  const watchVideo = watch('video')

  const fetchChannel = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `${backendURL}/publisher/channel/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setChannelModal(response.data.data)
  }

  const fetchVideo = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${backendURL}/inventory/video/?channel_id=${cId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setVideoModal(
        // response.data.data
        response.data.data.filter((item) => item.is_visible_in_select === true),
      )
    } catch (error) {
      console.error('Error fetching video:', error)
    }
  }

  React.useEffect(() => {
    if (!cId) {
      fetchVideo(cId)
    }
  }, [cId])
  React.useEffect(() => {
    if (user === 'channel') {
      fetchVideo()
    }
  }, [])

  React.useEffect(() => {
    fetchChannel()
  }, [dispatch])

  const timeC = (event) => {
    const time = event.target.value
    if (time === '') {
      setSelectedTimer('00:00:00')
      setValue('timecod', 0)
    } else {
      setSelectedTimer(time)
      const [hours, minutes, seconds] = time.split(':').map(Number)
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds
      setValue('timecod', timeInSeconds)
    }
  }

  const onSubmit = (data) => {
    try {
      const order = dispatch(addInventory({ data }))
      dispatch(hideModalInventory())
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      toast.error('Что то пошло не так!', toastConfig)
    }
  }
  const handleButtonClick = () => {
    dispatch(hideModalInventory())
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Cоздать инвентарь
          <Close
            className="modalWindow__title__button"
            onClick={handleButtonClick}
          />
        </div>
        <div className="modalWindow">
          <InventoryForm
            channelModal={channelModal}
            register={register}
            errors={errors}
            videoModal={videoModal}
            format={format}
            timeC={timeC}
            Controller={Controller}
            control={control}
            isValid={isValid}
            cId={cId}
            watchVideo={watchVideo}
          />
        </div>
      </form>
    </>
  )
}

// исполльзовалось для того чтобы ограничить выбор даты

// const timeVideo = (event) => {
//   const time = event.target.value;
//   if (time === "") {
//     setSelectedTimer("00:00:00");
//     setValue("videotiming", 0);
//   } else {
//     setSelectedTimer(time);
//     const [hours, minutes, seconds] = time.split(":").map(Number);
//     const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
//     setValue("videotiming", timeInSeconds);
//   }
// };
