const app = require('../app')
const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`Halo Livy Server Forum is up on port ${port}`)
  })