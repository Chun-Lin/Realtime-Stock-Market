const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiIntraday } = api

  const { symbol, pageSize } = req.query

  const stockIntraday = await apiIntraday({ symbol, pageSize })

  res.status(200).json(stockIntraday.data)
}
