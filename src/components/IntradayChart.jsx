import React, { useState, useEffect, useRef, useReducer } from 'react'
import axios from 'axios'
import { stringify } from 'query-string'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import dayjs from 'dayjs'
import insert from 'ramda/src/insert'

import { useIntradayApi } from 'hooks'

const IntradayChart = () => {
  const queryParameters = {
    symbol: 'MMM',
    pageSize: 100,
    startDate: '2019-08-19',
    endDate: '2019-08-19',
    startTime: '13:30:00',
    endTime: '20:00:00',
  }

  const { intradayPrices, isError, isDone, isClose } = useIntradayApi(
    queryParameters,
  )

  return (
    <>
      {isError === true ? <div>Something Wrong!!</div> : null}
      {isClose === true ? (
        <div>
          Market Closed on{' '}
          {queryParameters.startDate ? queryParameters.startDate : 'Today'}!!
        </div>
      ) : isDone === false ? (
        <div>Loading...</div>
      ) : (
        <VictoryChart>
          <VictoryAxis dependentAxis />
          <VictoryAxis
            tickValues={insert(
              0,
              `${queryParameters.startDate}T${queryParameters.startTime}Z`,
              intradayPrices
                .map(d => d.time)
                .reverse()
                .concat(
                  `${queryParameters.endDate}T${queryParameters.endTime}Z`,
                ),
            )}
            tickFormat={time =>
              time ===
                `${queryParameters.startDate}T${queryParameters.startTime}Z` ||
              time === `${queryParameters.endDate}T${queryParameters.endTime}Z`
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
