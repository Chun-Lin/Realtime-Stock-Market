const api = require('../baseApi.js')

module.exports = async (req, res) => {
  const { apiIntraday } = api

  const {
    symbol,
    pageSize,
    startDate,
    endDate,
    startTime,
    endTime,
    nextPage,
  } = req.query

  const stockIntraday = await apiIntraday({
    symbol,
    pageSize,
    startDate,
    endDate,
    startTime,
    endTime,
    nextPage,
  })

  res.status(200).json(stockIntraday.data)
}
