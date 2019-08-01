import axios from 'axios'
import { stringify } from 'querystring'

import {
  BASE_URL,
  SANDBOX_API_KEY,
  SANDBOX_PUBLIC_API_KEY,
} from 'constants/index'

const headers = {
  Authorization: `Bearer ${SANDBOX_API_KEY}`,
  'X-Authorization-Public-Key': `${SANDBOX_PUBLIC_API_KEY}`,
}

const intrinoSecurityRequest = axios.create({
  baseURL: `${BASE_URL}/securities/`,
  timeout: 10000,
  headers: headers,
})

const intrinoHistoricalDataRequest = axios.create({
  baseURL: `${BASE_URL}/historical_data/`,
  timeout: 10000,
  headers: headers,
})

export const apiIntraday = symbol =>
  intrinoSecurityRequest.get(`${symbol}/prices/intraday`)

export const apiSearchSecurity = symbol =>
  intrinoSecurityRequest.get(`search?query=${symbol}`)

export const apiLookupSecurityId = symbol =>
  intrinoSecurityRequest.get(`${symbol}`)


export const apiHistoricalSecurtiyClosePrice = ({
  symbol,
  frequency = 'daily',
  pageSize = 100,
}) => {
  const queryParameters = {
    frequency: frequency,
    page_size: pageSize,
  }

  return intrinoHistoricalDataRequest.get(
    `${symbol}/close_price?${stringify(queryParameters)}`,
  )
}
