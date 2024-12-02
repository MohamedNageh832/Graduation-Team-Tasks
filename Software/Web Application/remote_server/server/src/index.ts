import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes, vehicleHistoryRoutes } from "@/routes";
import { errorHandler, GlobalError } from "@/middlewares";
import { wss } from "@/config";

const app = express();
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", vehicleHistoryRoutes);
app.use("/api/v1", authRoutes);

app.get("/bing", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "bong",
  });
});

app.all("*", (req, res, next) => {
  const error = new GlobalError(
    `No routes match the specified route ${req.originalUrl}`
  );
  error.statusCode = 404;
  error.status = "Not found";

  next(error);
});

app.use(errorHandler);

server.on("upgrade", (req, socket, head) => {
  socket.on("error", console.log);

  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});
