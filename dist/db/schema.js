"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.houses = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.houses = (0, pg_core_1.pgTable)("houses", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    url: (0, pg_core_1.text)("url"),
    priceInRp: (0, pg_core_1.doublePrecision)("price_in_rp"),
    title: (0, pg_core_1.text)("title"),
    address: (0, pg_core_1.text)("address"),
    district: (0, pg_core_1.varchar)("district", { length: 100 }),
    city: (0, pg_core_1.varchar)("city", { length: 100 }),
    lat: (0, pg_core_1.doublePrecision)("lat"),
    long: (0, pg_core_1.doublePrecision)("long"),
    facilities: (0, pg_core_1.text)("facilities"),
    propertyType: (0, pg_core_1.varchar)("property_type", { length: 50 }),
    adsId: (0, pg_core_1.varchar)("ads_id", { length: 100 }),
    bedrooms: (0, pg_core_1.integer)("bedrooms"),
    bathrooms: (0, pg_core_1.integer)("bathrooms"),
    landSizeM2: (0, pg_core_1.integer)("land_size_m2"),
    buildingSizeM2: (0, pg_core_1.integer)("building_size_m2"),
    carports: (0, pg_core_1.integer)("carports"),
    certificate: (0, pg_core_1.varchar)("certificate", { length: 100 }),
    electricity: (0, pg_core_1.varchar)("electricity", { length: 50 }),
    maidBedrooms: (0, pg_core_1.integer)("maid_bedrooms"),
    maidBathrooms: (0, pg_core_1.integer)("maid_bathrooms"),
    floors: (0, pg_core_1.integer)("floors"),
    buildingAge: (0, pg_core_1.integer)("building_age"),
    yearBuilt: (0, pg_core_1.integer)("year_built"),
    propertyCondition: (0, pg_core_1.varchar)("property_condition", { length: 100 }),
    buildingOrientation: (0, pg_core_1.varchar)("building_orientation", { length: 100 }),
    garages: (0, pg_core_1.integer)("garages"),
    furnishing: (0, pg_core_1.varchar)("furnishing", { length: 100 }),
});
