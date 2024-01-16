import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { toastConfig } from '../../../../utils/toastConfig'
import 'react-datepicker/dist/react-datepicker.css'
import style from './EditInventoryModal.module.scss'
import { ReactComponent as Close } from 'src/assets/Modal/Close.svg'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'
import { ReactComponent as Delete } from 'src/assets/Table/Delete.svg'
import {
  deleteInventory,
  fetchEditInventory,
  fetchInventory,
} from 'src/redux/inventory/inventorySlice'
import backendURL from 'src/utils/url'
import axios from 'axios'

// Функция для преобразования секунд в формат "часы:минуты:секунды"
function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(remainingSeconds).padStart(2, '0')}`
}

// Функция для преобразования времени в секунды
function timeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}
const format = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'midroll1', text: 'Mid-roll 1' },
  { value: 'midroll2', text: 'Mid-roll 2' },
  { value: 'midroll3', text: 'Mid-roll 3' },
  { value: 'midroll4', text: 'Mid-roll 4' },
]
export default function EditInventoryModal({
  setShowModalEditAdmin,
  currentOrder,
}) {
  const dispatch = useDispatch()
  const role = localStorage.getItem('role')
  const [startAtInSeconds, setStartAtInSeconds] = React.useState(
    currentOrder.start_at,
  )

  const [isOrderCreated, setIsOrderCreated] = React.useState(false)
  const [videoModal, setVideoModal] = React.useState([])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
  } = useForm({
    defaultValues: {
      format: currentOrder.format,
      start_at: secondsToTime(currentOrder.start_at),
      expected_number_of_views: currentOrder.expected_number_of_views,
      expected_promo_duration: currentOrder.expected_promo_duration,
      video_content: currentOrder.video_content?.name || '', // Optional chaining
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        start_at: startAtInSeconds, // Отправляем секунды на бэкэнд
      }

      const response = await dispatch(
        fetchEditInventory({ id: currentOrder.id, data: dataToSend }),
      )

      if (response && !response.error) {
        toast.success('Изминения успешно обновлены!', toastConfig)
        setShowModalEditAdmin(false)
        dispatch(fetchInventory())
      } else if (response.error.message) {
        toast.error(
          'Что-то пошло не так!' + response.error.message,
          toastConfig,
        )
        setShowModalEditAdmin(false)
      }
    } catch (error) {
      setIsOrderCreated(false)
      if (error.message) {
        toast.error(`Ошибка : ${error.message}`, toastConfig)
      } else {
        toast.error('Что-то пошло не так: ' + error.message, toastConfig)
      }
    }
  }

  const handleRemoveInventory = () => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить?')
    if (confirmDelete) {
      dispatch(deleteInventory({ id: currentOrder.id }))
        .then(() => {
          toast.success('Инвентарь успешно удален', toastConfig)
          setShowModalEditAdmin(false)
          dispatch(fetchInventory())
        })
        .catch((error) => {
          toast.error(error.message, toastConfig)
          dispatch(fetchInventory())
        })
    } else {
      toast.info('Операция отменена', toastConfig)
    }
  }

  const handleTimeBlur = (event) => {
    const time = event.target.value
    const seconds = timeToSeconds(time)
    setStartAtInSeconds(seconds)
  }

  const fetchVideo = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${backendURL}/inventory/video/?channel_id=${currentOrder.channel.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setVideoModal(
        response.data.data.filter((item) => item.is_visible_in_select === true),
      )
    } catch (error) {
      console.error('Error fetching video:', error)
    }
  }
  React.useEffect(() => {
    fetchVideo(currentOrder.channel.id)
  }, [dispatch, currentOrder.channel.id])
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Редактировать Инвентарь
          <Close
            className="modalWindow__title__button"
            onClick={() => setShowModalEditAdmin(false)}
          />
        </div>

        <div className="modalWindow">
          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: '15px' }}
          >
            <div style={{ display: 'grid' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                Тайм код рекламы
              </label>
              <input
                className={style.modalWindow__inputU}
                type="time"
                step="1"
                inputMode="numeric"
                {...register('start_at')}
                style={{ width: '210px' }}
                onBlur={handleTimeBlur} // Обработчик onBlur для преобразования времени в секунды
              />
              <span className={style.error}>
                {errors?.start_at && <p>{errors?.start_at?.message}</p>}
              </span>
            </div>

            <div style={{ display: 'grid', marginLeft: '10px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                Количество показов
              </label>
              <Controller
                name="expected_number_of_views"
                control={control}
                rules={{
                  required: 'Поле обязательно к заполнению',
                }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <input
                    className={style.modalWindow__inputU}
                    type="text"
                    value={value.toLocaleString('en-US')}
                    style={{ width: '210px' }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '')
                      const newValue = rawValue ? parseInt(rawValue, 10) : ''
                      onChange(newValue)
                    }}
                    onBlur={onBlur}
                    name="expected_number_of_views"
                    ref={ref}
                    placeholder="Количество показов"
                    autoComplete="off"
                    step="1000"
                  />
                )}
              />
              <span className={style.modalWindow__input_error}>
                {errors?.expectedView && (
                  <p style={{ width: '240px', lineHeight: '1.4' }}>
                    {errors?.expectedView?.message}
                  </p>
                )}
              </span>
            </div>
          </div>

          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: '15px' }}
          >
            <div style={{ display: 'grid' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                Формат
              </label>
              <select
                id="countries"
                style={{ width: '210px' }}
                {...register('format', {
                  required: 'Поле обязательно',
                })}
                className={style.modalWindow__inputU}
              >
                <option value="">Выбрать Формат</option>

                {format.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <span className={style.select__error}>
                {errors?.format && (
                  <p style={{ lineHeight: '16px' }}>
                    {errors?.format?.message}
                  </p>
                )}
              </span>
            </div>

            <div style={{ display: 'grid', marginLeft: '10px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                Хронометраж
              </label>
              <Controller
                name="expected_promo_duration"
                control={control}
                rules={{
                  required: 'Поле обязательно к заполнению',
                }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <input
                    className={style.modalWindow__inputU}
                    type="text"
                    value={value.toLocaleString('en-US')}
                    style={{ width: '210px' }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '')
                      const newValue = rawValue ? parseInt(rawValue, 10) : ''
                      onChange(newValue)
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    placeholder="Хронометраж"
                    autoComplete="off"
                    step="1000"
                  />
                )}
              />
              <span className={style.modalWindow__input_error}>
                {errors?.expectedView && (
                  <p style={{ width: '240px', lineHeight: '1.4' }}>
                    {errors?.expectedView?.message}
                  </p>
                )}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
              Текущее видео{' '}
              <strong>{currentOrder.video_content?.name || 'N/A'}</strong>
            </label>
            <select
              id="countries"
              style={{ width: '210px' }}
              {...register('video_content', {
                required: 'Поле обязательно',
              })}
              className={style.modalWindow__inputU}
            >
              <option value="">Выбрать Видео</option>

              {videoModal.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <span className={style.select__error}>
              {errors?.video_content && (
                <p style={{ lineHeight: '16px' }}>
                  {errors?.video_content?.message}
                </p>
              )}
            </span>
          </div>

          <div className={style.btn__wrapper}>
            {role === 'admin' ? (
              <ButtonBorder
                onClick={() => {
                  handleRemoveInventory()
                }}
              >
                <Delete
                  style={{
                    width: '16px',
                    height: '16px',
                    marginRight: '10px',
                  }}
                />
                Удалить
              </ButtonBorder>
            ) : null}

            <button
              style={{ display: 'flex', alignItems: 'center' }}
              type="submit"
              className={style.btn__wrapper__btn}
            >
              {isOrderCreated ? (
                <>
                  <span>Сохранить</span>
                  <div className={style.loaderWrapper}>
                    <div className={style.spinner}></div>
                  </div>
                </>
              ) : (
                <span>Сохранить</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
