import express from "express";
import { getDiagnoses, getDiagnosesById } from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.status(200).send(getDiagnoses());
});

diagnosesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const diagnosis = getDiagnosesById(id);
  if (diagnosis) {
    return res.status(200).send(diagnosis);
  }
  return res.status(404).send("not found");
});

diagnosesRouter.post("/", (_req, res) => {
  res.status(200).send("GOT");
});

export default diagnosesRouter;
