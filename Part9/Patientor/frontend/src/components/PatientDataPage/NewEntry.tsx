import { useState } from "react";
import patients from "../../services/patients";
import { Patient, diagnosisCodeList } from "../../types";
import { AxiosError } from "axios";
import {
  processedDiagnosisCodes,
  processedDischarge,
  processedHealthCheckRating,
  processedSickLeave,
} from "./utils";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

interface NewEntryProps {
  id: string;
  closeForm: () => void;
  patientData: Patient | null | void;
  setPatientData: React.Dispatch<
    React.SetStateAction<Patient | null | undefined>
  >;
  selectedForm: string;
}

function NewEntry({
  id,
  closeForm,
  patientData,
  setPatientData,
  selectedForm,
}: NewEntryProps) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleEntrySubmission = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const baseNewEntry = {
        description,
        date,
        specialist,
        diagnosisCodes: processedDiagnosisCodes(diagnosisCodes),
      };

      let additionalDetails;

      if (selectedForm === "HealthCheck") {
        additionalDetails = {
          healthCheckRating: processedHealthCheckRating(healthCheckRating),
          type: "HealthCheck" as const,
        };
      } else if (selectedForm === "Hospital") {
        additionalDetails = {
          discharge: processedDischarge({
            date: dischargeDate,
            criteria: dischargeCriteria,
          }),
          type: "Hospital" as const,
        };
      } else if (selectedForm === "OccupationalHealthcare") {
        additionalDetails = {
          employerName,
          sickLeave: processedSickLeave({
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          }),
          type: "OccupationalHealthcare" as const,
        };
      } else {
        throw new Error("No such form type");
      }

      const recordedEntry = await patients.addEntry(id, {
        ...baseNewEntry,
        ...additionalDetails,
      });

      if (patientData) {
        const newPatientEntries = patientData.entries.concat(recordedEntry);
        const newPatient = { ...patientData, entries: newPatientEntries };
        setPatientData(newPatient);
      }

      setDescription("");
      setSpecialist("");
      setDate("");
      setDiagnosisCodes([]);
      setHealthCheckRating("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
      setDischargeCriteria("");
      setDischargeDate("");
      closeForm();
    } catch (err: unknown) {
      let errMessage = "something went wrong";
      if (err instanceof AxiosError || err instanceof Error) {
        errMessage += err;
      }
      console.log(err);
      setNotificationMessage(errMessage);
      setTimeout(() => setNotificationMessage(""), 3000);
    }
  };

  let additionalFields;
  switch (selectedForm) {
    case "HealthCheck":
      additionalFields = (
        <div>
          Health Check Rating:{" "}
          <input
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(e.target.value)}
          ></input>
        </div>
      );
      break;
    case "Hospital":
      additionalFields = (
        <div
          style={{
            gap: "0.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>Discharge</p>
          <div
            style={{
              paddingLeft: "1rem",
              gap: "0.25rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              Discharge Date:
              <input
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                type="date"
              ></input>
            </div>
            <div>
              Discharge Criteria:
              <input
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
      );
      break;
    case "OccupationalHealthcare":
      additionalFields = (
        <div
          style={{
            gap: "0.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>Sick Leave</p>
          <div
            style={{
              paddingLeft: "1rem",
              gap: "0.25rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              Start Date:
              <input
                value={sickLeaveStart}
                onChange={(e) => setSickLeaveStart(e.target.value)}
                type="date"
              ></input>
            </div>
            <div>
              End Criteria:
              <input
                value={sickLeaveEnd}
                onChange={(e) => setSickLeaveEnd(e.target.value)}
                type="date"
              ></input>
            </div>
          </div>
          <div>
            Occupation:
            <input
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            ></input>
          </div>
        </div>
      );
      break;
    default:
      break;
  }
  return (
    <div>
      {notificationMessage && (
        <div style={{ color: "red", border: "1px solid red" }}>
          {notificationMessage}
        </div>
      )}
      <FormControl
        onSubmit={handleEntrySubmission}
        style={{ gap: "0.25rem", display: "flex", flexDirection: "column" }}
      >
        <div>
          Description:{" "}
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          Date:{" "}
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          ></input>
        </div>
        <div>
          Specialist:{" "}
          <input
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          ></input>
        </div>
        <div>
          Diagnosis Codes
          <Select
            style={{ marginLeft: "0.25rem", width: "8rem", height: "2rem" }}
            value={diagnosisCodes}
            onChange={(e) => {
              const {
                target: { value },
              } = e;
              setDiagnosisCodes(
                typeof value === "string" ? value.split(",") : value
              );
            }}
            multiple
            renderValue={(diagnosisCodes) => diagnosisCodes.join(", ")}
          >
            {diagnosisCodeList.map((code) => {
              return (
                <MenuItem key={code} value={code}>
                  <Checkbox checked={diagnosisCodes.indexOf(code) > -1} />
                  <ListItemText>{code}</ListItemText>
                </MenuItem>
              );
            })}
          </Select>
        </div>
        {additionalFields}
        <button onClick={handleEntrySubmission}>Submit</button>
      </FormControl>
    </div>
  );
}

export default NewEntry;

{
  /* <div>
Diagnosis Codes:{" "}
<input
  value={diagnosisCodes}
  onChange={(e) => setDiagnosisCodes(e.target.value)}
></input>
</div> */
}

// (diagnosisCodes) => {
//   const chosenValue = e.target.value.slice(-1)[0];
//   if (diagnosisCodes.indexOf(chosenValue) === -1) {
//     console.log("check");
//     return diagnosisCodes.concat(chosenValue);
//   } else {
//     console.log("UNCHECKL");
//     console.log(diagnosisCodes);
//     return diagnosisCodes.filter((code) => code !== chosenValue);
//   }
// }
