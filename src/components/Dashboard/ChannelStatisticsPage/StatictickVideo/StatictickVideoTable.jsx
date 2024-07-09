import React from 'react'
import style from './StatictickVideoTable.module.scss'
import WrapperThead from './components/DopTable/Thead/WrapperThead'
import StatictickVideoThead from './components/StatictickVideoThead'
import StatictickVideoData from './components/StatictickVideoData'
import TheadAgeGenderGeo from './components/TheadAgeGenderGeo'
import GenderData from './components/DopTable/Data/GenderData'
import AgeData from 'src/components/Dashboard/OrderChartTable/components/DopTable/Data/AgeData'
import GeoData from 'src/components/Dashboard/OrderChartTable/components/DopTable/Data/GeoData'

function StatictickVideoTable ({data, loading}) {
  const [expandedRows, setExpandedRows] = React.useState ('')

  const handleRowClick = (videoLink) => {
    setExpandedRows ((prevExpandedRow) =>
      prevExpandedRow === videoLink ? '' : videoLink,
    )
  }
  const genders = []
  data &&
  data.forEach ((statistic) => {
    statistic.gender_percentages.forEach ((gen) => {
      if (!genders.includes (gen.gender)) {
        genders.push (gen.gender)
      }
    })
  })
  return (
    <>
      <div className="tableWrapper" style={{marginTop: '20px'}}>
        <div className="tableWrapper__table_title">
          <div style={{display: 'flex', alignItems: 'center'}}>
            Статистика видео
          </div>
        </div>

        {loading ? (
          <div className="loaderWrapper" style={{height: '20vh'}}>
            <div style={{color: 'var(--text-color, )'}}>
              {' '}
              Загрузка статистики &nbsp;
            </div>
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Видео отсуствуют или нужно обновить токен канала
              </div>
            ) : (
              <table className="tableWrapper">
                {/* Верхние столбцы */}
                <thead>
                <StatictickVideoThead/>
                </thead>
                {/* Верхние столбцы */}

                <tbody>
                {data &&
                  data.map ((statistic, index) => (
                    <>
                      {/* Данные основной таблицы */}
                      <tr>
                        <StatictickVideoData
                          statistic={statistic}
                          index={index}
                          handleRowClick={handleRowClick}
                          isExpanded={expandedRows === statistic.video_link}
                        />
                      </tr>
                      {/* Данные основной таблицы */}

                      {expandedRows === statistic.video_link && (
                        <tr
                          className={`${style.doprow} ${style.list__item__open}`}
                        >
                          <td
                            colSpan="5"
                            className={`${style.list__item} ${
                              expandedRows === statistic.video_link
                                ? style.list__item__open
                                : ''
                            }`}
                          >
                            <div className="tableWrapper">
                              {statistic.age_group_percentages.length === 0 &&
                              statistic.gender_percentages.length === 0 &&
                              statistic.geo_percentages.length === 0 ? (
                                <div
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: '15px',
                                    color: '#fa8a00',
                                    textAlign: 'center',
                                  }}
                                >
                                  Введется аналитика данных
                                </div>
                              ) : (
                                <table className="tableWrapper">
                                  {/* Колонки  ГЕО Возраст ПОЛ доп таблица  */}
                                  <thead style={{border: 0}}>
                                  <tr>
                                    <TheadAgeGenderGeo data={data}/>
                                  </tr>
                                  </thead>
                                  {/* Колонки  ГЕО Возраст ПОЛ доп таблица  */}

                                  {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
                                  <thead style={{borderTop: '0'}}>
                                  <tr className={style.tableChart__tr}>
                                    <WrapperThead statistic={statistic}/>
                                  </tr>
                                  </thead>
                                  {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}

                                  <GenderData statistic={statistic}/>
                                  <AgeData statistic={statistic}/>
                                  <GeoData statistic={statistic}/>
                                </table>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default StatictickVideoTable
