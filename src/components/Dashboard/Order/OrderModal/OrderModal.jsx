import axios from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addOrder } from '../../../../redux/order/orderSlice'
import { toastConfig } from '../../../../utils/toastConfig'
import 'react-datepicker/dist/react-datepicker.css'
import InputUI from '../../../UI/InputUI/InputUI'
import SelectUI from '../../../UI/SelectUI/SelectUI'
import style from './OrderModal.module.scss'
import backendURL from 'src/utils/url'
import { hideModalOrder } from 'src/redux/modalSlice'
import { ReactComponent as Close } from 'src/assets/Modal/Close.svg'

const format = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'mixroll', text: 'Mix-roll' },
]
export default function OrderModal({ setShowModal }) {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)

  const [isOrderCreated, setIsOrderCreated] = React.useState(false)
  const [advertiser, setAdvertiser] = React.useState([])
  const [cpm, setCpm] = React.useState([])
  const user = localStorage.getItem('role')
  const [budgett, setBudgett] = React.useState(0)
  const [selectedEndDate, setSelectedEndDate] = React.useState(null)

  const advID = localStorage.getItem('advertiser')
  const today = new Date()
  let advId
  advertiser.forEach((item) => {
    advId = item.id // Присваиваем значение свойства name текущего элемента массива
  })
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      advertiserID: '',
      name: '',
      format: '',
      expectedView: '',
      budgett: 0,
      selectedFile: null,
      notes: '',
      target_country: '',
    },

    mode: 'onBlur',
  })
  const selectedFormat = watch('format')
  const expectedView = watch('expectedView')
  const agencyAdvId = watch('advertiserID')
  const targetCountry = watch('target_country')

  const calculateBudget = () => {
    let newBudget = 0
    console.log(targetCountry)
    if (targetCountry) {
      const uzFormat = `${selectedFormat}_uz`
      if (cpm[uzFormat]) {
        newBudget = (expectedView / 1000) * cpm[uzFormat]
      }
    } else if (cpm[selectedFormat]) {
      newBudget = (expectedView / 1000) * cpm[selectedFormat]
    }

    setBudgett(newBudget)
  }

  React.useEffect(() => {
    setValue('budgett', budgett)
  }, [budgett, setValue])
  React.useEffect(() => {
    calculateBudget()
  }, [selectedFormat, expectedView, targetCountry])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }
  const fetchCpm = async () => {
    const token = localStorage.getItem('token')

    const response = await axios.get(
      `${backendURL}/order/cpm/?advertiser=${agencyAdvId || advID}`,
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

  const fetchAdvertiser = async () => {
    const token = localStorage.getItem('token')

    const response = await axios.get(
      `${backendURL}/advertiser/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setAdvertiser(response.data.data)
  }
  React.useEffect(() => {
    fetchAdvertiser()
  }, [])

  React.useEffect(() => {
    if (agencyAdvId) {
      fetchCpm()
    }
  }, [agencyAdvId])

  // Effect hook for advID changes
  React.useEffect(() => {
    if (advID) {
      fetchCpm()
    }
  }, [advID])
  const onSubmit = async (data) => {
    try {
      setIsOrderCreated(true)
      const response = await dispatch(addOrder({ data }))
      if (response && !response.error) {
        toast.success('Заказ успешно создан!', toastConfig)
        dispatch(hideModalOrder())
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else if (response.error.message) {
        toast.error(
          'Что-то пошло не так!' + response.error.message,
          toastConfig,
        )
        dispatch(hideModalOrder())
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

  const [notes, setNotes] = React.useState('') // Состояние для хранения текста заметок
  const maxChars = 100 // Максимальное количество символов

  const handleNotesChange = (event) => {
    setNotes(event.target.value.substring(0, maxChars)) // Обновляем текст, обрезая его до максимальной длины
  }

  const handleButtonClick = () => {
    dispatch(hideModalOrder())
  }
  const taretCheckbox = (event) => {
    const isChecked = event.target.checked
    setValue('target_country', isChecked ? 'uz' : '')
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Cоздать заказ
          <Close
            className="modalWindow__title__button"
            onClick={handleButtonClick}
          />
        </div>

        <div className="modalWindow">
          {user === 'advertising_agency' ? (
            <SelectUI
              label="рекламодателя"
              options={advertiser}
              register={register('advertiserID', {
                required: 'Поле обязательно для заполнения',
              })}
              error={errors?.publisher?.message}
              inputWidth
            />
          ) : (
            ''
          )}
          <InputUI
            type="text"
            placeholder=" Название кампании"
            autoComplete="off"
            register={register}
            name="name"
            errors={errors.name}
            inputWidth
          />

          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: '24px' }}
          >
            <div>
              <div style={{ display: 'grid', marginRight: '10px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                  Начало размещения
                </label>
                <input
                  className={style.input}
                  type="date"
                  // min={getCurrentDate()}
                  {...register('startdate', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  style={{
                    width: '210px',
                  }}
                />
                <span className={style.modalWindow__input_error}>
                  {errors?.startdate && <p>{errors?.startdate?.message}</p>}
                </span>
              </div>
            </div>
            <div>
              <div style={{ display: 'grid' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                  Конец размещения
                </label>
                <input
                  className={style.input}
                  type="date"
                  // min={getEndDate(watch("startdate"))} // Use watch to get the value of the "startdate" field
                  {...register('enddate', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  style={{
                    width: '210px',
                  }}
                />
                <span className={style.modalWindow__input_error}>
                  {errors?.enddate && <p>{errors?.enddate?.message}</p>}
                </span>
              </div>
            </div>
          </div>

          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: '24px' }}
          >
            <div style={{ width: '210px', display: 'grid' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                Выбрать Формат
              </label>
              <select
                id="countries"
                className={style.select__select}
                style={{ padding: '12px' }}
                {...register('format', {
                  required: 'Поле обязательно',
                })}
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

            <div
              style={{
                display: 'flex',
                border: '1px solid #dedddd',
                padding: '5px 10px',
                borderRadius: '10px',
              }}
            >
              <div
                style={{ display: 'grid', marginTop: '5px', fontSize: '12px' }}
              >
                <div style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                  Target для РУЗ
                </div>
                <label className={style.checkboxI} onClick={taretCheckbox}>
                  Target UZ
                  <input type="checkbox" />
                  <span className={style.checkmark}></span>
                </label>
              </div>
            </div>
          </div>

          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: '24px' }}
          >
            <div style={{ display: 'grid' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                Количество показов
              </label>
              <Controller
                name="expectedView"
                control={control}
                rules={{
                  required: 'Поле обязательно к заполнению',
                  min: {
                    value: 1000000,
                    message: 'Минимальное значение - 1 000 000',
                  },
                }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <input
                    className={style.input}
                    type="text"
                    value={value.toLocaleString('en-US')}
                    style={{
                      width: '210px',
                    }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '')
                      const newValue = rawValue ? parseInt(rawValue, 10) : ''
                      onChange(newValue)
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    placeholder="Количество показов"
                    autoComplete="off"
                    step="1000"
                    disabled={!selectedFormat}
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
            <div style={{ display: 'grid' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
                Бюджет (сум)
              </label>
              <input
                className={style.input}
                type="text"
                style={{
                  width: '205px',
                }}
                value={budgett.toLocaleString('en-US')}
                placeholder="Бюджет"
                autoComplete="off"
                disabled={true}
              />
            </div>
          </div>

          <div style={{ display: 'grid', marginBottom: '30px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
              Загрузить рекламный ролик
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className={style.modalWindow__file}
              {...register('selectedFile', {
                required: 'Ролик обезателен',
              })}
            />
            <span className={style.modalWindow__input_error}>
              {errors?.selectedFile && <p>{errors?.selectedFile?.message}</p>}
            </span>
          </div>
          <textarea
            placeholder="Добавить текст и ссылки"
            autoComplete="off"
            className={style.modalWindow__textarea}
            {...register('notes')}
            style={{ width: '100%' }}
            onChange={handleNotesChange} // Обработка изменений
            maxLength={maxChars}
          ></textarea>
          <div
            style={{
              fontSize: '12px',
              marginTop: '3px',
              color: notes.length === maxChars ? 'red' : 'black',
            }}
          >
            {notes.length}/{maxChars} символов
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
                  <span>Создать</span>
                  <div className={style.loaderWrapper}>
                    <div className={style.spinner}></div>
                  </div>
                </>
              ) : (
                <span>Создать</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
