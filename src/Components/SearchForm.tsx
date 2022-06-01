import countryCode from "../Data/CountryCode.json";
import { addYears, subMonths } from "date-fns";
import { useState } from "react";

export const SearchForm = (props: { handleSearch: Function }) => {
  const [interimObj, setInterimObj] = useState({});

  const minDate = subMonths(Date.now(), 3).toISOString().slice(0, 10);
  const maxDate = addYears(Date.now(), 1).toISOString().slice(0, 10);

  const handleInput = (event) => {
    setInterimObj({ ...interimObj, [event.target.id]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSearch(interimObj);
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="country">Country:</label>
        <select id="country" onChange={(e) => handleInput(e)}>
          {countryCode.map((ele) => (
            <option value={ele.code} key={ele.code}>
              {ele.name}
            </option>
          ))}
        </select>
        <label htmlFor="dateFrom">Date From:</label>
        <input
          type="date"
          id="dateFrom"
          min={minDate}
          max={maxDate}
          onChange={(e) => handleInput(e)}
        />
        <label htmlFor="dateTo">Date To:</label>
        <input
          type="date"
          id="dateTo"
          max={maxDate}
          min={minDate}
          onChange={(e) => handleInput(e)}
        />
        <label htmlFor="keywords">Keywords:</label>
        <input type="text" id="keywords" onChange={(e) => handleInput(e)} />
        <button>GO!</button>
      </fieldset>
    </form>
  );
};
