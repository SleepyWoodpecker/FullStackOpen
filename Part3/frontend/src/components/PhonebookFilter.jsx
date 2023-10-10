import React, { useState } from "react";

function PhonebookFilter({ filterSearch, handleFilter }) {
  // const handleFilterChange = (e) => {
  //   setFilterSearch(e.target.value);
  // };

  return (
    <form>
      filter shown with <input value={filterSearch} onChange={handleFilter} />
    </form>
  );
}

export default PhonebookFilter;
