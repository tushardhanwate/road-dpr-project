const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const nodemailer = require("nodemailer");

// Email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",
    pass: "your_app_password"
  }
});

router.post("/submit", async (req, res) => {
  const data = req.body;

  // Save DB
  await Form.insertMany(data);

  // Email send
  let text = "";

  data.forEach((d, i) => {
    text += `
Row ${i + 1}
Activity: ${d.activity}
Chainage: ${d.from} - ${d.to}
Side: ${d.side}
Qty: ${d.qty}
Trips: ${d.trips}
------------------------
`;
  });

  await transporter.sendMail({
    from: "yourgmail@gmail.com",
    to: "yourgmail@gmail.com",
    subject: "DPR Report",
    text: text
  });

  res.send("Saved + Email Sent");
});

module.exports = router;
