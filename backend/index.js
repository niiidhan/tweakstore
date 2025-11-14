import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Temporary download token store
const tempTokens = {};

/* ------------------------------------------------------------------
   🔐 Razorpay Instance (SECRET kept server-side)
------------------------------------------------------------------ */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/* ------------------------------------------------------------------
   1️⃣ Send PUBLIC Razorpay Key to Frontend
------------------------------------------------------------------ */
app.get("/get-key", (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

/* ------------------------------------------------------------------
   2️⃣ Create Razorpay Order
------------------------------------------------------------------ */
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // rupees → paisa
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.error("❌ Order creation error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

/* ------------------------------------------------------------------
   3️⃣ Verify Payment Signature
------------------------------------------------------------------ */
app.post("/verify-payment", (req, res) => {
  const { paymentId, orderId, signature, files } = req.body;

  if (!paymentId || !orderId || !signature || !files) {
    return res.status(400).json({ error: "Missing payment details" });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest("hex");

  if (expected !== signature) {
    return res.status(400).json({ error: "Invalid payment signature" });
  }

  // Generate secure temp token (valid 10 min)
  const token = crypto.randomBytes(20).toString("hex");

  tempTokens[token] = {
    files,
    expiresAt: Date.now() + 10 * 60 * 1000,
  };

  res.json({ success: true, token });
});

/* ------------------------------------------------------------------
   4️⃣ Secure book download route
------------------------------------------------------------------ */
app.get("/download/:token/:filename", (req, res) => {
  const { token, filename } = req.params;

  const record = tempTokens[token];

  if (!record) {
    return res.status(401).send("Invalid or expired token");
  }

  // Auto-expire token
  if (Date.now() > record.expiresAt) {
    delete tempTokens[token];
    return res.status(401).send("Download token expired");
  }

  const filePath = path.join(__dirname, "books", filename + ".pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  res.download(filePath);
});

/* ------------------------------------------------------------------
   5️⃣ Start backend server
------------------------------------------------------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
);
