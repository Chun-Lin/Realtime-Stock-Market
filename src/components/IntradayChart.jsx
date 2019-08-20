import React, { useState, useEffect, useRef, useReducer } from 'react'
import axios from 'axios'
import { stringify } from 'query-string'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import dayjs from 'dayjs'
import { useIntradayApi } from 'hooks'

const IntradayChart = () => {
  const { intradayPrices, isError, isDone } = useIntradayApi({
    symbol: 'MMM',
    pageSize: 100,
    startDate: '2019-08-19',
    endDate: '2019-08-19',
    startTime: '13:30:00',
    endTime: '20:00:00',
  })
  return (
    <>
      {isError === true ? <div>Something Wrong!!</div> : null}

      {isDone === false ? (
        <div>Loading...</div>
      ) : (
        <VictoryChart scale={{ time: 'time' }}>
          <VictoryAxis dependentAxis />
          <VictoryAxis
            tickValues={intradayPrices.map(d => d.time).reverse()}
            tickFormat={time =>
              intradayPrices[0].time === time ||
              intradayPrices[intradayPrices.length - 1].time === time
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
