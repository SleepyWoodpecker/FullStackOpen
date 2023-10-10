import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        <p>{text}</p>
      </td>
      <td>
        <p> {value}</p>
      </td>
    </tr>
  );
};

const Statistics = ({ total, good, neutral, bad, totalScore }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={totalScore / total} />
        <StatisticLine text="positive" value={(good / total) * 100} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleGoodVote = () => {
    setGood(good + 1);
    setTotalScore(totalScore + 1);
  };

  const handleNeutralVote = () => {
    setNeutral(neutral + 1);
  };

  const handleBadVote = () => {
    setBad(bad + 1);
    setTotalScore(totalScore - 1);
  };

  const total = good + neutral + bad;

  return (
    <div>
      <h1>Give feedack</h1>
      <Button text="good" handleClick={handleGoodVote} />
      <Button text="neutral" handleClick={handleNeutralVote} />
      <Button text="bad" handleClick={handleBadVote} />
      <h2>Statistics</h2>
      {total ? (
        <Statistics
          total={total}
          good={good}
          neutral={neutral}
          bad={bad}
          totalScore={totalScore}
        />
      ) : (
        <p>No feedback given yet</p>
      )}
    </div>
  );
};

export default App;
