"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // harus baris paling atas
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const schema_1 = require("./db/schema");
const housesRoute_1 = __importDefault(require("./routes/housesRoute"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/houses", housesRoute_1.default);
// Database setup with Drizzle ORM
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set in .env");
    process.exit(1);
}
const client = (0, postgres_1.default)(process.env.DATABASE_URL);
const db = (0, postgres_js_1.drizzle)(client);
// Routes
app.get("/api", (req, res) => {
    res.send("Selamat datang di API Backend");
});
app.get("/houses", async (req, res) => {
    try {
        const result = await db.select().from(schema_1.houses);
        res.json(result);
    }
    catch (error) {
        console.error("Error fetching houses:", error);
        res.status(500).json({ error: "Failed to fetch houses" });
    }
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di Port : ${PORT}`);
});
