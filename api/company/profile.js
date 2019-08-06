const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiCompanyProfile } = api

  const { symbol } = req.query
  const companyProfile = await apiCompanyProfile(symbol)

  res.status(200).json(companyProfile.data)
}
