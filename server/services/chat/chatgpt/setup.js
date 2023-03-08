/* istanbul ignore file */

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const { Configuration, OpenAIApi } = require("openai");


const openai = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return new OpenAIApi(configuration)
}

module.exports = openai