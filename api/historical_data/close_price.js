const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiHistoricalSecurtiyClosePrice } = api

  const { symbol, frequency, pageSize, nextPage } = req.query
  const securityClosePrice = await apiHistoricalSecurtiyClosePrice({
    symbol,
    frequency,
    pageSize,
    nextPage
  })

  res.status(200).json(securityClosePrice.data)
}
