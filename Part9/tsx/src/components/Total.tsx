interface TotalProps {
  totalExercises: number;
}

function Total(totalProps: TotalProps) {
  const { totalExercises } = totalProps;
  return <p>Number of exercises {totalExercises}</p>;
}

export default Total;
