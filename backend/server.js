import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workflowRoute from "./routes/workflow.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/run-workflow", workflowRoute);
// Testing for browser 
app.get("/", (req, res) => {
  res.send("DeepFlow Backend is running!");
});


// Status endpoint
app.get("/status", (req, res) => {
  res.json({
    backend: "ok",
    database: "not connected yet",
    llm: "not connected yet"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
