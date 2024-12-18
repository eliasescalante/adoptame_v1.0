import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = "localhost";

// Conexión a la base de datos MongoDB
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Falta la variable de entorno MONGODB_URI en el archivo .env");
  process.exit(1);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
  })
  .catch((err) => {
    console.error("Error conectando a la base de datos", err);
    process.exit(1);
  });

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.listen(PORT, () => console.log(`Servidor en funcionamiento en http://${HOST}:${PORT}`));

export default app;