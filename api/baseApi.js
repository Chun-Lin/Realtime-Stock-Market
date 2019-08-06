const axios = require('axios')
const queryString = require('queryString')

const baseUrl = require('../constants/baseUrl.js')

const { INTRINIO_SANDBOX_API_KEY } = process.env

const { stringify } = queryString

const { INTRINIO_BASE_URL } = baseUrl

const headers = {
  Authorization: `Bearer ${INTRINIO_SANDBOX_API_KEY}`,
}

const intrinioSecurityRequest = axios.create({
  baseURL: `https://api-v2.intrinio.com/securities/`,
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

const apiIntraday = ({ symbol, startDate, startTime, endDate, endTime }) => {
  const queryParameters = {
    start_date: startDate,
    start_time: startTime,
    end_date: endDate,
    end_time: endTime,
  }

  intrinioSecurityRequest.get(
    `${symbol}/prices/intraday?${stringify(queryParameters)}`,
  )
}

const apiLookupSecurityId = symbol => intrinioSecurityRequest.get(`${symbol}`)

const apiRealtimeSecurityPrice = symbol =>
  intrinioSecurityRequest.get(`${symbol}/prices/realtime`)

const apiSearchCompany = symbol =>
  intrinioCompanyRequest.get(`search?query=${symbol}`)

const apiCompanyProfile = symbol => intrinioCompanyRequest.get(`${symbol}`)

const apiCompanyNews = symbol => intrinioCompanyRequest.get(`${symbol}/news`)

const apiHistoricalSecurtiyClosePrice = ({
  symbol,
  frequency = 'daily',
  pageSize = 100,
  nextPage,
}) => {
  const queryParameters = {
    frequency: frequency,
    page_size: pageSize,
    next_page: nextPage,
  }

  return intrinioHistoricalDataRequest.get(
    `${symbol}/close_price?${stringify(queryParameters)}`,
  )
}

module.exports = {
  apiIntraday,
  apiLookupSecurityId,
  apiRealtimeSecurityPrice,
  apiSearchCompany,
  apiCompanyProfile,
  apiCompanyNews,
  apiHistoricalSecurtiyClosePrice,
}
