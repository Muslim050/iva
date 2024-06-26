import React from 'react'
import style from './TableInventory.module.scss'
import CircularTable from 'src/components/UI/Circular/CircularTable'
import CircularBadge from 'src/components/UI/Circular/CircularBadge'
import FormatterView from '../../../UI/formatter/FormatterView'
import {ReactComponent as Arrow} from 'src/assets/Table/arrow.svg'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'
import {ReactComponent as Edit} from 'src/assets/Table/Edit.svg'
import {ReactComponent as LinkVideo} from 'src/assets/linkVideo.svg'
import {showModalVideoLinked} from "../../../../redux/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import ModalUI from "../../../UI/ModalComponents/ModalUI/ModalUI";
import TableLinkedVideo from "../../Video/TableVideo/TableLinkedVideo/TableLinkedVideo";
import {AnimatePresence} from "framer-motion";
import {ReactComponent as Link} from 'src/assets/link.svg'

function OpenTableSentOrderData ({
                                   data,

                                 }) {
  const user = localStorage.getItem ('role')
  const [expandedRows, setExpandedRows] = React.useState ('')
  const [activeTooltip, setActiveTooltip] = React.useState (null)
  const [activeTooltipp, setActiveTooltipp] = React.useState (null)
  const dispatch = useDispatch ()
  const {showVideoLinked} = useSelector ((state) => state.modal)
  const [id, setId] = React.useState (null)

  const handleRowClick = (id) => {
    setExpandedRows (id === expandedRows ? false : id)
  }
  const linkedVideo = (id) => {
    dispatch (showModalVideoLinked ())
    inventoryPublish (id)
  }
  const inventoryPublish = (id) => {
    setId (id)
  }
  return (
    <>
      <AnimatePresence>
        {showVideoLinked && (
          <ModalUI>
            <TableLinkedVideo selectedId={id}/>
          </ModalUI>
        )}
      </AnimatePresence>
      {data.map ((inventor, i) => (
        <>
          <tr className={style.table__tr}>
            <td className={style.table_td}>
              <div style={{display: 'flex'}}>
                <div>{i + 1}</div>
                {user === 'publisher' || user === 'channel' ? (
                  <>
                    {inventor.status === 'pre_booked' ? (
                      <CircularTable/>
                    ) : null}
                  </>
                ) : null}

                {user === 'admin' ? (
                  <>{inventor.status === 'open' ? <CircularTable/> : null}</>
                ) : null}
              </div>
            </td>
            <td
              style={{position: 'relative'}}
              className={style.table_td}
              onMouseEnter={() => setActiveTooltip (i)}
              onMouseLeave={() => setActiveTooltip (null)}
            >
              {inventor.channel === null ? '' : inventor.channel.name}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID:{inventor?.id}
                </span>
              )}
            </td>

            <td
              style={{position: 'relative'}}
              className={style.table_td}
              onMouseEnter={() => setActiveTooltip (i)}
              onMouseLeave={() => setActiveTooltip (null)}
            >
              {inventor.video_content?.name}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID:{inventor.video_content?.id}
                </span>
              )}
            </td>
            {/**/}
            <td className={style.table_td} style={{color: 'blue'}}>
              {(inventor.format === 'preroll' && 'Pre-roll') ||
                (inventor.format === 'midroll1' && 'Mid-roll 1') ||
                (inventor.format === 'midroll2' && 'Mid-roll 2') ||
                (inventor.format === 'midroll3' && 'Mid-roll 3') ||
                (inventor.format === 'midroll4' && 'Mid-roll 4')}
            </td>

            <td className={style.table_td}>
              <FormatterView data={inventor.online_views}/>
            </td>

            <td className={style.table_td}>
              {inventor.video_content?.category}
            </td>
            <td className={style.table_td}>
              {new Date (inventor.video_content?.publication_time)
                .toLocaleDateString ('en-GB')
                .replace (/\//g, '.')}
            </td>
            <td className={style.table_td}>
              {inventor.video_content.link_to_video === null ? (
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className={style.linkVideo}
                  onClick={() => linkedVideo (inventor.id)}
                >
                  <LinkVideo
                    style={{
                      width: '25px',
                      height: '25px',
                      marginRight: '5px',
                    }}
                  />
                  Прикрепить Видео
                </button>
              ) : (
                <a
                  href={inventor.video_content.link_to_video}
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className={style.linkFile}
                  rel="noreferrer"
                >
                  <Link
                    style={{
                      width: '25px',
                      height: '25px',
                      marginRight: '5px',
                    }}
                  />
                  Ссылка на Видео
                </a>
              )}

            </td>

            {inventor.status === 'pre_booked' ||
            inventor.status === 'booked' ? (
              <td className={style.table_td}>
                <button
                  className={style.dopBtn}
                  onClick={() => handleRowClick (inventor.id)}
                  style={{position: 'relative'}}
                >
                  Открыть
                  <span className={style.arrow}>
                    <Arrow
                      className={`${style.arrow__icon} ${
                        expandedRows === inventor.id ? style.arrow__rotate : ''
                      }`}
                    />
                  </span>
                  {inventor.status === 'pre_booked' ? (
                    <CircularBadge
                      style={{
                        backgroundColor: '#ff7d00',
                        color: '#4833d0',
                        width: '15px',
                        height: '15px',
                        top: '-5px',
                        right: '-5px',
                      }}
                    />
                  ) : null}
                </button>
              </td>
            ) : null}

            <td>
              {(user === 'admin' ||
                user === 'advertiser' ||
                user === 'advertising_agency') &&
              inventor.status === 'open' ? (
                <ButtonBorder

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
          </tr>


        </>
      ))}
    </>
  )
}

export default OpenTableSentOrderData
