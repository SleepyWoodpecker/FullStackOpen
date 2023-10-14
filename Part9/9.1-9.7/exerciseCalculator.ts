import { isNumber } from "./utils";

interface argumentValues {
  targetTime: number;
  dailyExercise: number[];
}

function checkArguments(args: string[]): argumentValues {
  if (args.length < 4) throw new Error("Need at least 4 arguments");

  function evaluateDailyHours(hours: string[]): boolean {
    for (const hour of hours) {
      if (!isNumber(hour)) {
        return false;
      }
    }

    return true;
  }

  if (isNumber(args[2]) && evaluateDailyHours(args.slice(3))) {
    const exerciseNumbers: number[] = args.slice(3).map((arg) => Number(arg));
    return {
      targetTime: Number(args[2]),
      dailyExercise: exerciseNumbers,
    };
  }

  throw new Error(`All arguments should be numbers!`);
}

export interface exerciseAnalysis {
  days: number;
  trainingDays: number;
  targetTime: number;
  avgTime: number;
  targetReached: boolean;
  rating: number;
  explanation: string;
}

export function calculateExercise(
  dailyExerciseHous: number[],
  targetTime: number
): exerciseAnalysis {
  const days: number = dailyExerciseHous.length;
  const trainingDays: number = dailyExerciseHous.filter(
    (hours) => hours > 0
  ).length;
  const avgTime: number =
    dailyExerciseHous.reduce((total, hours) => total + hours, 0) / days;
  const targetReached: boolean = avgTime >= targetTime;
  let explanation: string;
  let rating: number;
  if (targetReached) {
    explanation = "well done, keep it up";
    rating = 3;
  } else if (targetTime - avgTime <= 0.5) {
    explanation = "almost there";
    rating = 2;
  } else {
    explanation = "keep trying";
    rating = 1;
  }

  const results: exerciseAnalysis = {
    days,
    trainingDays,
    targetTime,
    avgTime,
    targetReached,
    rating,
    explanation,
  };

  return results;
}

try {
  const { targetTime, dailyExercise } = checkArguments(process.argv);
  console.log(calculateExercise(dailyExercise, targetTime));
} catch (err) {
  let errorMessage = "Error: ";
  if (err instanceof Error) {
    errorMessage += err.message;
  }
  console.log(errorMessage);
}
