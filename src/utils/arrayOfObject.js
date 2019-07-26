export const arrayOfObject = (data) => {
  const arrayOfObjectResult = Object.entries(data).map(
    e => ({
      [e[0]]: e[1],
    }),
  )
  return arrayOfObjectResult
}
