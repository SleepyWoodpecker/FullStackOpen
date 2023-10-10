const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ courseParts }) => {
  const parts = courseParts.map((part) => {
    return (
      <p key={part.name}>
        {part.name} {part.exercises}
      </p>
    );
  });
  return <div>{parts}</div>;
};

const Total = ({ courseParts }) => {
  return <p>Number of exercises {courseParts.length}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </div>
  );
};

export default App;
