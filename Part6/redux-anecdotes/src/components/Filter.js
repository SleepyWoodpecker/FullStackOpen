import React from "react";
import { setFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  const style = {
    marginBottom: 10,
  };

  const handleFilter = (e) => dispatch(setFilter(e.target.value));

  return (
    <div style={style}>
      filter <input onChange={handleFilter} />
    </div>
  );
}

export default Filter;
