import React, { useState, useEffect } from 'react'
import { apiIntraday } from 'api'
import { apiPolish, arrayOfObject } from 'utils'

const StockChart = () => {
  const [stockIntraday, setStockIntraday] = useState(null)

  useEffect(() => {
    const fetchStockIntradayData = async () => {
      const stockIntradayData = await apiIntraday('AAPL', 5)
      // Polish the api response to modify weird keys name
      const polishedRes = apiPolish(stockIntradayData.data)

      // turn timeSeries data from object of object to array of object
      polishedRes.timeSeries5min = arrayOfObject(polishedRes.timeSeries5min)
      setStockIntraday(polishedRes.timeSeries5min)
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
