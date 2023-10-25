import { HospitalEntry } from "../../types";
import MedicationIcon from "@mui/icons-material/Medication";

interface HospitalProps {
  entry: HospitalEntry;
}

function Hospital({ entry }: HospitalProps) {
  return (
    <div>
      <p>
        {entry.date} <MedicationIcon />
      </p>
      <p>{entry.description}</p>
    </div>
  );
}

export default Hospital;
