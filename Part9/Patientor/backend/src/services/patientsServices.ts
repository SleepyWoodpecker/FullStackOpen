import data from "../data/patientData";
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatientData,
  Patient,
} from "../types";
import { v4 as uuid } from "uuid";

export const nonSensitivePatientData = (): NonSensitivePatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

// get patient data from patient's ID
export const getPatient = (id: string): Patient | undefined => {
  const targetPatient = data.find((patient) => patient.id === id);
  if (!targetPatient) {
    throw new Error("Patient not found");
  }
  return targetPatient;
};

// this is where you add the ID and all, processing of te data
export const addPatientData = (entry: NewPatientEntry): Patient => {
  // validate all the patient data

  const entries: Entry[] = [];

  const newEntry: Patient = {
    id: uuid(),
    name: entry.name,
    dateOfBirth: entry.dateOfBirth,
    ssn: entry.ssn,
    gender: entry.gender,
    occupation: entry.occupation,
    entries,
  };

  data.push(newEntry);
  return newEntry;
};

export const addPatientEntry = (
  patientId: string,
  entry: EntryWithoutId
): Entry => {
  const targetPatient = data.find((patient) => patient.id === patientId);
  if (!targetPatient) {
    throw new Error("Patient not found");
  }
  const newEntry: Entry = { ...entry, id: uuid() };
  targetPatient.entries.push(newEntry);

  // hmm I feel its better to return the new entry only. The frontend only needs to add the new entry at the start
  return newEntry;
};
