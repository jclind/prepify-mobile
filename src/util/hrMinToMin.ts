export const hrMinToMin = (obj: { hours: number; minutes: number } | null) => {
  if (!obj) return null
  return obj.hours * 60 + obj.minutes
}
