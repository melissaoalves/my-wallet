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

router.use(clerkMiddleware());

router.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express com Clerk");
});

router.get(
  "/protected",
  requireAuth(),
  (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        const { userId } = getAuth(req);

        console.log("User ID:", userId);

        if (!userId) {
          return res.status(401).json({ message: "Usuário não autenticado" });
        }

        const user = await clerkClient.users.getUser(userId);
        console.log("User data:", user);

        res.json({ user });
      } catch (error) {
        console.error("Error while fetching user data:", error);
        next(error);
      }
    })();
  }
);

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

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

export default router;
