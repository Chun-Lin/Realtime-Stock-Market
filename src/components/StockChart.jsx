import React, { useState, useEffect } from 'react'
import { apiIntraday } from 'api'

const StockChart = () => {
  const [stockIntraday, setStockIntraday] = useState(null)

  useEffect(() => {
    const fetchStockIntradayData = async () => {
      const stockIntradayData = await apiIntraday('AAPL', 5)
      console.log("LOG: fetchStockIntradayData -> stockIntradayData", stockIntradayData.data)
      
      setStockIntraday(stockIntradayData.data)
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
