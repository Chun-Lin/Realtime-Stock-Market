const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiIntraday } = api

  const { symbol } = req.query
  const stockIntraday = await apiIntraday(symbol)

  res.status(200).json(stockIntraday.data)
}
