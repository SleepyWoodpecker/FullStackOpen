import { NonSensitiveDiaryEntry } from "../types";
import DiaryItem from "./DiaryItem";

interface DiaryListProps {
  diaryEntries: NonSensitiveDiaryEntry[];
}

function DiaryList({ diaryEntries }: DiaryListProps) {
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaryEntries.map((diaryEntry) => {
        return <DiaryItem diaryEntry={diaryEntry} key={diaryEntry.id} />;
      })}
    </div>
  );
}

export default DiaryList;
