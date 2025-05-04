const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Mock data
let categories = [
  { id: 1, name: "مشتری دائم" },
  { id: 2, name: "تأمین‌کننده" }
];

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.listen(5000, () => console.log('API on port 5000'));