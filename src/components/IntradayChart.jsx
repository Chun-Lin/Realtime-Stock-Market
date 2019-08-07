import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import dayjs from 'dayjs'

const IntradayChart = () => {
  const [intradayData, setIntraday] = useState([])

  useEffect(() => {
    const fetchStockIntradayData = async () => {
      const stockIntradayData = await axios.get(
        `api/securities/intraday?symbol=AAPL&pageSize=100`,
      )

      const { intraday_prices } = stockIntradayData.data

      setIntraday(intraday_prices)
    }

    fetchStockIntradayData()
  }, [])

  return (
    <>
      {!!intradayData.length ? (
        <VictoryChart scale={{ time: 'time' }}>
          <VictoryAxis dependentAxis />
          <VictoryAxis
            tickValues={intradayData.map(d => d.time).reverse()}
            tickFormat={time =>
              intradayData[0].time === time ||
              intradayData[intradayData.length - 1].time === time
                ? dayjs(time).format('HH:mm')
                : ''
            }
          />

          <VictoryLine
            data={intradayData}
            sortKey="time"
            x="time"
            y="last_price"
          />
        </VictoryChart>
      ) : null}
    </>
  )
}

export default IntradayChart
