import "dotenv/config"; // harus baris paling atas
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import yaml from "js-yaml";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { houses } from "./db/schema";
import housesRoute from "./routes/housesRoute";

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use("/houses", housesRoute);

// Database setup with Drizzle ORM
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env");
  process.exit(1);
}
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

// Routes
app.get("/api", (req, res) => {
  res.send("Selamat datang di API Backend");
});

app.get("/houses", async (req, res) => {
  try {
    const result = await db.select().from(houses);
    res.json(result);
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).json({ error: "Failed to fetch houses" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di Port : ${PORT}`);
});
