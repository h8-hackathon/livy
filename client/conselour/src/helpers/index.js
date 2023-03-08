const axios = require("axios")

const api = axios.create({ baseURL: 'https://api.livy.chat/' })

api.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token')

    if (access_token) {
      config.headers.access_token = access_token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('access_token')
    }
    return Promise.reject(error)
  }
)

const verifyUser = async () => {
  const access_token = localStorage.getItem('access_token')
  if (access_token) {
    const response = await api.post('/verify', { access_token })
    const submission = await api.get('/counselor/status')
    if (submission.data.status === 'pending') return null
    const user = { ...response.data, submission: submission.data }
    return user
  }

  throw new Error()
}

const formatedDate = (date) => {
  return new Date(date)
    .toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .reverse()
    .join('-')
}


const groupingSchedule = (group) => {
  console.log(group)
  let result = group.reduce(
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

  Object.keys(result).forEach((e) => {

    result[e] = result[e].reduce((value, curr) => {
      const exist = value.findIndex((el) => el.UserId == curr.UserId)
      if (exist < 0) { value.push({ ...curr, status: e }) }
      else {
        if (new Date(value[exist].session).getTime() < new Date(curr.session).getTime())
          value[exist] = { ...curr, status: e }
      }
      return value
    }, [])
  })

  return result
}



module.exports = { verifyUser, api, formatedDate, groupingSchedule }