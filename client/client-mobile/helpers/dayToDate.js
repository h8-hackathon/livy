export function dayToDate(dayOfWeek) {
  let day = 0

  switch (dayOfWeek.toLowerCase()) {
    case 'sunday':
      day = 0
      break
    case 'monday':
      day = 1
      break
    case 'tuesday':
      day = 2
      break
    case 'wednesday':
      day = 3
      break
    case 'thursday':
      day = 4
      break
    case 'friday':
      day = 5
      break
    case 'saturday':
      day = 6
      break
    default:
      day = 0
  }
  const now = new Date()

  const diff = day - now.getDay()

  const nextOccurrence =
    diff > 0 ? now.getDate() + diff : now.getDate() + diff + 7

  now.setDate(nextOccurrence)
  return now
}

export function getAllHours(slots) {
  const allHours = []

  slots.forEach((slot) => {
    const [startHour, startMinute] = slot.startTime.split(':').map(Number)
    const [endHour, endMinute] = slot.endTime.split(':').map(Number)

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`
        allHours.push(timeString)
      }
    }
  })

  return allHours
}

export const sortDays = (availableDays) => {
  const dateNow = new Date().getDate()
  const mapDays = availableDays.map((day) => {
    const dayDate = dayToDate(day.dayOfWeek).getDate()
    return {
      dayDate,
      ...day,
    }
  })
  const sortedDays = mapDays.sort((a,b) => a.dayDate > b.dayDate? 1 : a.dayDate < dateNow ? 1:-1 )

  console.log(sortedDays, 'xxx', mapDays)

  return sortedDays
}
