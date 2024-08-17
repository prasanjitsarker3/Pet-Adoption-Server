import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./App/Middlewares/globalErrorHandler";
import notFound from "./App/Middlewares/notFound";
import router from "./App/routes";

const app: Application = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Pet Server Running...",
  });
});

app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
