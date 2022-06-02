import countryCode from "../Data/CountryCode.json";
import { addYears, subMonths } from "date-fns";
import { BaseSyntheticEvent, useState } from "react";
import { SearchObjectType } from "../Data/Constants";

export const SearchForm = (props: { handleSearch: Function, searchObject: SearchObjectType }) => {
  const [interimObj, setInterimObj] = useState(props.searchObject);

  const minDate = subMonths(Date.now(), 3).toISOString().slice(0, 10);
  const maxDate = addYears(Date.now(), 1).toISOString().slice(0, 10);

  const handleInput = (event : BaseSyntheticEvent) => {
    setInterimObj({ ...interimObj, [event.target.id]: event.target.value });
  };
  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if(interimObj.dateFrom > interimObj.dateTo){
      window.alert("Date to should be after Date From!");
      return;
    }
    props.handleSearch(interimObj);
  };

  // console.log("interimObj", interimObj);
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="country">Country:</label>
        <select id="country" onChange={handleInput} required value={interimObj.country}>
          <option> Select Country</option>
          {countryCode.map((ele) => (
            <option value={ele.code} key={ele.code}>
              {ele.name}
            </option>
          ))}
        </select>
        <label htmlFor="dateFrom">Date From:</label>
        <input
          type="datetime-local"
          id="dateFrom"
          value={interimObj.dateFrom}
          min={minDate}
          max={maxDate} required
          onChange={handleInput}
        />
        <label htmlFor="dateTo">Date To:</label>
        <input
          type="datetime-local"
          id="dateTo"
          value={interimObj.dateTo}
          max={maxDate}
          min={interimObj.dateFrom} required
          onChange={handleInput}
        />
        <label htmlFor="keywords">Keywords:</label>
        <input type="text" id="keywords" onChange={handleInput} value={interimObj.keywords} />
        <button onClick={() => setInterimObj({...interimObj, clickSearch: true})}>GO!</button>
      </fieldset>
    </form>
  );
};
