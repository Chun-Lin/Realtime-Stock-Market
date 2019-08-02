const obj = {
  '2019-08-01 15:59:00': {
    open: '38.26',
    close: '38.27',
    high: '38.29',
    low: '38.24',
    volume: '500667',
  },
  '2019-08-01 15:58:00': {
    open: '38.26',
    close: '38.26',
    high: '38.29',
    low: '38.25',
    volume: '241115',
  },
}

const testObj = Object.keys(obj).map((time, index) => ({
  date: time,
  ...obj[`${time}`],
}))

console.log(testObj)
