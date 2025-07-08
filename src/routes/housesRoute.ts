import { Router } from "express";
import { db } from "../db/db";
import { houses } from "../db/schema";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.select().from(houses);
    res.json(result);
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).json({ error: "Failed to fetch houses" });
  }
});

export default router;
