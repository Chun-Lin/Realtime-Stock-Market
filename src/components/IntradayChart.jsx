import React, { useState, useEffect, useRef, useReducer } from 'react'
import axios from 'axios'
import { stringify } from 'query-string'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import dayjs from 'dayjs'

const IntradayChart = () => {
  const intradayFetchReducer = (state, action) => {
    if (action.type === 'FETCH_INTRADAYPRICE') {
      return {
        intradayPrices: [
          ...state.intradayPrices,
          ...action.payload.intradayPrices,
        ],
        nextPageToken: action.payload.nextPageToken,
      }
    } else {
      throw new Error()
    }
  }

  const [data, dispatch] = useReducer(intradayFetchReducer, {
    intradayPrices: [],
    nextPageToken: '',
  })

  useEffect(() => {
    const fetchStockIntradayData = async nextPage => {
      const queryParameters = {
        symbol: 'MMM',
        pageSize: 100,
        startDate: '2019-08-15',
        endDate: '2019-08-15',
        startTime: '13:30:00',
        endTime: '15:00:00',
        nextPage: nextPage,
      }

      const stockIntradayData = await axios.get(
        `api/securities/intraday?${stringify(queryParameters)}`,
      )
      const { intraday_prices, next_page } = stockIntradayData.data
      dispatch({
        type: 'FETCH_INTRADAYPRICE',
        payload: { intradayPrices: intraday_prices, nextPageToken: next_page },
      })
    }

    const { nextPageToken } = data
    nextPageToken !== null && fetchStockIntradayData(nextPageToken)
  }, [data, dispatch])

  const { intradayPrices, nextPageToken } = data
  return (
    <>
      {nextPageToken === null ? (
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
      ) : null}
    </>
  )
}

export default IntradayChart
