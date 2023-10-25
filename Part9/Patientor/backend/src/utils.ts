import {
  NewPatientEntry,
  Gender,
  Diagnoses as Diagnosis,
  Discharge,
  HealthCheckRating,
  BaseEntryWithoutId,
  EntryWithoutId,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Gender has not been inputted correctly: " + gender);
  }
  return gender;
};

// if it is not an enum type, parsing it takes an unkown. If it is an enum type, parsing it takes a string?
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Name not inputted correctly: " + name);
  }
  return name;
};

const parseDOB = (dob: unknown): string => {
  if (!dob || !isString(dob)) {
    throw new Error("DOB not inputted correctly: " + dob);
  }
  return dob;
};

const parseSSN = (SSN: unknown): string => {
  if (!SSN || !isString(SSN)) {
    throw new Error("SSN not inputted correctly: " + SSN);
  }
  return SSN;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("occupation not inputted correctly: " + occupation);
  }
  return occupation;
};

// all validation for the input should be done in utils
export const toNewPatientEntry = (patientObject: unknown): NewPatientEntry => {
  if (!patientObject || typeof patientObject !== "object") {
    throw new Error("Invalid patient input");
  }
  if (
    "name" in patientObject &&
    "dateOfBirth" in patientObject &&
    "ssn" in patientObject &&
    "gender" in patientObject &&
    "occupation" in patientObject
  ) {
    return {
      name: parseName(patientObject.name),
      dateOfBirth: parseDOB(patientObject.dateOfBirth),
      ssn: parseSSN(patientObject.ssn),
      gender: parseGender(patientObject.gender),
      occupation: parseOccupation(patientObject.occupation),
    };
  } else {
    throw new Error("Some fields are missing");
  }
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return object as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Date not inputted correctly: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Specialist not inputted correctly: " + specialist);
  }

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Description not inputted correctly" + description);
  }

  return description;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (typeof discharge !== "object" || !discharge) {
    throw new Error("no discharge date");
  } else if ("date" in discharge && "criteria" in discharge) {
    if (!isString(discharge.date) || !isString(discharge.criteria)) {
      throw new Error("Start and end date inputted incorrectly");
    }

    return {
      date: discharge.date,
      criteria: discharge.criteria,
    };
  } else {
    throw new Error("Discharge fields inputted incorrectly");
  }
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Employer name incorrectly inputted" + employerName);
  }

  return employerName;
};

const isHealthCheckRating = (
  healthCheckRating: unknown
): healthCheckRating is HealthCheckRating => {
  return Boolean(
    Object.values(HealthCheckRating)
      .map((r) => r.toString())
      .find((rating) => rating === healthCheckRating)
  );
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "health check rating incorrectly inputted" + healthCheckRating
    );
  }
  return healthCheckRating as HealthCheckRating;
};

export const toNewEntryForPatient = (entryObject: unknown): EntryWithoutId => {
  if (!entryObject || typeof entryObject !== "object") {
    throw new Error("invalid entry!");
  }
  if (
    "date" in entryObject &&
    "specialist" in entryObject &&
    "diagnosisCodes" in entryObject &&
    "description" in entryObject &&
    "type" in entryObject
  ) {
    const baseDetails = {
      date: parseDate(entryObject.date),
      specialist: parseSpecialist(entryObject.specialist),
      diagnosisCodes: parseDiagnosisCodes(entryObject.diagnosisCodes),
      description: parseDescription(entryObject.description),
    };
    let typeSpefcificDetails;
    const intermediateEntry = { ...entryObject, ...baseDetails };
    const { type } = entryObject;

    switch (type) {
      case "Hospital":
        typeSpefcificDetails = parseHospital(intermediateEntry);
        break;
      case "HealthCheck":
        typeSpefcificDetails = parseHealthCheck(intermediateEntry);
        break;
      case "OccupationalHealthcare":
        typeSpefcificDetails = parseOccupationalHealthcare(intermediateEntry);

        break;
      default:
        throw new Error("Wrong entry type");
    }

    return { ...baseDetails, ...typeSpefcificDetails };
  } else {
    throw new Error("base fields missing");
  }
};

const parseHospital = (entry: BaseEntryWithoutId) => {
  if ("discharge" in entry) {
    return {
      discharge: parseDischarge(entry.discharge),
      type: "Hospital" as const,
    };
  }

  throw new Error("Hospital entry wrongly formatted" + JSON.stringify(entry));
};

const parseHealthCheck = (entry: BaseEntryWithoutId) => {
  if ("healthCheckRating" in entry) {
    return {
      healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      type: "HealthCheck" as const,
    };
  }

  throw new Error(
    "Health Check rating wrongly formatted" + JSON.stringify(entry)
  );
};

const parseOccupationalHealthcare = (entry: BaseEntryWithoutId) => {
  if ("employerName" in entry) {
    return {
      employerName: parseEmployerName(entry.employerName),
      type: "OccupationalHealthcare" as const,
    };
  }

  throw new Error("occupation wrongly formatted" + JSON.stringify(entry));
};
