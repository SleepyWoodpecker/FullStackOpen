import {
  Diagnosis,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from "../../types";

const isString = (s: unknown): s is string => {
  return typeof s === "string" || s instanceof String;
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  return Boolean(
    Object.values(HealthCheckRating)
      .map((r) => r.toString())
      .find((healthRatings) => healthRatings === rating)
  );
};

export const processedHealthCheckRating = (
  healthCheckRating: string
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Health check rating is wrong");
  }
  return healthCheckRating as HealthCheckRating;
};

export const processedDiagnosisCodes = (
  diagnosisCodes: string[]
): Array<Diagnosis["code"]> => {
  if (diagnosisCodes) {
    return diagnosisCodes as Array<Diagnosis["code"]>;
  } else {
    return [] as Array<Diagnosis["code"]>;
  }
};

const parseDischargeDate = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error("Discharge date wrongly formatted" + s);
  }
  return s;
};

const parseDischargeCriteria = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error("Discharge criteria wrongly formatted" + s);
  }
  return s;
};

export const processedDischarge = (discharge: unknown): Discharge => {
  if (discharge && typeof discharge === "object") {
    if ("date" in discharge && "criteria" in discharge) {
      return {
        date: parseDischargeDate(discharge.date),
        criteria: parseDischargeCriteria(discharge.criteria),
      };
    }
  }

  throw new Error(
    "Discharge Object wrongly formatted: " + JSON.stringify(discharge)
  );
};

const parseSickLeaveStartDate = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error("Sick leave start date wrongly formatted" + s);
  }
  return s;
};

const parseSickLeaveEndDate = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error("Sick leave end date wrongly formatted" + s);
  }
  return s;
};

export const processedSickLeave = (sickLeave: unknown): SickLeave => {
  if (sickLeave && typeof sickLeave === "object") {
    if ("startDate" in sickLeave && "endDate" in sickLeave) {
      return {
        startDate: parseSickLeaveStartDate(sickLeave.startDate),
        endDate: parseSickLeaveEndDate(sickLeave.endDate),
      };
    }
  }
  throw new Error("Sick Leave malformatted" + JSON.stringify(sickLeave));
};
