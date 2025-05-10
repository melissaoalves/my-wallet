import express from 'express';
import cors from 'cors';
import "dotenv/config";

import loginRouter from './src/login';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(express.json());

app.use('/auth', loginRouter);

app.get("/", (req, res) => {
  res.send("Servidor Express rodando com Clerk!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
