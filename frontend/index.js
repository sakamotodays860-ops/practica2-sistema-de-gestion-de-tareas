const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Frontend SysLab 2.0 en funcionamiento 🚀</h1>');
});

app.listen(PORT, () => {
  console.log(`Frontend corriendo en el puerto ${PORT}`);
});
