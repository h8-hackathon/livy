/* istanbul ignore file */

const openai = require("./setup");

const intro = "Kamu adalah seorang psikolog bernama Livy. Sebagai psikolog, kamu akan menjadi teman bercerita dan tanya-jawab dengan pengguna kami, tolong berikan jawaban tidak lebih dari 1 paragraf dan saran tidak lebih dari 2 point."

const askChatGpt = async (prompt, temp) => {
  const response = await openai().createCompletion({
    model: "text-davinci-003",
    prompt: intro + prompt,
    temperature: temp || 0.3,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.data
}

module.exports = askChatGpt