import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { Male, Female, Transgender } from "@mui/icons-material";
import PatientEntries from "./PatientEntries";
import NewEntry from "./NewEntry";

// interface PatientDataPageProps {
//   diagnosis: Diagnosis[];
// }

function PatientDataPage() {
  const { id } = useParams();
  const [patientData, setPatientData] = useState<Patient | undefined | null>(
    null
  );
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedForm, setSelectedForm] = useState("HealthCheck");
  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setPatientData(undefined);
        return;
      }
      try {
        const patient = await patientService.getPatientById(id);
        setPatientData(patient);
      } catch (_err) {
        setPatientData(undefined);
      }
    };
    fetchPatient();
  }, [id]);

  if (patientData === null) {
    return <div>LOADING</div>;
  }

  if (patientData === undefined || id === undefined) {
    return <div>PATIENT NOT FOUND</div>;
  }

  let logo = <Male />;
  switch (patientData.gender) {
    case "female":
      logo = <Female />;
      break;
    case "other":
      logo = <Transgender />;
      break;
    default:
      break;
  }

  return (
    <div>
      <h2>
        {patientData.name} {logo}
      </h2>
      <p>ssn: {patientData.ssn}</p>
      <p>occupation: {patientData.occupation}</p>
      {showNewEntry || (
        <button onClick={() => setShowNewEntry(true)}>Add new entry</button>
      )}
      {showNewEntry && (
        <>
          <form style={{ display: "flex", gap: "1rem" }}>
            <div>
              HealthCheck
              <input
                type="radio"
                value={"HealthCheck"}
                onChange={() => setSelectedForm("HealthCheck")}
                checked={selectedForm === "HealthCheck"}
              />
            </div>
            <div>
              Hospital
              <input
                type="radio"
                value={"Hospital"}
                onChange={() => setSelectedForm("Hospital")}
                checked={selectedForm === "Hospital"}
              />
            </div>
            <div>
              OccupationalHealthcare
              <input
                type="radio"
                value={"OccupationalHealthcare"}
                onChange={() => setSelectedForm("OccupationalHealthcare")}
                checked={selectedForm === "OccupationalHealthcare"}
              />
            </div>
          </form>
          <NewEntry
            id={id}
            closeForm={() => setShowNewEntry(false)}
            setPatientData={setPatientData}
            patientData={patientData}
            selectedForm={selectedForm}
          />
        </>
      )}
      <h4>entries</h4>

      <PatientEntries patientDataEntries={patientData.entries} />

      {/* {patientData.entries.map((entry) => {
        let codes;
        if (entry.diagnosisCodes) {
          codes = entry.diagnosisCodes.map((code) => {
            const chosenDiagnosis = diagnosis.find(
              (diagnosisData) => diagnosisData.code === code
            );
            return (
              <li key={code}>
                {code} {chosenDiagnosis?.name}
              </li>
            );
          });
        }

        return (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>{codes} </ul>
          </div>
        );
      })} */}
    </div>
  );
}

export default PatientDataPage;
