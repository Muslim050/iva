import React from 'react'
import FormatterView from '../../../UI/formatter/FormatterView'
import style from './BindingInventoryOrderTable.module.scss'
import { ReactComponent as ArrowR } from '../../../../assets/arrow-right.svg'
import { ReactComponent as Link } from '../../../../assets/link.svg'
import { ReactComponent as File } from 'src/assets/Table/file.svg'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'
import { ReactComponent as Send } from 'src/assets/Table/Send.svg'
import CircularBadge from 'src/components/UI/Circular/CircularBadge'

function BindingInventoryOrderTableData({
  sortedData,
  onInventoryConfirmByChannel,
}) {
  const role = localStorage.getItem('role')

  return (
    <>
      {sortedData().map((inventar, index) => (
        <tr>
          <td>{index + 1}</td>

          <td>
            {(inventar.assigned_order.format === 'preroll' && 'Pre-roll') ||
              ('mixroll' && 'Mix-roll')}
          </td>
          <td>
            <FormatterView
              data={inventar.assigned_order.expected_number_of_views}
            />
          </td>

          <td>
            {new Date(inventar.assigned_order.expected_start_date)
              .toLocaleDateString('en-GB')
              .substr(0, 10)}
          </td>
          <td>
            {new Date(inventar.assigned_order.expected_end_date)
              .toLocaleDateString('en-GB')
              .substr(0, 10)}
          </td>

          <td>
            <div style={{ display: 'flex' }}>
              {' '}
              <a
                href={inventar.assigned_order.promo_file}
                className={style.fileWrapper}
                target="_blank"
                rel="noreferrer"
              >
                Ролик
                <File
                  style={{ width: '18px', height: '18px', marginLeft: '5px' }}
                />
              </a>
            </div>
          </td>

          {role === 'admin' ||
          inventar.status === 'booked' ||
          inventar.status === 'pre_booked' ? (
            <td>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  position: 'relative',
                }}
              >
                {sortedData().status === 'booked' ||
                inventar.status === 'pre_booked' ? (
                  <ButtonBorder
                    onClick={() =>
                      onInventoryConfirmByChannel(inventar.assigned_order.id)
                    }
                  >
                    <Send
                      style={{
                        width: '16px',
                        height: '16px',
                        marginRight: '5px',
                      }}
                    />
                    Подтвердить
                    {inventar.status === 'pre_booked' ? (
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
                    ) : (
                      ''
                    )}
                  </ButtonBorder>
                ) : (
                  ''
                )}
              </div>
            </td>
          ) : (
            ''
          )}
        </tr>
      ))}
    </>
  )
}

export default BindingInventoryOrderTableData
