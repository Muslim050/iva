import React from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import style from './EditAdvertiserAgencyModal.module.scss'
import {ReactComponent as Close} from 'src/assets/Modal/Close.svg'
import {toastConfig} from 'src/utils/toastConfig'
import {toast} from 'react-toastify'
import {
  editAdvertiserAgency,
  fetchAdvertiserAgency,
} from 'src/redux/AgencySlice/advertiserAgency/advertiserAgencySlice'
import InputUI from 'src/components/UI/InputUI/InputUI'

export default function EditAdvertiserAgencyModal ({
                                                     setShowModalEditAdmin,
                                                     currentOrder,
                                                   }) {
  const dispatch = useDispatch ()

  const [isOrderCreated, setIsOrderCreated] = React.useState (false)
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm ({
    defaultValues: {
      name: currentOrder.name,
      email: currentOrder.email,
      phone_number: currentOrder.phone_number,
      commission_rate: currentOrder.commission_rate,
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    try {
      setIsOrderCreated (true)
      const response = await dispatch (
        editAdvertiserAgency ({id: currentOrder.id, data}),
      )
      if (response && !response.error) {
        toast.success ('Изминения успешно обновлены!', toastConfig)
        setShowModalEditAdmin (false)
        dispatch (fetchAdvertiserAgency ())
      } else if (response.error.message) {
        toast.error (
          'Что-то пошло не так!' + response.error.message,
          toastConfig,
        )
        setShowModalEditAdmin (false)
      }
    } catch (error) {
      setIsOrderCreated (false)
      if (error.message) {
        toast.error (`Ошибка : ${error.message}`, toastConfig)
      } else {
        toast.error ('Что-то пошло не так: ' + error.message, toastConfig)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit (onSubmit)}>
        <div className="modalWindow__title">
          Редактировать CPM
          <Close
            className="modalWindow__title__button"
            onClick={() => setShowModalEditAdmin (false)}
          />
        </div>

        <div className="modalWindow">
          <div className="modalWindow">
            <div className="modalWindow__wrapper_input">
              <InputUI
                type="text"
                placeholder="Название компании"
                autoComplete="off"
                register={register}
                name="name"
                errors={errors.name}
                marginRight="10px"
              />

              <InputUI
                type="text"
                placeholder="998()###-##-##"
                autoComplete="off"
                register={register}
                name="phone_number"
                errors={errors.phone_number}
              />
            </div>
            <div className="modalWindow__wrapper_input">
              <InputUI
                type="text"
                placeholder="Email"
                autoComplete="off"
                register={register}
                name="email"
                errors={errors.email}
                pattern={/^\S+@\S+$/i}
                message="Введите корректный адрес электронной почты"
                inputWidth="inputSmall"
                marginRight="10px"
              />

              <InputUI
                type="text"
                placeholder="Комиссия"
                autoComplete="off"
                register={register}
                name="commission_rate"
                errors={errors.commission_rate}
              />
            </div>
          </div>

          <div className={style.btn__wrapper}>
            <button
              style={{display: 'flex', alignItems: 'center'}}
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
