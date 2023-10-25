import { NonSensitiveDiaryEntry } from "../types";

interface DiaryItemProps {
  diaryEntry: NonSensitiveDiaryEntry;
}

function DiaryItem({ diaryEntry }: DiaryItemProps) {
  return (
    <div>
      <strong>{diaryEntry.date}</strong>
      <p>visibility: {diaryEntry.visibility}</p>
      <p>weather: {diaryEntry.weather}</p>
    </div>
  );
}

export default DiaryItem;
