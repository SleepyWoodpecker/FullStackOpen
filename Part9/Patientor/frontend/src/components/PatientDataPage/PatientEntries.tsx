import { Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import Hospital from "./Hospital";
import OccupationalHealthCare from "./OccupationalHealthCare";

interface EntryProps {
  patientDataEntries: Entry[];
}

function PatientEntries({ patientDataEntries }: EntryProps) {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  // change display based on the description
  function renderDescription(entry: Entry) {
    switch (entry.type) {
      case "OccupationalHealthcare":
        return <OccupationalHealthCare entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      case "Hospital":
        return <Hospital entry={entry} />;
      default:
        return assertNever(entry);
    }
  }

  return patientDataEntries.map((entry) => {
    return (
      <div
        style={{
          border: "2px solid black",
          borderRadius: "0.25em",
          padding: "3px",
        }}
        key={entry.id}
      >
        {renderDescription(entry)}
        <p>{entry.specialist}</p>
      </div>
    );
  });
}

export default PatientEntries;
