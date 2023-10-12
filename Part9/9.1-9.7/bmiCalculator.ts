import { isNumber } from "./utils";

interface arguments {
  height: number;
  weight: number;
}

function parseArguments(args: string[]): arguments {
  if (args.length < 4 || args.length > 4)
    throw new Error("need exactly 4 arguments");

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("height and weight must be numbers");
  }
}

function calculateBmi(height: number, weight: number): string {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight (Unhealthy)";
  } else if (bmi < 23) {
    return "Normal range (Healthy)";
  } else if (bmi < 25) {
    return "Overweight I (At risk)";
  } else if (bmi < 30) {
    return "Overweight II (Moderately obese)";
  } else {
    return "Overweight III (Severely obese)";
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (err: unknown) {
  let errorMessage: string = "Error, ";
  if (err instanceof Error) {
    errorMessage += err.message;
  }
  console.log(errorMessage);
}
