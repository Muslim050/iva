import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Eye } from 'src/assets/eye.svg'
import { googleAuth } from '../../../../redux/googleauth/googleauthSlice'
import { ReactComponent as Reload } from 'src/assets/Table/reload.svg'
import { ReactComponent as Add } from 'src/assets/Table/add.svg'
import { ReactComponent as Google } from 'src/assets/googleIcon.svg'
import style from './ChannelTable.module.scss'
import { fetchChannel } from '../../../../redux/channel/channelSlice'
import { Link } from 'react-router-dom'
import { showModalChannel } from 'src/redux/modalSlice'
import ButtonTable from 'src/components/UI/ButtonTable/ButtonTable'
import { SortButton } from 'src/utils/SortButton'
import { sortData } from 'src/utils/SortData'
import FormatterPhone from 'src/components/UI/formatter/FormatterPhone'
import { ReactComponent as Chart } from 'src/assets/Table/Chart.svg'
import CircularTable from 'src/components/UI/Circular/CircularTable'

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Канал' },
  { key: 'channel', label: 'Аналитика' },
  { key: 'publisher.name', label: 'Паблишер' },
  { key: 'email', label: 'Email' },
  { key: 'phone_number', label: 'Телефон' },
  { key: 'channel_id', label: 'ID канала' },
  { key: 'is_connected', label: 'Статус' },
]

function ChannelTable() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.channel.channel)
  const linkGoogle = useSelector((state) => state.googleAuth.authUrl)
  const [googleAu, setGoogleAu] = React.useState(false)
  const [sortKey, setSortKey] = React.useState('last_name')
  const [sort, setSort] = React.useState('ascn')
  const [connectG, setConnectG] = React.useState(data.is_connected)
  const user = localStorage.getItem('role')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchChannel()).then(() => setLoading(false))
  }, [dispatch])

  const authGoogle = (pubId) => {
    dispatch(googleAuth(pubId))
    setConnectG(false)
    setGoogleAu(true)
  }
  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: data,
        sortKey,
        reverse: sort === 'desc',
      }),
    [data, sortKey, sort],
  )
  function changeSort(key) {
    setSort(sort === 'ascn' ? 'desc' : 'ascn')
    setSortKey(key)
  }

  const handleButtonClick = () => {
    dispatch(showModalChannel())
  }

  const handleReload = () => {
    dispatch(fetchChannel())
  }

  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className="tableWrapper__table_title">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              Каналы &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: '23px', height: '23px' }} />
              </ButtonTable>
            </div>
            {user === 'channel' || user === 'publisher' ? (
              ''
            ) : (
              <ButtonTable onClick={handleButtonClick}>
                <Add style={{ width: '25px', marginRight: '12px' }} />
                Создать канал
              </ButtonTable>
            )}
          </div>
          {data && data.length ? (
            <table className="tableWrapper">
              <thead>
                <tr>
                  {headers.map((row) => {
                    const user = localStorage.getItem('role')
                    const showStatusColumn = user !== 'admin'
                    if (row.key === 'is_connected' && !showStatusColumn) {
                      return null
                    }
                    return (
                      <th key={row.key}>
                        <SortButton
                          row={row.label}
                          columnKey={row.key}
                          onClick={() => changeSort(row.key)}
                          sort={sort}
                          sortKey={sortKey}
                        />
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedData().map((channel, i) => (
                  <>
                    <tr key={channel.id}>
                      <td className={style.table_td}>
                        <div style={{ display: 'flex' }}>
                          <div>{i + 1}</div>
                          {user === 'publisher' ||
                          user === 'admin' ||
                          user === 'channel' ? (
                            <>
                              {channel.is_connected === false ? (
                                <CircularTable
                                  style={{
                                    backgroundColor: 'red',
                                  }}
                                />
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </td>
                      <td className={style.table_td}>{channel.name}</td>
                      <td className={style.table_td}>
                        <Link
                          to={`/statistics-channel/${channel.id}`}
                          style={{ display: 'contents' }}
                        >
                          <button className={style.dopBtnChart}>
                            <Chart style={{ width: '23px', height: '23px' }} />
                          </button>
                        </Link>
                      </td>
                      <td className={style.table_td}>
                        {channel.publisher && channel.publisher.name
                          ? channel.publisher.name
                          : '-------'}
                      </td>
                      <td className={style.table_td}>{channel.email}</td>
                      <td className={style.table_td}>
                        <FormatterPhone phoneNumber={channel.phone_number} />
                      </td>
                      <td className={style.table_td}>{channel.channel_id}</td>
                      {user === 'admin' ? (
                        ''
                      ) : (
                        <td className={style.table_td}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: channel.is_connected
                                ? '#DEEEE8'
                                : '#ffcece', // Измените цвет фона в зависимости от channel.is_connected
                              display: '-webkit-inline-box',
                              padding: '3px',
                              borderRadius: '12px',
                              boxShadow: channel.is_connected
                                ? '0 0 4px #519C66'
                                : '0 0 4px #FF0000',
                              border: channel.is_connected
                                ? '1px solid #519C66'
                                : '1px solid #FF0000', // Измените цвет границы в зависимости от channel.is_connected
                            }}
                          >
                            {googleAu || (
                              <div>
                                {channel.is_connected === false ? (
                                  <button
                                    className={style.btn__connect}
                                    onClick={() => authGoogle(channel.id)}
                                  >
                                    Подключится
                                  </button>
                                ) : (
                                  <button
                                    className={style.btn__connectR}
                                    onClick={() => authGoogle(channel.id)}
                                  >
                                    Переподключиться
                                  </button>
                                )}
                              </div>
                            )}
                            {googleAu && (
                              <a
                                href={linkGoogle}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <button className={style.btn__google}>
                                  <div className={style.btn__google__wrapper}>
                                    <Google
                                      style={{
                                        width: '30px',
                                        height: '25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    />
                                  </div>
                                </button>
                              </a>
                            )}
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              {channel.is_connected ? (
                                <div className={style.table__status}>
                                  Подключен
                                </div>
                              ) : (
                                <div className={style.table__tr_th_estatus}>
                                  Не Подключен
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      )}
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty_list">Список пустой. Добавьте Канал!</div>
          )}
        </div>
      )}
    </>
  )
}

export default ChannelTable
