const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiRealtimeSecurityPrice } = api

  const { symbol } = req.query
  const securityRealtimePrice = await apiRealtimeSecurityPrice(symbol)

  res.status(200).json(securityRealtimePrice.data)
}
