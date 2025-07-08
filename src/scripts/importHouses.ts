import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { houses } from "../db/schema";

// Setup koneksi DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

// Baca file CSV
const csvFilePath = path.join(__dirname, "../jabodetabek_house_price.csv");
const fileContent = fs.readFileSync(csvFilePath, "utf-8");

// Parse CSV
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
});

// Format data sesuai schema
const safeParseInt = (val: any) =>
  isNaN(parseInt(val)) ? null : parseInt(val);

const safeParseFloat = (val: any) =>
  isNaN(parseFloat(val)) ? null : parseFloat(val);

const mappedData = records.map((row: any) => ({
  url: row.url,
  priceInRp: safeParseFloat(row.price_in_rp),
  title: row.title,
  address: row.address,
  district: row.district,
  city: row.city,
  lat: safeParseFloat(row.lat),
  long: safeParseFloat(row.long),
  facilities: row.facilities,
  propertyType: row.property_type,
  adsId: row.ads_id,

  bedrooms: safeParseInt(row.bedrooms),
  bathrooms: safeParseInt(row.bathrooms),
  landSizeM2: safeParseInt(row.land_size_m2),
  buildingSizeM2: safeParseInt(row.building_size_m2),
  carports: safeParseInt(row.carports),

  certificate: row.certificate,
  electricity: row.electricity,
  maidBedrooms: safeParseInt(row.maid_bedrooms),
  maidBathrooms: safeParseInt(row.maid_bathrooms),
  floors: safeParseInt(row.floors),
  buildingAge: safeParseInt(row.building_age),
  yearBuilt: safeParseInt(row.year_built),

  propertyCondition: row.property_condition,
  buildingOrientation: row.building_orientation,
  garages: safeParseInt(row.garages),
  furnishing: row.furnishing,
}));

// Insert ke database
async function insertData() {
  const batchSize = 500;

  try {
    for (let i = 0; i < mappedData.length; i += batchSize) {
      const batch = mappedData.slice(i, i + batchSize);
      await db.insert(houses).values(batch);
      console.log(
        `✅ Batch ${i / batchSize + 1} inserted (${batch.length} records)`
      );
    }

    console.log("✅ Semua data berhasil dimasukkan.");
  } catch (err) {
    console.error("❌ Gagal insert batch:", err);
  } finally {
    await pool.end();
  }
}

insertData();
