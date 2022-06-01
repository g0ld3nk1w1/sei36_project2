//Basaed on search Object do a fetch
// map the results here into separate results.tsx with links.
// sorting can also be done heree
//if no results show empty;

import { Results } from "./Result";
import mockSearchResult from "../SampleResponses/eventSearch.json";
import { TicketmasterEventType } from "../Data/Constants";

const resultArr = mockSearchResult._embedded.events;

export const SearchResultsContainer = (props: { searchObject: Object }) => {
  return (
    <section>
      <h4>Sort by:</h4>
      <label htmlFor="sort-title-asc">Title Ascending:</label>
      <input
        type="radio"
        value="name"
        id="sort-title-asc"
        name="sorting-options"
      />
      <label htmlFor="sort-title-desc">Title Descending:</label>
      <input
        type="radio"
        value="name"
        id="sort-title-desc"
        name="sorting-options"
      />
      <label htmlFor="sort-dates-asc">Acending Start Dates</label>
      <input
        type="radio"
        value="date"
        id="sort-dates-asc"
        name="sorting-options"
      />
      <label htmlFor="sort-dates-desc">Descending Start Dates</label>
      <input
        type="radio"
        value="date"
        id="sort-dates-desc"
        name="sorting-options"
      />
      <br />
      <button>Filter</button>
      {/* city, Still Available, */}
      {resultArr.map((ele) => (
        <Results item={ele} key={ele.id}/>
      ))}
    </section>
  );
};
