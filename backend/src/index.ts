import 'dotenv/config';
import express from 'express';
import { clerkClient, requireAuth, getAuth, clerkMiddleware } from '@clerk/express'; // Importar Clerk SDK

const app = express();
const PORT = 3000;

// Middleware do Clerk para verificar autenticação
app.use(clerkMiddleware());  // Este middleware verifica a autenticação do usuário

// Rota pública para testar
app.get('/', (req, res) => {
  res.send('Servidor Express com Clerk');
});

// Rota protegida que exige autenticação
app.get('/protected', requireAuth(), (req, res, next) => {
  (async () => {
    const { userId } = getAuth(req);  // Obtém o userId da requisição autenticada

    // Verificar se userId não é null
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
      // Usar Clerk SDK para buscar os dados completos do usuário
      const user = await clerkClient.users.getUser(userId);

      // Retornar os dados do usuário
      res.json({ user });
    } catch (error) {
      next(error); // Passar erros para o middleware de erro
    }
  })();
});

// Iniciar o servidor e escutar na porta 3000
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
