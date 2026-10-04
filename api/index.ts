import type { VercelRequest, VercelResponse } from "@vercel/node";

import app from "../src/app.js";
import { connectDatabase } from "../src/config/database.js";

export default async function handler(
 req: VercelRequest,
 res: VercelResponse,
) {
 try {
  await connectDatabase();

  return app(req, res);
 } catch (error) {
  console.error("Database connection error:", error);

  return res.status(500).json({
   success: false,
   message: "Database connection failed",
  });
 }
}