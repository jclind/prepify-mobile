export const formatRating = (tot: number | string, count: number | string) => {
  if (Number(tot) === 0 || Number(count) === 0) {
    return 'No Ratings'
  }
  const roundedNumber = Math.round((Number(tot) / Number(count)) * 10) / 10

  return roundedNumber.toFixed(1)
}
