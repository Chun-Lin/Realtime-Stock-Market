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

const intrinoCompanyRequest = axios.create({
  baseURL: `${BASE_URL}/companies/`,
  timeout: 10000,
  headers: headers,
})

const intrinoHistoricalDataRequest = axios.create({
  baseURL: `${BASE_URL}/historical_data/`,
  timeout: 10000,
  headers: headers,
})

const intrinoIndiceRequest = axios.create({
  baseURL: `${BASE_URL}/indices/`,
  timeout: 10000,
  headers: headers,
})

export const apiIntraday = symbol =>
  intrinoSecurityRequest.get(`${symbol}/prices/intraday`)

export const apiLookupSecurityId = symbol =>
  intrinoSecurityRequest.get(`${symbol}`)

export const apiSearchCompany = symbol =>
  intrinoCompanyRequest.get(`search?query=${symbol}`)

export const apiCompanyProfile = symbol =>
  intrinoCompanyRequest.get(`${symbol}`)

export const apiCompanyNews = symbol =>
  intrinoCompanyRequest.get(`${symbol}/news`)

export const apiIndiceHistoricalDataClosePrice = symbol =>
  intrinoIndiceRequest.get(`stock_market/${symbol}/historical_data/close_price`)

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
