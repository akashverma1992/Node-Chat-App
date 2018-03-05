const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
console.log(publicDir);

app.use(express.static(publicDir));



app.listen(port, () => {
  console.log(`Server started aon port: ${port}`)
});