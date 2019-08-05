import axios from 'axios'
import { stringify } from 'querystring'

import {
  INTRINIO_BASE_URL,
  WORLD_TRADING_DATA_INTRADAY_BASE_URL,
  WORLD_TRADING_DATA_API_KEY,
  SANDBOX_API_KEY,
  SANDBOX_PUBLIC_API_KEY,
} from 'constants/index'

const headers = {
  Authorization: `Bearer ${SANDBOX_API_KEY}`,
  'X-Authorization-Public-Key': `${SANDBOX_PUBLIC_API_KEY}`,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/x-www-form-urlencoded',
}

const intrinioSecurityRequest = axios.create({
  baseURL: `${INTRINIO_BASE_URL}/securities/`,
  timeout: 10000,
  headers: headers,
})

const intrinioCompanyRequest = axios.create({
  baseURL: `${INTRINIO_BASE_URL}/companies/`,
  timeout: 10000,
  headers: headers,
})

const intrinioHistoricalDataRequest = axios.create({
  baseURL: `${INTRINIO_BASE_URL}/historical_data/`,
  timeout: 10000,
  headers: headers,
})

const intrinioIndiceRequest = axios.create({
  baseURL: `${INTRINIO_BASE_URL}/indices/`,
  timeout: 10000,
  headers: headers,
})

const worldTradingDataIntradayRequest = axios.create({
  baseURL: `${WORLD_TRADING_DATA_INTRADAY_BASE_URL}/intraday/`,
  timeout: 10000,
  headers: headers,
})

export const apiIntraday = symbol =>
  intrinioSecurityRequest.get(`${symbol}/prices/intraday`)

export const apiLookupSecurityId = symbol =>
  intrinioSecurityRequest.get(`${symbol}`)

export const apiRealtimeSecurityPrice = symbol =>
  intrinioSecurityRequest.get(`${symbol}/prices/realtime`)

export const apiSearchCompany = symbol =>
  intrinioCompanyRequest.get(`search?query=${symbol}`)

export const apiCompanyProfile = symbol =>
  intrinioCompanyRequest.get(`${symbol}`)

export const apiCompanyNews = symbol =>
  intrinioCompanyRequest.get(`${symbol}/news`)

export const apiIndiceHistoricalDataClosePrice = symbol =>
  intrinioIndiceRequest.get(
    `stock_market/${symbol}/historical_data/close_price`,
  )

export const apiHistoricalSecurtiyClosePrice = ({
  symbol,
  frequency = 'daily',
  pageSize = 100,
}) => {
  const queryParameters = {
    frequency: frequency,
    page_size: pageSize,
  }

  return intrinioHistoricalDataRequest.get(
    `${symbol}/close_price?${stringify(queryParameters)}`,
  )
}

export const apiIndiceIntraday = ({
  symbol,
  range = 1,
  interval = 5,
  sort = 'asc',
}) => {
  const queryParameters = {
    symbol: symbol,
    range: range,
    interval: interval,
    sort: sort,
    api_token: WORLD_TRADING_DATA_API_KEY,
  }

  worldTradingDataIntradayRequest.get(`?${stringify(queryParameters)}`)
}
