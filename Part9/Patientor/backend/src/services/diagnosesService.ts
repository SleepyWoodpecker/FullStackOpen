import data from "../data/diagnosisData";
import { Diagnoses } from "../types";

const getDiagnoses = (): Diagnoses[] => {
  return data;
};

const getDiagnosesById = (code: string): Diagnoses | undefined => {
  return data.find((diagnosis) => diagnosis.code === code);
};

const addDiagnoses = () => {
  return "added";
};

export { getDiagnoses, addDiagnoses, getDiagnosesById };
