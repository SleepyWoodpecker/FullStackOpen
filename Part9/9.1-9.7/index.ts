import express from "express";
const app = express();
app.use(express.json());

// components
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise, exerciseAnalysis } from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.status(200).send(`Hello full stack!`);
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmiResults: string = calculateBmi(Number(height), Number(weight));
    return res.status(200).json({ height, weight, bmi: bmiResults });
  }

  return res.status(400).send({ error: "malformatted input" });
});

app.post("/calculateExercise", (req, res) => {
  const { target, daily_exercise } = req.body;
  console.log(daily_exercise);
  const checkExerciseNumbers = (daily_exercise: number[]): boolean => {
    for (const exercise of daily_exercise) {
      if (isNaN(Number(exercise))) {
        return false;
      }
    }
    return true;
  };

  if (!isNaN(Number(target)) && checkExerciseNumbers(daily_exercise)) {
    const exerciseData: exerciseAnalysis = calculateExercise(
      daily_exercise,
      target
    );
    return res.status(200).send(exerciseData);
  }

  return res.status(400).send({ error: "malformatted input" });
});

app.listen(3003, () => `Connected to port 3003`);
