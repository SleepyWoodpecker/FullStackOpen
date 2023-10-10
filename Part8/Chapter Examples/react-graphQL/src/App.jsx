import { useQuery } from "@apollo/client";
import AddNewPerson from "./components/AddNewPerson";
import { ALL_PERSONS } from "./queries";

// useQuery will store its loading state in result.loading

function App() {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <>Loading...</>;
  }

  console.log(result.data);
  return (
    <>
      <AddNewPerson />
    </>
  );
}

export default App;
