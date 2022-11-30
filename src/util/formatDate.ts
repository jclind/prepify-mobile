const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const formatDate = (d: number, short?: boolean) => {
  const date = new Date(d)
  let day = date.getDate()
  let month = monthNames[date.getMonth()]
  let year = date.getFullYear()

  if (short) {
    month = month.substring(0, 3)
  }
  return `${month} ${day}, ${year}`
}
