require('dotenv').config(); // asegurar variables de entorno

const app = require('./src/app'); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});