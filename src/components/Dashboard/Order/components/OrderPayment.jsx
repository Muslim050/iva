import React from 'react'
import { useDispatch } from 'react-redux'
import style from '../OrderTable/OrderTable.module.scss'
import { showModalPayment } from 'src/redux/modalSlice'
import { ReactComponent as Google } from 'src/assets/googleIcon.svg'
import { ReactComponent as NoPayment } from 'src/assets/noPayment.svg'
import { ReactComponent as SuccessPayment } from 'src/assets/successpayment.svg'
import { ReactComponent as Payment } from 'src/assets/payment.svg'

function OrderPayment({ advert }) {
  const dispatch = useDispatch()

  const [googleAu, setGoogleAu] = React.useState(false)
  const [channel, setChannel] = React.useState(false)
  const [showTooltip, setShowTooltip] = React.useState(false)

  return (
    <>
      {advert.status === 'finished' ? (
        // <td style={{ display: "0px" }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: advert.is_paid ? '#DEEEE8' : '#ffcece', // Измените цвет фона в зависимости от channel.is_connected
            padding: '3px',
            borderRadius: '12px',
            boxShadow: advert.is_paid ? '0 0 4px #519C66' : '0 0 4px #FF0000',
            border: advert.is_paid ? '1px solid #519C66' : '1px solid #FF0000', // Измените цвет границы в зависимости от channel.is_connected
          }}
        >
          {advert.is_paid || (
            <div>
              {channel.is_connected === false ? (
                <button
                  className={style.btn__connect}
                  // onClick={() => authGoogle(channel.id)}
                >
                  ''
                </button>
              ) : (
                <button
                  className={style.btn__connectR}
                  onClick={() => dispatch(showModalPayment(advert))}
                >
                  <Payment style={{ width: '20px', height: '28px' }} />
                </button>
              )}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {advert.is_paid ? (
              <div
                className={style.table__status}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',

                    width: '100%',
                    justifyContent: 'center',
                    lineHeight: '6px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <SuccessPayment style={{ width: '28px', height: '28px' }} />
                </div>
                {showTooltip && (
                  <div className={style.tooltip}>
                    <div>{advert.payment_date.split('T')[0]}</div>

                    <div>
                      {new Date(advert.payment_date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NoPayment style={{ width: '28px', height: '28px' }} />
              </>
            )}

            {showTooltip && (
              <>
                {advert?.payment_date ? (
                  <div className={style.tooltip}>
                    {advert?.payment_date ? (
                      <>
                        <div>{advert?.payment_date?.split('T')[0]}</div>

                        <div>
                          {new Date(advert.payment_date).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      ) : (
        // </td>
        // <td style={{ display: "0px" }}>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: advert.is_paid ? '' : '#c6c6c6', // Измените цвет фона в зависимости от channel.is_connected
            padding: '3px',
            borderRadius: '12px',
            boxShadow: advert.is_paid ? '' : '0 0 4px grey',
            border: advert.is_paid ? '' : '1px solid grey', // Измените цвет границы в зависимости от channel.is_connected
            cursor: 'not-allowed',
          }}
        >
          {advert.is_paid || (
            <div>
              {channel.is_connected === false ? (
                <button className={style.btn__connect}>''</button>
              ) : (
                <button className={style.btn__connectRDis}>
                  <Payment style={{ width: '20px', height: '28px' }} />
                </button>
              )}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {advert.is_paid ? (
              <div
                className={style.table__status}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Оплачено{' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px',
                    width: '100%',
                    justifyContent: 'center',
                    lineHeight: '6px',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <div>{advert.payment_date.split('T')[0]}</div>
                    <br />
                    <div>
                      {new Date(advert.payment_date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <NoPayment style={{ width: '28px', height: '28px' }} />
              </>
            )}
          </div>
        </div>
        // </td>
      )}
    </>
  )
}

export default OrderPayment
