const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiCompanyNews } = api

  const { symbol } = req.query
  const stockNews = await apiCompanyNews(symbol)

  res.status(200).json(stockNews.data)
}
