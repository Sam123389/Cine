const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./Server/routes/router');
const port = 3000;

app.use(express.json());
app.use('/api', routes);

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://samantaclavijo20:1233893087@cluster0.kr7g7wq.mongodb.net/cine?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Se realizó correctamente la conexión con MongoDB Atlas');
  } catch (err) {
    console.log(err);
  }
};
mongoConnect();

app.listen(port, () => {
  console.log(`Servidor está en ejecución en http://localhost:${port}`);
});
