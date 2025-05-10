import express from 'express';
import cors from 'cors';
import transactionsRouter from './routes/transactions';

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

app.use('/api', transactionsRouter); 

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
