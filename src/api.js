import axios from 'axios'
import {
  BASE_URL,
  SANDBOX_API_KEY,
  SANDBOX_PUBLIC_API_KEY,
} from 'constants/index'

const intrinoRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${SANDBOX_API_KEY}`,
    'X-Authorization-Public-Key': `${SANDBOX_PUBLIC_API_KEY}`,
  },
})

export const apiIntraday = symbol =>
  intrinoRequest.get(`/securities/${symbol}/prices/intraday`)

export const apiSearchSecurity = symbol =>
  intrinoRequest.get(`/securities/search?query${symbol}`)
