import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { inputText, steps } = req.body;

  if (!inputText || !steps) {
    return res.status(400).json({ error: "Missing input or steps" });
  }

  // Minimal response for now
  res.json({
    message: "Backend working",
    inputText,
    steps
  });
});

export default router;
