import axios from 'axios'
import { stringify } from 'querystring'
import { BASE_URL, INTRADAY, API_KEY } from 'constants/index'

const alphaVantageRequest = axios.create({
  baseURL: BASE_URL,
})

export const apiIntraday = (symbol, interval) => {
  const queryStringIntraday = {
    function: INTRADAY,
    symbol: symbol,
    interval: `${interval}min`,
    outputsize: 'full',
    apikey: API_KEY
  }

  return alphaVantageRequest.get(`/query?${stringify(queryStringIntraday)}`)
}
