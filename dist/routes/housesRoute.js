"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db/db");
const schema_1 = require("../db/schema");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const result = await db_1.db.select().from(schema_1.houses);
        res.json(result);
    }
    catch (error) {
        console.error("Error fetching houses:", error);
        res.status(500).json({ error: "Failed to fetch houses" });
    }
});
exports.default = router;
