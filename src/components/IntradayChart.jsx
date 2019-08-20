import React, { useState, useEffect, useRef, useReducer } from 'react'
import axios from 'axios'
import { stringify } from 'query-string'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import dayjs from 'dayjs'

const IntradayChart = () => {
  const intradayFetchReducer = (state, action) => {
    if (action.type === 'FETCH_INIT') {
      return {
        ...state,
        isError: false,
        isDone: false,
      }
    } else if (action.type === 'FETCH_SUCCESS') {
      return {
        ...state,
        intradayPrices: [
          ...state.intradayPrices,
          ...action.payload.intradayPrices,
        ],
        nextPageToken: action.payload.nextPageToken,
        isError: false,
        isDone: false,
      }
    } else if (action.type === 'FETCH_FAILURE') {
      return {
        ...state,
        isError: true,
        isDone: false,
      }
    } else if (action.type === 'FETCH_DONE') {
      return {
        ...state,
        isError: false,
        isDone: true,
      }
    } else {
      throw new Error()
    }
  }

  const [data, dispatch] = useReducer(intradayFetchReducer, {
    intradayPrices: [],
    nextPageToken: '',
    isError: false,
    isDone: false,
  })

  useEffect(() => {
    const fetchStockIntradayData = async nextPage => {
      dispatch({ type: 'FETCH_INIT' })
      const queryParameters = {
        symbol: 'MMM',
        pageSize: 100,
        startDate: '2019-08-19',
        endDate: '2019-08-19',
        startTime: '13:30:00',
        endTime: '20:00:00',
        nextPage: nextPage,
      }

      try {
        const stockIntradayData = await axios.get(
          `api/securities/intraday?${stringify(queryParameters)}`,
        )
        const { intraday_prices, next_page } = stockIntradayData.data
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            intradayPrices: intraday_prices,
            nextPageToken: next_page,
          },
        })
        // setNextPageToken(next_page)
      } catch (error) {
        dispatch({
          type: 'FETCH_FAILURE',
        })
      }
    }
    const { nextPageToken } = data

    nextPageToken !== null
      ? fetchStockIntradayData(nextPageToken)
      : dispatch({ type: 'FETCH_DONE' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data.nextPageToken])

  const { intradayPrices, isError, isDone } = data
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
