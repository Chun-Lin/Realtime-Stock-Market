import React from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import dayjs from 'dayjs'
import insert from 'ramda/src/insert'

import { useIntradayApi } from 'hooks'

const IntradayChart = () => {
  const utcOffsetSec = dayjs().utcOffset() * 60
  const intradayDate =
    utcOffsetSec >= 0
      ? dayjs()
          .subtract(1, 'day')
          .format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD')

  const marketStartTime = '13:30:00'
  const marketEndTime = '20:00:00'

  const queryParameters = {
    symbol: 'MMM',
    pageSize: 100,
    startDate: intradayDate,
    endDate: intradayDate,
    startTime: marketStartTime,
    endTime: marketEndTime,
  }

  const { intradayPrices, isError, isDone } = useIntradayApi(queryParameters)

  return (
    <>
      {isError === true ? <div>Something Wrong!!</div> : null}
      {isDone === false ? (
        <div>Loading...</div>
      ) : (
        <VictoryChart>
          <VictoryAxis dependentAxis />
          <VictoryAxis
            tickValues={insert(
              0,
              `${intradayDate}T${marketStartTime}Z`,
              intradayPrices
                .map(d => d.time)
                .reverse()
                .concat(`${intradayDate}T${marketEndTime}Z`),
            )}
            tickFormat={time =>
              time === `${intradayDate}T${marketStartTime}Z` ||
              time === `${intradayDate}T${marketEndTime}Z`
                ? dayjs(time).format('HH:mm')
                : ''
            }
          />

          <VictoryLine
            data={intradayPrices}
            sortKey="time"
            x="time"
            y="last_price"
          />
        </VictoryChart>
      )}
    </>
  )
}

export default IntradayChart
