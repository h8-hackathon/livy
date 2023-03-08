export default function getGreeting() {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  let greeting

  if (currentHour < 12) {
    greeting = 'Selamat Pagi'
  } else if (currentHour < 15) {
    greeting = 'Selamat Siang'
  } else if (currentHour < 18) {
    greeting = 'Selamat Sore'
  } else {
    greeting = 'Selamat Malam'
  }

  return greeting
}
