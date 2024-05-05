import React from 'react'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {addAdvertiser} from 'src/redux/advertiser/advertiserSlice'
import {useForm} from 'react-hook-form'
import {toastConfig} from 'src/utils/toastConfig'
import InputUI from 'src/components/UI/InputUI/InputUI'
import SelectUI from 'src/components/UI/SelectUI/SelectUI'
import {hideModalAdvertiser} from 'src/redux/modalSlice'
import {ButtonModal} from 'src/components/UI/ButtonUI/ButtonUI'
import {ReactComponent as Close} from 'src/assets/Modal/Close.svg'
import backendURL from 'src/utils/url'

export default function AdvertiserModal () {
  const [advertiserModal, setAdvertiserModal] = React.useState ([])
  const [cpm, setCpm] = React.useState ([])
  const role = localStorage.getItem ('role')

  const dispatch = useDispatch ()
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    control,
    setValue,
  } = useForm ({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      agency: '',
      cpm_mixroll: '',
      cpm_preroll: '',
    },
    mode: 'onBlur',
  })

  const fetchAdvertiser = async () => {
    const token = localStorage.getItem ('token')
    const response = await axios.get (
      `${backendURL}/advertiser/advertising-agency/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setAdvertiserModal (response.data.data)
  }
  const fetchCpm = async () => {
    const token = localStorage.getItem ('token')

    const response = await axios.get (
      `${backendURL}/order/cpm/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setCpm (response.data.data)
    setValue ('cpm_mixroll', response.data.data.mixroll)
    setValue ('cpm_preroll', response.data.data.preroll)
  }

  React.useEffect (() => {
    fetchAdvertiser ()
  }, [])

  React.useEffect (() => {
    fetchCpm ()
  }, [])

  const onSubmit = (data) => {
    const adv = dispatch (addAdvertiser ({data}))
    if (adv) {
      toast.success ('Рекламадатель успешно создан!', toastConfig)
      dispatch (hideModalAdvertiser ())
      setTimeout (() => {
        window.location.reload ()
      }, 1500)
    } else {
      toast.error ('Что то пошло не так!', toastConfig)
    }
  }
  const handleButtonClick = () => {
    dispatch (hideModalAdvertiser ())
  }

  return (
    <>
      <form onSubmit={handleSubmit (onSubmit)}>
        <div className="modalWindow__title">
          Cоздать рекламодателя
          <Close
            className="modalWindow__title__button"
            onClick={handleButtonClick}
          />
        </div>
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
              name="phone"
              errors={errors.phone}
            />
          </div>

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
          />

          {
            role === 'admin' && <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
                  CPM_Preroll
                </label>
                <InputUI
                  type="text"
                  autoComplete="off"
                  register={register}
                  name="cpm_preroll"
                  errors={errors.cpm_preroll}
                />
              </div>

              <div>
                <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
                  CPM_Mixroll
                </label>
                <InputUI
                  type="text"
                  autoComplete="off"
                  register={register}
                  name="cpm_mixroll"
                  errors={errors.cpm_mixroll}
                />
              </div>
            </div>
          }


          <SelectUI
            label="Рекламное агенство"
            options={advertiserModal}
            register={register ('agency')}
            error={errors?.advertiser?.message}
            inputWidth
          />

          <div style={{display: 'flex', justifyContent: 'end'}}>
            <ButtonModal isValid={true} disabled={!isValid}>
              Создать
            </ButtonModal>
          </div>
        </div>
      </form>
    </>
  )
}
