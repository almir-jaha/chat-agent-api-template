
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 📌 API za geolokaciju korisnika po IP adresi
const getLocationFromIP = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { city, country_name } = response.data;
    return `${city}, ${country_name}`;
  } catch (err) {
    console.error('⚠️ Greška pri geolokaciji:', err.message);
    return 'Nepoznata lokacija';
  }
};

app.post('/submit-form', async (req, res) => {
  const { name, email, question } = req.body;

  // 📅 Lokalni srpski format: 17.07.2025 14:35:10
  const now = new Date();
  const twoDigits = (n) => n.toString().padStart(2, '0');
  const formattedTime = `${twoDigits(now.getDate())}.${twoDigits(now.getMonth() + 1)}.${now.getFullYear()} ${twoDigits(now.getHours())}:${twoDigits(now.getMinutes())}:${twoDigits(now.getSeconds())}`;

  // 🌐 IP korisnika (radi i na Render)
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
  const location = await getLocationFromIP(ip);

  const paramString = `'${name}|${email}|${question}|${formattedTime}|${location}'`;
  const encodedParam = encodeURIComponent(paramString);
  const url = `https://coreapiitineris.azurewebsites.net/ADM/ADM_LogsInsert?Parametar=${encodedParam}`;

  try {
    const apiResponse = await axios.post(url);
    res.json({ status: 'success', apiResponse: apiResponse.data });
  } catch (err) {
    console.error('❌ API greška:', err.message);
    res.status(500).json({ status: 'error', message: 'Greška pri slanju ka API-ju' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server radi na portu ${PORT}`);
});
