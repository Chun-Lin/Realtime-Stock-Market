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

  const [state, dispatch] = useReducer(intradayFetchReducer, {
    intradayPrices: [],
    nextPageToken: '',
    isError: false,
    isDone: false,
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
        console.log("LOG: stockIntradayData", stockIntradayData)
        const { intraday_prices, next_page } = stockIntradayData.data
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            intradayPrices: intraday_prices,
            nextPageToken: next_page,
          },
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
