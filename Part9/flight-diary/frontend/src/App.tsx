import DiaryList from "./components/DiaryList";
import NewDiaryEntry from "./components/NewEntry";
import { useState, useEffect } from "react";
import { getNonSensitiveDiaryEntries } from "./diaryServices";
import { NonSensitiveDiaryEntry } from "./types";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    []
  );

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const diaryEntries = await getNonSensitiveDiaryEntries();
      setDiaryEntries(diaryEntries);
    };
    fetchDiaryEntries();
  }, []);

  return (
    <div>
      <NewDiaryEntry
        setDiaryEntries={setDiaryEntries}
        diaryEntries={diaryEntries}
      />
      <DiaryList diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
