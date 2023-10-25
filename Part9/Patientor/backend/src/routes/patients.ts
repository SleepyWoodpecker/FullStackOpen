import express from "express";
import {
  addPatientData,
  addPatientEntry,
  getPatient,
  nonSensitivePatientData,
} from "../services/patientsServices";
import { toNewPatientEntry, toNewEntryForPatient } from "../utils";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.status(200).send(nonSensitivePatientData());
});

patientRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const targetPatient = getPatient(id);
  if (!targetPatient) {
    return res.status(404).send("Patient not found");
  }
  return res.status(200).send(targetPatient);
});

patientRouter.post("/", (req, res) => {
  try {
    const newEntry = toNewPatientEntry(req.body);
    res.status(200).send(addPatientData(newEntry));
  } catch (err: unknown) {
    let errMessage: string = "something went wrong ";
    if (err instanceof Error) {
      errMessage += err;
    }
    res.status(404).send(errMessage);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const { id } = req.params;
    const formattedEntry = toNewEntryForPatient(req.body);
    res.status(200).send(addPatientEntry(id, formattedEntry));
  } catch (err: unknown) {
    let errMessage: string = "something went wrong ";
    if (err instanceof Error) {
      errMessage += err;
    }
    res.status(404).send(errMessage);
  }
});

export default patientRouter;
