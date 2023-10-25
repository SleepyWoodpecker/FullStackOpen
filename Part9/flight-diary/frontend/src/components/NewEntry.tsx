import { AxiosError } from "axios";
import { addDiaryEntry } from "../diaryServices";
import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  Visibility,
  Weather,
} from "../types";
import { useState } from "react";

type NewEntryProps = {
  setDiaryEntries: (newDiaryEntries: NonSensitiveDiaryEntry[]) => void;
  diaryEntries: NonSensitiveDiaryEntry[];
};

function NewEntry({ setDiaryEntries, diaryEntries }: NewEntryProps) {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState("");

  const createNewDiaryEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const diaryData: NewDiaryEntry = {
        date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment,
      };
      const newEntry: NonSensitiveDiaryEntry = await addDiaryEntry(diaryData);
      setDiaryEntries(diaryEntries.concat(newEntry));
    } catch (err) {
      let errMessage = "Error: ";
      console.log(err);
      if (err instanceof AxiosError) {
        errMessage += err.response?.data;
      }
      setNotification(errMessage);
      setTimeout(() => setNotification(""), 3000);
    }
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <p style={{ color: "red" }}>{notification}</p>
      <form onSubmit={createNewDiaryEntry}>
        <div>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div>
          Visibility:{" "}
          {/* <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          ></input> */}
          {Object.values(Visibility).map((visibilityType) => {
            return (
              <span key={visibilityType}>
                <label htmlFor={`radio-${visibilityType}`}>
                  {visibilityType}
                </label>
                <input
                  type="radio"
                  id={`radio-${visibilityType}`}
                  value={visibilityType}
                  checked={visibility === visibilityType}
                  onChange={(e) => setVisibility(e.target.value)}
                />
              </span>
            );
          })}
        </div>
        <div>
          Weather:{" "}
          {/* <input
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          ></input> */}
          {Object.values(Weather).map((weatherType) => {
            return (
              <span key={weatherType}>
                <label htmlFor={`radio-${weatherType}`}>{weatherType}</label>
                <input
                  type="radio"
                  id={`radio-${weatherType}`}
                  value={weatherType}
                  checked={weather === weatherType}
                  onChange={(e) => setWeather(e.target.value)}
                ></input>
              </span>
            );
          })}
        </div>
        <div>
          Comment:{" "}
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
        <button onClick={createNewDiaryEntry}>Submit</button>
      </form>
    </div>
  );
}

export default NewEntry;
