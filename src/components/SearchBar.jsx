import React, { useState } from "react";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function submitSearch(event) {
    props.onSearch(searchTerm);
    event.preventDefault();
  }

  return (
    <div >
      <form className="form-inline">
        <label id="labels" htmlFor="search">
          Search:&nbsp;
        </label>
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          className=""
          id="search"
          name="search"
          placeholder="Search"
        />
        &nbsp;
        <button onClick={submitSearch} type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
