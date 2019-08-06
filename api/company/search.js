const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiSearchCompany } = api

  const { symbol } = req.query
  const companyProfile = await apiSearchCompany(symbol)

  res.status(200).json(companyProfile.data)
}
