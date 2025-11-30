require('dotenv').config();
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const APP_ID = Number(process.env.ZEG0_APP_ID);
const SERVER_SECRET = process.env.ZEG0_SERVER_SECRET;
const PORT = process.env.PORT || 3000;

app.get('/api/get-zego-token', (req, res) => {
  const userID = req.query.userID || "user-" + Date.now();
  const effectiveTime = 3600;
  const nonce = Math.floor(Math.random() * 1e9).toString();

  const payload = `${APP_ID}\n${userID}\n${nonce}\n${effectiveTime}`;
  const signature = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(payload)
    .digest("base64");

  res.json({
    appID: APP_ID,
    token: signature,
    userID,
  });
});

app.listen(PORT, () => {
  console.log(`Zego Token Server running at http://localhost:${PORT}`);
});
