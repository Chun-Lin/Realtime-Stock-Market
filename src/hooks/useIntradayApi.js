import { useEffect, useReducer } from 'react'
import { stringify } from 'query-string'
import axios from 'axios'

export const useIntradayApi = queryParameters => {
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
        isClose: false
      }
    } else if (action.type === 'FETCH_DONE') {
      return {
        ...state,
        isError: false,
        isDone: true,
        isClose: false
      }
    } else if (action.type === 'MARKET_CLOSE') {
      return {
        ...state,
        isClose: true,
        isDone: false,
        isLoading: false
      }
    } else {
      throw new Error()
    }
  }

  const [state, dispatch] = useReducer(intradayFetchReducer, {
    intradayPrices: [],
    nextPageToken: '',
    isError: false,
    isDone: false,
    isClose: false,
  })

  useEffect(() => {
    const fetchStockIntradayData = async nextPage => {
      dispatch({ type: 'FETCH_INIT' })
      const newQueryParameters = {
        ...queryParameters,
        nextPage: nextPage,
      }

      try {
        const stockIntradayData = await axios.get(
          `api/securities/intraday?${stringify(newQueryParameters)}`,
        )
        const { intraday_prices, next_page } = stockIntradayData.data
        intraday_prices.length !== 0
          ? dispatch({
              type: 'FETCH_SUCCESS',
              payload: {
                intradayPrices: intraday_prices,
                nextPageToken: next_page,
              },
            })
          : dispatch({
              type: 'MARKET_CLOSE',
            })
      } catch (error) {
        dispatch({
          type: 'FETCH_FAILURE',
        })
      }
    }
    const { nextPageToken } = state

    nextPageToken !== null
      ? fetchStockIntradayData(nextPageToken)
      : dispatch({ type: 'FETCH_DONE' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.nextPageToken])

  return state
}
