const axios = require('axios')

module.exports = async (req, res) => {
  const { symbol } = req.query

  const stockRealtime = await axios.get(
    `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${
      process.env.WORLD_TRADING_DATA_API_KEY
    }`,
  )

  res.status(200).json(stockRealtime.data)
}
