import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "./types";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/diaries";

export const getNonSensitiveDiaryEntries = async (): Promise<
  NonSensitiveDiaryEntry[]
> => {
  const nonSensitiveEntries = await axios.get<NonSensitiveDiaryEntry[]>(
    baseUrl
  );
  return nonSensitiveEntries.data;
};

export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const allEntries = await axios.get<DiaryEntry[]>(
    `${baseUrl}/sensitiveEntries`
  );
  return allEntries.data;
};

export const addDiaryEntry = async (
  diaryData: NewDiaryEntry
): Promise<DiaryEntry> => {
  const { data: newDiaryEntry } = await axios.post(baseUrl, diaryData);
  return newDiaryEntry;
};
