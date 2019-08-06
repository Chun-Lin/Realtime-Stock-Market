const axios = require('axios')
const queryString = require('querystring')
const moveObjKeysToNestedObj = require('../../utils/moveObjKeysToNestedObj.js')

module.exports = async (req, res) => {
  const { symbol, range = 1, interval = 1, sort = 'asc' } = req.query

  const queryParameters = {
    symbol: symbol,
    range: range,
    interval: interval,
    sort: sort,
    api_token: process.env.WORLD_TRADING_DATA_API_KEY,
  }

  const stockIntraday = await axios.get(
    `https://intraday.worldtradingdata.com/api/v1/intraday?${queryString.stringify(
      queryParameters,
    )}`,
  )

  const intradayObj = stockIntraday.data.intraday

  const newIntradayObj = moveObjKeysToNestedObj(intradayObj, 'date')

  res.status(200).json(newIntradayObj)
}
