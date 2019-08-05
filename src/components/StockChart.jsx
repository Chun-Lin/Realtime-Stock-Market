import React, { useState, useEffect } from 'react'
import {
  apiIntraday,
  apiSearchCompany,
  apiIndiceHistoricalDataClosePrice,
  apiRealtimeSecurityPrice,
  apiIndiceIntraday,
} from 'api'

const StockChart = () => {
  const [stockIntraday, setStockIntraday] = useState(null)

  useEffect(() => {
    const fetchStockIntradayData = async () => {
      const stockIntradayData = await apiIndiceIntraday({ symbol: '^DJI' })
    }

    fetchStockIntradayData()
  }, [])

  return (
    <>
      <h1>StockChart</h1>
    </>
  )
}

export default StockChart
