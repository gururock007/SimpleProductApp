import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors"
import connectDb from "./database/connection.js";
import productRouter from "./routes/product.route.js";

configDotenv.apply();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.use("/api/product",productRouter)

const startServer = async () =>  {
    try {
        await connectDb(); // Await the connection
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log("Server is running on port " + PORT);
        });
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Exit the process on connection error
    }
}

startServer();