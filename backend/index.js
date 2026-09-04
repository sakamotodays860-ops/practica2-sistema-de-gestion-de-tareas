const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend listo');
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
