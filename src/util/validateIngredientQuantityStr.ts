// Takes String, returns boolean based on if given string is a number in fraction form
const isFraction = str => {
  const tempSplit = str.split('/')

  if (tempSplit.length !== 2) {
    return false
  }

  const allValsAreNums = tempSplit.every(
    i => !isNaN(Number(i)) && i.trim() !== ''
  )
  if (!allValsAreNums) {
    return false
  }

  return true
}

export const evalNum = str => {
  if (!isNaN(str)) {
    return Number(str)
  }
  const evalFraction = frac => {
    const split = frac.split('/')
    const res = parseInt(split[0], 10) / parseInt(split[1], 10)
    return Number(res)
  }
  if (isFraction(str)) {
    return evalFraction(str)
  }

  const splitVal = str.split(/[\s-]/)
  if (splitVal.length <= 0) return 0
  if (splitVal.length === 1) {
    if (isFraction(splitVal[0])) {
      return evalFraction(splitVal[0])
    } else {
      return Number(splitVal[0])
    }
  } else {
    console.log("This shouldn't be happening in evalNum")
  }
}
