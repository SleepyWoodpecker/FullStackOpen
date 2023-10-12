type Operation = "multiply" | "add" | "divide";

// important to put in the default case because in production, type checking does not exist, and it is better to assume that the user will mess something up
const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

// try {
//   console.log(calculator(1, 5, "divide"));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong: ";
//   // no operations are allowed on the unkown type unless type checking is done, as is below (this is better known as narrowing)
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
// }

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

console.log(calculator(a, b, "divide"));
