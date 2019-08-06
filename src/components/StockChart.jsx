import React, { useState, useEffect } from 'react'
import axios from 'axios'

const StockChart = () => {
  const [stockIntraday, setStockIntraday] = useState(null)

  useEffect(() => {
    const fetchStockIntradayData = async () => {
      const stockIntradayData = await axios.get(
        'api/historical_data/close_price?symbol=AAPL',
      )
      const nextData = await axios.get(
        `api/historical_data/close_price?symbol=AAPL&nextPage${
          stockIntradayData.next_page
        }`,
      )
      console.log('LOG: fetchStockIntradayData -> stockIntradayData', nextData)
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
