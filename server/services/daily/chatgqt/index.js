if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const defaultPromts = "5 list aktifitas hari ini untuk seseorang yang berumur 50 tahun dan bergender laki laki dalam menjaga kesehatan mental,"

const askChatGpt = async (prompt, temp) => {

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt || defaultPromts} ,jawab hanya dalam bentuk array tanpa kata pengantar apapun `,
    temperature: temp || 0.3,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.data
}

module.exports = askChatGpt