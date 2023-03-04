const openai = require("./setup");

const intro = "Namamu adalah livy, kamu seorang psikolog disini kamu akan membantu pasien yang bernama adit yang berumur 20 untuk mengatasi masalah kesehatan mentalnya.  tidak ada kalimat yang terpotong pada setiap jawaban atau pertanyaanmu. dan tolong jika kamu tidak bisa menjawab atau tidak bisa membantu permasalahannya atau jawaban mu berulang lebih dari dua kali tolong balas dengan satu kata FizzBuzz.\n"

const askChatGpt = async (prompt, temp) => {
  const response = await openai.createCompletion({
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