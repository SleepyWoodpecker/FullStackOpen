import { useState } from "react";

function useForm(type) {
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  const clearForm = () => setValue("");
  return {
    type,
    value,
    onChange,
    clearForm,
  };
}

export default useForm;
