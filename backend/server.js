import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is listening of PORT 5000");
});

app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server listening on PORT ${PORT}...`.blue));
