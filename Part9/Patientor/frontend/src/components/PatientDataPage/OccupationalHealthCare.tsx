import { OccupationalHealthcareEntry } from "../../types";
import BusinessIcon from "@mui/icons-material/Business";

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcareEntry;
}

function OccupationalHealthCare({ entry }: OccupationalHealthcareProps) {
  return (
    <div>
      <p>
        {entry.date} <BusinessIcon /> {entry.employerName}
      </p>
      <p>{entry.description}</p>
    </div>
  );
}

export default OccupationalHealthCare;
