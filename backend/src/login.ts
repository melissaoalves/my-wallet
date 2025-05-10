import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import {
  clerkClient,
  requireAuth,
  getAuth,
  clerkMiddleware,
} from "@clerk/express";

const app = express();
const PORT = 3000;

app.use(clerkMiddleware());

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express com Clerk");
});

app.get(
  "/protected",
  requireAuth(),
  (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        const { userId } = getAuth(req);

        console.log("Authenticated user ID:", userId);

        if (!userId) {
          return res.status(401).json({ message: "User not authenticated" });
        }
        const user = await clerkClient.users.getUser(userId);
        console.log("User data:", user);

        res.json({ user });
      } catch (error) {
        console.error("Error while fetching user data:", error);
        next(error);
      }
    })().catch(next);
  }
);

app.post("/logout", (req: Request, res: Response) => {
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
