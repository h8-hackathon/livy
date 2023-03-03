const axios = require('axios')

const { USER_URL, ADMIN_URL, FORUM_URL, CHAT_URL, SCHEDULE_URL, DAILY_URL } =
  process.env

const userAPI = axios.create({
  baseURL: USER_URL || 'http://localhost:4001',
})

const adminAPI = axios.create({
  baseURL: ADMIN_URL || 'http://localhost:4002',
})

const forumAPI = axios.create({
  baseURL: FORUM_URL || 'http://localhost:4003',
})

const chatAPI = axios.create({
  baseURL: CHAT_URL || 'http://localhost:4004',
})

const scheduleAPI = axios.create({
  baseURL: SCHEDULE_URL || 'http://localhost:4005',
})

const dailyAPI = axios.create({
  baseURL: DAILY_URL || 'http://localhost:4006',
})

module.exports = {
  userAPI,
  adminAPI,
  forumAPI,
  chatAPI,
  scheduleAPI,
  dailyAPI,
}
