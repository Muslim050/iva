import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortData } from 'src/utils/SortData'
import { fetchAdvertiserAgency } from '../../../../redux/AgencySlice/advertiserAgency/advertiserAgencySlice'
import { ReactComponent as Add } from 'src/assets/Table/add.svg'
import { ReactComponent as Reload } from 'src/assets/Table/reload.svg'

import { showModalAdvertiserAgency } from 'src/redux/modalSlice'
import { SortButton } from 'src/utils/SortButton'

import ButtonTable from 'src/components/UI/ButtonTable/ButtonTable'
import FormatterPhone from 'src/components/UI/formatter/FormatterPhone'
import style from './AdvertiserAgencyTable.module.scss'

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Наименование Компании ' },
  { key: 'email', label: 'Email' },
  { key: 'phone_number', label: 'Номер телефона' },
]

function AdvertiserAgencyTable() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.advertiserAgency.advertiserAgency)
  const [sortKey, setSortKey] = React.useState('last_name')
  const [sort, setSort] = React.useState('ascn')
  const [loading, setLoading] = React.useState(true)

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
    dispatch(showModalAdvertiserAgency())
  }
  const handleReload = () => {
    dispatch(fetchAdvertiserAgency())
  }

  React.useEffect(() => {
    dispatch(fetchAdvertiserAgency()).then(() => setLoading(false))
  }, [dispatch])

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
              Таблица рекламное агентство &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: '23px', height: '23px' }} />
              </ButtonTable>
            </div>

            <ButtonTable onClick={handleButtonClick}>
              <Add style={{ width: '25px', marginRight: '12px' }} />
              Создать агентство
            </ButtonTable>
          </div>
          {data.length ? (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  {headers.map((row) => {
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
                {sortedData().map((advert, i) => {
                  return (
                    <>
                      <tr key={advert.id}>
                        <td>{i + 1}</td>
                        <td>{advert.name}</td>
                        <td>{advert.email}</td>
                        <td>
                          <FormatterPhone phoneNumber={advert.phone_number} />
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty_list">
              Список пустой. Добавьте рекламное агентство!
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AdvertiserAgencyTable
