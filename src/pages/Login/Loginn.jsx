import React from 'react'
import {ReactComponent as Email} from '../../assets/InputIcon/Message.svg'
import {ReactComponent as Lock} from '../../assets/InputIcon/Lock.svg'
import {ReactComponent as Show} from 'src/assets/InputIcon/Show.svg'
import {ReactComponent as Ulock} from 'src/assets/InputIcon/Ulock.svg'
import Eclipse from 'src/assets/Site/Ellipse.png'

import {useDispatch} from 'react-redux'
import {login} from '../../redux/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'
import style from './Login.module.scss'
import {toastConfig} from 'src/utils/toastConfig'

function Login () {
  const dispatch = useDispatch ()
  let navigate = useNavigate ()
  const [isLogin, setIsLogin] = React.useState (false)
  const [showPasswordOld, setShowPasswordOld] = React.useState (false)

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm ({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
  })
  const handleTogglePasswordOld = () => {
    setShowPasswordOld (!showPasswordOld)
  }
  const onSubmit = async (data) => {
    try {
      setIsLogin (true)

      const logindata = await dispatch (login ({data}))
      if (logindata.payload) {
        const role = localStorage.getItem ('role')
        const routesByRole = {
          admin: '/order',
          publisher: '/sents-order',
          channel: '/sents-order',
          advertiser: '/order',
          guest: '/login',
          advertising_agency: '/order',
        }
        const redirectRoute = role ? routesByRole[role] : routesByRole.guest
        navigate (redirectRoute)
      }

      setIsLogin (false)
    } catch (error) {
      setIsLogin (false)

      toast.error (
        'Ошибка при входе. Пожалуйста, попробуйте снова.',
        toastConfig,
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit (onSubmit)}>
        <div className={style.login}>
          <img className={style.eclipse_1} src={Eclipse} alt=""/>
          <img className={style.eclipse_2} src={Eclipse} alt=""/>

          <div className={style.login__wrapper}>
            <div className={style.login__wrapper__table_header}>
              <div className={style.login__wrapper__table_title}>
                BRANDFORMANCE
              </div>
              <div className={style.login__wrapper__table_subtitle}>
                Войти в систему
              </div>
            </div>

            <div>
              <div
                className={style.modalWindow}
                style={{marginBottom: '40px'}}
              >
                <div className={style.inputContainer}>
                  <div className={style.inputIcon}>
                    <Email/>
                  </div>
                  <input
                    className={style.modalWindow__input}
                    type="text"
                    placeholder="Логин"
                    autoComplete="off"
                    {...register ('login', {
                      required: 'Поле обезательно к заполнению',
                    })}
                  />

                  <span className={style.modalWindow__input_error}>
                    {errors?.login && <p>{errors?.login?.message}</p>}
                  </span>
                </div>
              </div>

              <div
                className={style.modalWindow}
                style={{marginBottom: '80px'}}
              >
                <div className={style.inputContainer}>
                  <div className={style.inputIcon}>
                    <Lock/>
                  </div>
                  <input
                    className={style.modalWindow__input}
                    type={showPasswordOld ? 'text' : 'password'}
                    placeholder="Пароль"
                    autoComplete="off"
                    {...register ('password', {
                      required: 'Поле обезательно к заполнению',
                    })}
                  />
                </div>

                <span className={style.modalWindow__input_error}>
                  {errors?.password && <p>{errors?.password?.message}</p>}
                </span>
                <div
                  onClick={handleTogglePasswordOld}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '15px',
                    cursor: 'pointer',
                  }}
                >
                  {showPasswordOld ? (
                    <Ulock style={{width: '20px', height: '20px'}}/>
                  ) : (
                    <Show style={{width: '20px', height: '20px'}}/>
                  )}
                </div>
              </div>

              {/* <ButtonUI isValid={true} disabled={!isValid}>
                Войти
              </ButtonUI> */}
              <div className={style.btn__wrapper}>
                <button
                  style={{display: 'flex', alignItems: 'center'}}
                  type="submit"
                  disabled={!isValid || isLogin}
                  className={
                    isValid && !isLogin
                      ? style.btn__wrapper__btn
                      : style.btn__wrapper__disabled
                  }
                >
                  {isLogin ? (
                    <>
                      <span>Войти</span>
                      <div className={style.loaderWrapper}>
                        <div className={style.spinner}></div>
                      </div>
                    </>
                  ) : (
                    <span>Войти</span>
                  )}
                </button>
              </div>
              {/* <ButtonUI isValid={true} disabled={!isValid}>
                Войти
              </ButtonUI> */}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
