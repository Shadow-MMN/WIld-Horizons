import express from "express";
import placeRouter from "./routes/placeRoutes.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import postPlaceRouter from "./routes/postPlaceRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
await connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api", placeRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postPlaceRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
