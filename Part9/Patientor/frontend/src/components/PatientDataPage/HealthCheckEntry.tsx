import { HealthCheckEntry } from "../../types";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

function HealthCheckEntryDisplay({ entry }: HealthCheckEntryProps) {
  let color;
  switch (Number(entry.healthCheckRating)) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "blue";
      break;
    case 2:
      color = "yellow";
      break;
    case 3:
      color = "red";
      break;
  }

  return (
    <div>
      <p>
        {entry.date} <MedicalInformationIcon />
      </p>
      <p>{entry.description}</p>
      <p>
        <FavoriteBorderIcon style={{ backgroundColor: color }} />
      </p>
    </div>
  );
}

export default HealthCheckEntryDisplay;
