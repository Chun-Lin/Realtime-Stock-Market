import React, { useState, useEffect } from 'react'
import axios from 'axios'

const StockChart = () => {
  const [stockIntraday, setStockIntraday] = useState(null)

  useEffect(() => {
    const fetchStockIntradayData = async () => {
      const stockIntradayData = await axios.get(
        'api/indice/intraday?symbol=^DJI',
      )
      console.log(
        'LOG: fetchStockIntradayData -> stockIntradayData',
        stockIntradayData,
      )
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
