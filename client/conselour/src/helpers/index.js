const axios = require("axios")

const verifyUser = async () => {
  const access_token = localStorage.getItem('access_token')
  if (access_token) {
    const response = await axios.post('https://api.livy.chat/verify', { access_token })
    return response.data
  }
  
  throw new Error()
}

module.exports = verifyUser