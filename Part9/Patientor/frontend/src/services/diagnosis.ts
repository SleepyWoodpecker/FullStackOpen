import axios from "axios";
import { Diagnosis } from "../types";

const baseUrl = "http://localhost:3000/api/diagnoses";

const getAll = async (): Promise<Diagnosis[]> => {
  const diagnoses = await axios.get<Diagnosis[]>(baseUrl);
  return diagnoses.data;
};

export default { getAll };
