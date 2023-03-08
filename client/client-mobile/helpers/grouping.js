export const groupingSchedule = (group) => {
  const result = group.reduce(
    (value, curr) => {
      const start = new Date(curr.session).getTime()
      const now = new Date().getTime()
      const end = new Date(curr.session).setTime(
        new Date(curr.session).getTime() + 3600000
      )
      if (curr.status === 'unpaid') {
        value.unpaid.push(curr)
        return value
      } else if (now < start) {
        value.upcoming.push(curr)
      } else if (now > start && now < end) {
        value.active.push(curr)
      } else {
        value.past.push(curr)
      }
      return value
    },
    { unpaid: [], active: [], upcoming: [], past: [] }
  )
  return result
}
