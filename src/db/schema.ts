import {
  pgTable,
  serial,
  varchar,
  real,
  integer,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const houses = pgTable("houses", {
  id: serial("id").primaryKey(),
  url: text("url"),
  priceInRp: doublePrecision("price_in_rp"),
  title: text("title"),
  address: text("address"),
  district: varchar("district", { length: 100 }),
  city: varchar("city", { length: 100 }),
  lat: doublePrecision("lat"),
  long: doublePrecision("long"),
  facilities: text("facilities"),
  propertyType: varchar("property_type", { length: 50 }),
  adsId: varchar("ads_id", { length: 100 }),

  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  landSizeM2: integer("land_size_m2"),
  buildingSizeM2: integer("building_size_m2"),
  carports: integer("carports"),

  certificate: varchar("certificate", { length: 100 }),
  electricity: varchar("electricity", { length: 50 }),
  maidBedrooms: integer("maid_bedrooms"),
  maidBathrooms: integer("maid_bathrooms"),
  floors: integer("floors"),
  buildingAge: integer("building_age"),
  yearBuilt: integer("year_built"),

  propertyCondition: varchar("property_condition", { length: 100 }),
  buildingOrientation: varchar("building_orientation", { length: 100 }),
  garages: integer("garages"),
  furnishing: varchar("furnishing", { length: 100 }),
});
