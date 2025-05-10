import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import {
  clerkClient,
  requireAuth,
  getAuth,
  clerkMiddleware,
} from "@clerk/express";

const app = express();
const router = express.Router();

// Aplicando o middleware Clerk
router.use(clerkMiddleware());

// Rota pública
router.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express com Clerk");
});

// Rota protegida (requere autenticação)
router.get(
  "/protected",
  requireAuth(), // Garante que o usuário está autenticado
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Obter o userId autenticado a partir do contexto Clerk
      const { userId } = getAuth(req);

      console.log("User ID:", userId);

      // Verificando se o userId existe
      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      // Buscando dados do usuário com o Clerk
      const user = await clerkClient.users.getUser(userId);
      console.log("User data:", user);

      // Retorna os dados do usuário autenticado
      res.json({ user });
    } catch (error) {
      console.error("Error while fetching user data:", error);
      next(error); // Passa o erro para o middleware de erro
    }
  }
);

// Rota de logout
router.post("/logout", (req: Request, res: Response) => {
  try {
    res.clearCookie("session");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Error logging out", error: errorMessage });
  }
});

// Middleware de erro (para captura de qualquer erro nas rotas acima)
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

export default router;
