import React, { useState, useEffect } from 'react'
import { apiIntraday } from 'api'

const StockChart = () => {
  const [stockIntraday, setStockIntraday] = useState(null)

  useEffect(() => {
    apiIntraday('AAPL', 5).then(stockData => console.log(stockData.data))
  }, [stockIntraday])

  return (
    <>
      <h1>StockChart</h1>
    </>
  )
}

export default StockChart
