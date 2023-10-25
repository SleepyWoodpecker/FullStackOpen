import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

// routes
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  console.log("server pinged");
  return res.status(200).send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
