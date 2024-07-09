import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchOrder, setOrderStatus} from '../../../../redux/order/orderSlice'
import {fetchViewStatus, finishOrder,} from '../../../../redux/orderStatus/orderStatusSlice'
import FormatterBudjet from '../../../UI/formatter/FormatterBudjet'
import style from './OrderTable.module.scss'
import {ReactComponent as Arrow} from 'src/assets/Table/arrow.svg'
import {ReactComponent as Finish} from 'src/assets/Table/Finish.svg'
import {ReactComponent as Chart} from 'src/assets/Table/Chart.svg'
import {ReactComponent as Edit} from 'src/assets/Table/Edit.svg'
import {ReactComponent as Comment} from 'src/assets/Table/comment.svg'
import {ReactComponent as Video} from 'src/assets/Table/video.svg'
import MyModal from '../../../UI/ModalComponents/ModalUI/ModalUI'
import AdvertStatus from 'src/components/UI/AdvertStatus/AdvertStatus'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'
import {toastConfig} from 'src/utils/toastConfig'
import {toast} from 'react-toastify'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import CircularTable from 'src/components/UI/Circular/CircularTable'
import CircularBadge from 'src/components/UI/Circular/CircularBadge'
import PaymentOrderModal from '../PaymentOrderModal/PaymentOrderModal'
import {AnimatePresence} from 'framer-motion'
import OrderPayment from '../components/OrderPayment'
import EditOrderModal from '../EditOrderModalAdmin/EditOrderModal'
import CommentModal from '../CommentModal/CommentModal'
import {useNavigate} from 'react-router-dom'
import BindingOrderModal from '../OpenOrder/OpenOrderTable'
import {formatDate} from "../../../../utils/formatterDate";

function OrderData ({sortedData}) {
  const dispatch = useDispatch ()
  const [expandedRows, setExpandedRows] = React.useState ('')
  const role = localStorage.getItem ('role')
  const [currentOrder, setCurrentOrder] = React.useState (null)
  const [showModalEdit, setShowModalEdit] = React.useState (false)
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState (false)
  const [showKomment, setShowKomment] = React.useState (false)
  const navigate = useNavigate ()
  const [activeTooltip, setActiveTooltip] = React.useState (null)

  const {showPayment} = useSelector ((state) => state.modal)
  const {currentOrder: updatedOrder} = useSelector ((state) => state.status);

  // const fetchGetOrder = async (id) => {
  //   const token = localStorage.getItem ("token");
  //   const url = `${backendURL}/order/${id}/`;
  //
  //   try {
  //     const response = await axios.get (url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //
  //     setCurrentOrder (response.data); // Update local state with fetched order data
  //     dispatch (setCurrentOrder (response.data)); // Update Redux state if needed
  //   } catch (error) {
  //     console.error ("Failed to fetch order:", error);
  //   }
  // };

  // React.useEffect (() => {
  //   if (expandedRows && typeof expandedRows === 'number') {
  //     fetchGetOrder (expandedRows)
  //   }
  // }, [dispatch])

  console.log (expandedRows);


  const handleRowClick = (id) => {
    setExpandedRows (id === expandedRows ? false : id);
    const item = sortedData ().find ((item) => item.id === id);
    if (item && item.status === "sent") {
      dispatch (fetchViewStatus (id)).then ((result) => {
        if (result.type === fetchViewStatus.fulfilled.toString ()) {
          dispatch (setOrderStatus ({orderId: id, status: "accepted"}));
        }
      });
    } else {
      // setTimeout (() => fetchGetOrder (id), 2000); // Fetch the specific order directly after 2 seconds if the status is not "sent"
    }
  };


  const handleFinishOrder = (id) => {
    const confirmFinish = window.confirm (
      'Вы уверены, что хотите финишировать заказ?',
    )
    if (confirmFinish) {
      dispatch (finishOrder ({id})).then (() => {
        dispatch (fetchOrder ())
      })
    } else {
      toast.info ('Операция отменена', toastConfig)
      dispatch (fetchOrder ())
    }
  }

  //
  // React.useEffect (() => {
  //   fetchOrder ()
  // }, [dispatch])


  const redirectToTariffDetails = React.useCallback (
    (advert) => {
      navigate (`/chart-order-table/${advert.id}`, {state: {advert}})
    },
    [navigate],
  )
  return (
    <>
      <AnimatePresence>
        {showModalEditAdmin && (
          <MyModal>
            <EditOrderModal
              setShowModalEditAdmin={setShowModalEditAdmin}
              currentOrder={currentOrder}
            />
          </MyModal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPayment && (
          <MyModal>
            <PaymentOrderModal/>
          </MyModal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKomment && (
          <MyModal>
            <CommentModal
              setShowKomment={setShowKomment}
              currentOrder={currentOrder}
            />
          </MyModal>
        )}
      </AnimatePresence>

      {sortedData ().map ((advert, i) => {
        return (
          <>
            <tr key={advert.id} className={style.tr_Order}>
              <td className={style.td_Order}>
                <div style={{display: 'flex'}}>
                  <div>{i + 1}</div>
                  {role === 'advertiser' || role === 'advertising_agency' ? (
                    <>
                      {advert.status === 'in_progress' ? (
                        <CircularTable/>
                      ) : null}
                    </>
                  ) : null}

                  {role === 'admin' && (
                    <>{advert.status === 'sent' || advert.status === 'in_review' || advert.status === 'accepted' ?
                      <CircularTable/> : null}</>
                  )}
                </div>
              </td>
              <td
                style={{position: 'relative'}}
                className={style.td_Order}
                onMouseEnter={() => setActiveTooltip (i)}
                onMouseLeave={() => setActiveTooltip (null)}
              >
                {advert.name}
                {role === 'admin' && (
                  <span
                    className={
                      activeTooltip === i ? style.tooltiptext : style.hidden
                    }
                  >
                    ID:{advert.id}
                  </span>
                )}
              </td>
              <td className={style.td_Order}>
                <div style={{display: 'flex'}}>
                  <a
                    href={advert.promo_file}
                    target="_blank"
                    className={style.fileWrapper}
                    rel="noreferrer"
                  >
                    <Video
                      style={{
                        width: '32px',
                        height: '32px',
                      }}
                    />
                  </a>
                </div>
              </td>
              <td
                className={style.td_Order}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                }}
              >
                <div>
                  {(advert.format === 'preroll' && 'Pre-roll') ||
                    ('mixroll' && 'Mix-roll')}
                </div>

                <div
                  style={{
                    marginLeft: '2px',
                    fontSize: '15px',
                    background: '#606afc',
                    padding: '0px 4px',
                    borderRadius: '10px',
                    color: 'white',
                  }}
                >
                  {advert.target_country}
                </div>
              </td>
              <td className={style.td_Order}>
                {new Date (advert.expected_start_date)
                  .toLocaleDateString ('en-GB')
                  .replace (/\//g, '.')}
              </td>
              <td className={style.td_Order}>
                {new Date (advert.expected_end_date)
                  .toLocaleDateString ('en-GB')
                  .replace (/\//g, '.')}
              </td>
              <td className={style.td_Order}>
                {advert.status === 'finished' ? (
                  <FormatterView data={advert.online_views}/>
                ) : (
                  <FormatterView data={advert.expected_number_of_views}/>
                )}
              </td>

              <td className={style.td_Order}>
                <div style={{display: 'flex'}}>
                  <FormatterBudjet
                    budget={advert.budget}
                    data={advert.expected_start_date}
                  />
                </div>
              </td>

              <td className={style.td_Order}>
                <AdvertStatus status={advert.status}>
                  {role === 'admin' ||
                  role === 'advertising_agency' ||
                  role === 'advertiser' ? (
                    <>
                      {role === 'admin' ||
                      role === 'advertising_agency' ||
                      role === 'advertiser' ? (
                        <>
                          {advert.status === 'in_progress' ? (
                            <div
                              style={{
                                display: (() => {
                                  const ratie = Math.floor (
                                    (advert.online_views /
                                      advert.expected_number_of_views) *
                                    100,
                                  )
                                  if (ratie >= 1) {
                                    return 'initial'
                                  }
                                  return 'none'
                                }) (),
                                padding: '1px 5px',
                                borderRadius: '7px',
                                fontWeight: '600',
                                background: (() => {
                                  const ratie = Math.floor (
                                    (advert.online_views /
                                      advert.expected_number_of_views) *
                                    100,
                                  )

                                  if (ratie >= 100) {
                                    return '#ec2020'
                                  } else if (ratie >= 80) {
                                    return '#fd8b00'
                                  } else if (ratie >= 50) {
                                    return 'rgba(50, 147, 111, 0.16)'
                                  } else if (ratie >= 1) {
                                    return 'rgb(86 112 241)'
                                  }
                                  return 'inherit'
                                }) (),

                                color: (() => {
                                  const ratio =
                                    (advert.online_views /
                                      advert.expected_number_of_views) *
                                    100

                                  if (ratio >= 100) {
                                    return '#f8f8f8'
                                  } else if (ratio >= 80) {
                                    return '#764306'
                                  } else if (ratio >= 50) {
                                    return '#047f27'
                                  } else if (ratio >= 1) {
                                    return 'rgb(228 232 253)'
                                  }
                                  return 'inherit'
                                }) (),
                              }}
                            >
                              {advert.online_views > 0 &&
                                Math.floor (
                                  (advert.online_views /
                                    advert.expected_number_of_views) *
                                  100,
                                ) +
                                ' ' +
                                '%'}
                            </div>
                          ) : null}

                          {advert.status === 'finished' ? (
                            <div
                              style={{
                                display: 'initial',
                                padding: '1px 4px',
                                borderRadius: '7px',
                                background: 'rgb(156 81 81)',
                                color: '#eedede',
                                marginLeft: '10px',
                              }}
                            >
                              100%
                            </div>
                          ) : null}
                        </>
                      ) : null}
                    </>
                  ) : null}
                </AdvertStatus>
              </td>

              <td className={style.td_Order}>
                {advert.is_paid === true ? (
                  <div></div>
                ) : (
                  <FormatterView
                    data={advert.expected_number_of_views - advert.online_views}
                  />
                )}
              </td>

              <td className={style.td_Order}>
                <div className={style.btn_container}>
                  {advert.status === 'in_progress' ||
                  advert.status === 'finished' ? (
                    <div
                      // to={`/chart-order-table/${advert.id}`}
                      onClick={() => redirectToTariffDetails (advert)}
                      style={{display: 'contents'}}
                    >
                      <button
                        className={style.dopBtnChart}
                        style={{marginRight: '5px'}}
                      >
                        <Chart style={{width: '25px', height: '25px'}}/>
                      </button>
                    </div>
                  ) : (
                    <>
                      {role === 'advertising_agency' ||
                      role === 'advertiser' ? (
                        ''
                      ) : (
                        <div style={{width: '42px', height: '33px'}}></div>
                      )}
                    </>
                  )}

                  {role === 'admin' ||
                  ((role === 'advertiser' || role === 'advertising_agency') &&
                    advert.status === 'in_progress') ||
                  advert.status === 'finished' ? (
                    <button
                      className={style.dopBtn}
                      onClick={() => handleRowClick (advert.id)}
                    >
                      {expandedRows === advert.id ? 'Закрыть' : 'Открыть'}

                      <span className={style.arrow}>
                        <Arrow
                          className={`${style.arrow__icon} ${
                            expandedRows === advert.id
                              ? style.arrow__rotate
                              : ''
                          }`}
                        />
                        {advert.inventories.filter (
                          (item) =>
                            item.video_content.link_to_video &&
                            item.status === 'booked',
                        ).length > 0 ? (
                          <CircularBadge
                            style={{
                              backgroundColor: '#d0c9fa',
                              color: '#4833d0',
                              width: '20px',
                              height: '20px',
                            }}
                            count={
                              advert.inventories.filter (
                                (item) =>
                                  item.video_content.link_to_video &&
                                  item.status === 'booked',
                              ).length
                            }
                          />
                        ) : (
                          <>
                            {advert.status === 'in_review' &&
                            advert.inventories.filter (
                              (item) => item.status === 'booked',
                            ).length > 0 ? (
                              <CircularBadge
                                style={{
                                  backgroundColor: '#ff7d00',
                                  width: '15px',
                                  height: '15px',
                                }}
                                count={advert.status === 'booked'}
                              />
                            ) : (
                              ''
                            )}
                          </>
                        )}
                        {advert.status === 'booked' ? (
                          <CircularBadge
                            style={{
                              backgroundColor: '#ff7d00',
                              width: '15px',
                              height: '15px',
                            }}
                            count={advert.status === 'booked'}
                          />
                        ) : (
                          ''
                        )}
                      </span>
                    </button>
                  ) : null}

                  {role === 'admin' && advert.status === 'in_progress' ? (
                    <ButtonBorder onClick={() => handleFinishOrder (advert.id)}>
                      {(advert.online_views / advert.expected_number_of_views) *
                        100 >=
                        100 && (
                          <CircularBadge
                            style={{
                              backgroundColor: 'red',
                              width: '15px',
                              height: '15px',
                            }}
                          />
                        )}
                      <Finish
                        style={{
                          width: '17px',
                          height: '17px',
                          marginRight: '5px',
                        }}
                      />
                      Завершить
                    </ButtonBorder>
                  ) : (
                    ''
                  )}

                  {advert.status === 'finished' ? (
                    <td
                      className={style.td_Order}
                      style={{
                        display: 'contents',
                      }}
                    >
                      <div>
                        <div style={{display: 'flex', width: '100px'}}>
                          {advert.actual_end_date === null
                            ? null
                            : formatDate (advert.actual_end_date)}
                        </div>
                        <div>
                          {new Date (advert.actual_end_date).toLocaleTimeString (
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )}
                        </div>
                      </div>
                    </td>
                  ) : (
                    ''
                  )}

                  <td style={{display: 'contents'}}>
                    {(role === 'admin' ||
                      role === 'advertiser' ||
                      role === 'advertising_agency') &&
                    advert.status === 'accepted' ? (
                      <ButtonBorder
                        onClick={() => {
                          setShowModalEditAdmin (true)
                          setCurrentOrder (advert)
                        }}
                      >
                        <Edit
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </ButtonBorder>
                    ) : null}
                  </td>

                  {advert.status === 'in_progress' ||
                  advert.status === 'finished' ? null : (
                    <td style={{display: 'contents'}}>
                      {advert?.notes ? (
                        <ButtonBorder
                          onClick={() => {
                            setShowKomment (true)
                            setCurrentOrder (advert)
                          }}
                        >
                          <Comment
                            style={{
                              width: '16px',
                              height: '16px',
                            }}
                          />
                        </ButtonBorder>
                      ) : null}
                    </td>
                  )}
                </div>
              </td>
              <td style={{display: 'inline-block'}}>
                {role === 'admin' ? (
                  <>
                    <OrderPayment advert={advert}/>
                  </>
                ) : null}
              </td>
            </tr>

            {expandedRows === advert.id && (
              <tr className={style.doprow}>
                <td
                  colSpan="12"
                  className={`${style.list__item} ${
                    expandedRows === advert.id ? style.list__item__open : ''
                  }`}
                >
                  <BindingOrderModal
                    expandedRows={expandedRows}
                    statusOr={advert.status}
                    advert={advert}
                  />
                </td>
              </tr>
            )}
          </>
        )
      })}
    </>
  )
}

export default OrderData
