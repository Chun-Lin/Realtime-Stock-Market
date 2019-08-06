const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiLookupSecurityId } = api

  const { symbol } = req.query
  const securityProfile = await apiLookupSecurityId(symbol)

  res.status(200).json(securityProfile.data)
}
