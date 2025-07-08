"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sync_1 = require("csv-parse/sync");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schema_1 = require("../db/schema");
// Setup koneksi DB
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = (0, node_postgres_1.drizzle)(pool);
// Baca file CSV
const csvFilePath = path_1.default.join(__dirname, "../jabodetabek_house_price.csv");
const fileContent = fs_1.default.readFileSync(csvFilePath, "utf-8");
// Parse CSV
const records = (0, sync_1.parse)(fileContent, {
    columns: true,
    skip_empty_lines: true,
});
// Format data sesuai schema
const safeParseInt = (val) => isNaN(parseInt(val)) ? null : parseInt(val);
const safeParseFloat = (val) => isNaN(parseFloat(val)) ? null : parseFloat(val);
const mappedData = records.map((row) => ({
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
            await db.insert(schema_1.houses).values(batch);
            console.log(`✅ Batch ${i / batchSize + 1} inserted (${batch.length} records)`);
        }
        console.log("✅ Semua data berhasil dimasukkan.");
    }
    catch (err) {
        console.error("❌ Gagal insert batch:", err);
    }
    finally {
        await pool.end();
    }
}
insertData();
