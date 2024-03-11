import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
// import { toast } from 'react-toastify'
// import {
//   deleteOrder,
//   fetchEditOrder,
//   fetchOrder,
// } from '../../../../redux/order/orderSlice'
// import { toastConfig } from '../../../../utils/toastConfig'
import 'react-datepicker/dist/react-datepicker.css'
import style from './EditAdvModal.module.scss'
import { ReactComponent as Close } from 'src/assets/Modal/Close.svg'
import { ReactComponent as File } from 'src/assets/Table/file.svg'
import backendURL from 'src/utils/url'
import axios from 'axios'
import {
  editAdvertiser,
  fetchAdvertiser,
  removeAdvertiser,
} from 'src/redux/advertiser/advertiserSlice'
import { toastConfig } from 'src/utils/toastConfig'
import { toast } from 'react-toastify'

const format = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'mixroll', text: 'Mix-roll' },
]
export default function EditAdvModal({ setShowModalEditAdmin, currentOrder }) {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [cpm, setCpm] = React.useState([])
  const role = localStorage.getItem('role')

  const [isOrderCreated, setIsOrderCreated] = React.useState(false)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: currentOrder.name,
      email: currentOrder.email,
      phone_number: currentOrder.phone_number,
      cpm_mixroll: currentOrder.cpm_mixroll,
      cpm_preroll: currentOrder.cpm_preroll,
    },
    mode: 'onBlur',
  })

  const editName = watch('name')
  // const viewValue = watch("view");
  const selectedFormat = watch('format')
  const expectedView = watch('expectedView')

  const fetchCpm = async () => {
    const token = localStorage.getItem('token')

    const response = await axios.get(
      `${backendURL}/order/cpm/?advertiser=${currentOrder.id}`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setCpm(response.data.data)
  }

  React.useEffect(() => {
    fetchCpm()
  }, [])

  const onSubmit = async (data) => {
    console.log('onSubmit', data)
    try {
      setIsOrderCreated(true)
      const response = await dispatch(
        editAdvertiser({ id: currentOrder.id, data }),
      )
      if (response && !response.error) {
        toast.success('Изминения успешно обновлены!', toastConfig)
        setShowModalEditAdmin(false)
        dispatch(fetchAdvertiser())
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

  const handleRemoveAdv = () => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить?')
    if (confirmDelete) {
      dispatch(removeAdvertiser({ id: currentOrder.id }))
        .then(() => {
          toast.success('Рекламодатель успешно удален', toastConfig)
          setShowModalEditAdmin(false)
          dispatch(fetchAdvertiser())
        })
        .catch((error) => {
          toast.error(error.message, toastConfig)
          dispatch(fetchAdvertiser())
        })
    } else {
      toast.info('Операция отменена', toastConfig)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Редактировать Рекламодателя
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
            <div style={{ width: '210px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                cpm_preroll
              </label>
              <Controller
                name="cpm_preroll"
                control={control}
                rules={{ required: 'Поле обязательно к заполнению' }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <input
                    className={style.input}
                    type="text"
                    value={value?.toLocaleString('en-US')}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '')
                      const newValue = rawValue ? parseInt(rawValue, 10) : ''
                      onChange(newValue)
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    placeholder="cpm_preroll"
                    autoComplete="off"
                    step="1000"
                  />
                )}
              />
              <span className={style.error}>
                {errors?.numberview && <p>{errors?.numberview?.message}</p>}
              </span>
            </div>
            <div style={{ width: '210px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                cpm_mixroll
              </label>
              <Controller
                name="cpm_mixroll"
                control={control}
                rules={{ required: 'Поле обязательно к заполнению' }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <input
                    className={style.input}
                    type="text"
                    value={value?.toLocaleString('en-US')}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '')
                      const newValue = rawValue ? parseInt(rawValue, 10) : ''
                      onChange(newValue)
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    placeholder="cpm_mixroll"
                    autoComplete="off"
                    step="1000"
                  />
                )}
              />
              <span className={style.error}>
                {errors?.numberview && <p>{errors?.numberview?.message}</p>}
              </span>
            </div>
          </div>

          <div className={style.btn__wrapper}>
            <button
              style={{ display: 'flex', alignItems: 'center' }}
              type="submit"
              disabled={!isValid || isOrderCreated}
              className={
                isValid && !isOrderCreated
                  ? style.btn__wrapper__btn
                  : style.btn__wrapper__disabled
              }
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
