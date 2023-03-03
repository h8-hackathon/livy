const app = require('../app');
const port = process.env.PORT || 4002;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
