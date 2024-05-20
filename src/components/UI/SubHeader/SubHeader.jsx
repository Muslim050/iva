import React, { useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ReactComponent as Profile } from '../../../assets/Sidebar/Profile.svg'
import style from './SubHeader.module.scss'
import Breadcrumbs from './Breadcrumbs'
import getTitle from './RouteItems'
import ButtonTable from '../ButtonTable/ButtonTable'
import { useDispatch } from 'react-redux'
import {
  showModalAdvertiser,
  showModalChangePassword,
} from 'src/redux/modalSlice'
import { ReactComponent as Lock } from 'src/assets/Table/Lock.svg'

function SubHeader() {
  const route = useLocation().pathname.split('/').slice(1)
  // const { id } = useParams();

  const title = route[0]
  const id = route[1]
  const transformedTitle = getTitle(title, id)

  const username = localStorage.getItem('username')
  const [isTooltip, setIsTooltip] = React.useState(false)
  const tooltipRef = useRef(null)
  const profileWrapperRef = useRef(null)
  const dispatch = useDispatch()
  const handleChangePClick = () => {
    dispatch(showModalChangePassword())
  }

  const handleProfileClick = () => {
    setIsTooltip(!isTooltip)
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        profileWrapperRef.current &&
        !profileWrapperRef.current.contains(event.target)
      ) {
        setIsTooltip(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <section className={style.section}>
        <div className={style.subHeader}>
          <div className={style.subHeader__wrapper}>
            <div className={style.subHeader__sub__wrapper}>
              {transformedTitle}

              <div className={style.profile}>
                <div className={style.profile__username}>{username}</div>

                <div
                  ref={profileWrapperRef}
                  className={style.profile__wrapper}
                  onClick={handleProfileClick}
                >
                  <Profile style={{ width: '15px' }} />
                </div>
              </div>
              {isTooltip && (
                <div
                  ref={tooltipRef}
                  className={style.profile__wrapper__tooltip}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      lineHeight: '14px',
                      marginBottom: '10px',
                    }}
                  >
                    Пользователь
                  </div>
                  <ButtonTable onClick={handleChangePClick}>
                    <Lock
                      style={{
                        width: '18px',
                        height: '17px',
                        marginRight: '5px',
                      }}
                    />
                    Сменить пароль
                  </ButtonTable>
                </div>
              )}
            </div>

            <Breadcrumbs
              title={route[route.length - 1]}
              route={route}
              id={id}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default SubHeader
