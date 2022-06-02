//Basaed on search Object do a fetch
// map the results here into separate results.tsx with links.
// sorting can also be done heree
//if no results show empty;

import { Results } from "./Result";
import { SearchObjectType, TicketmasterEventType} from "../Data/Constants";
import { BaseSyntheticEvent, useEffect, useState } from "react";


// = mockSearchResult._embedded.events;
const url = `${import.meta.env.VITE_BASE_URL}events.json?apikey=${import.meta.env.VITE_API_KEY}`;



export const SearchResultsContainer = (props: {searchObject: SearchObjectType}) => {
  // console.log("searchObject", props.searchObject);
  const [resultArr, setResultArr] = useState<TicketmasterEventType[]>([]);
  const [ready, setReady] = useState(false);

  const handleSort = (event: BaseSyntheticEvent) => {
    switch(event.target.value){
      case 'title-asc': 
      resultArr.sort((ele1, ele2) => ele1.name.localeCompare(ele2.name));
      break;
      case 'title-desc': 
      resultArr.sort((ele1, ele2) => ele1.name.localeCompare(ele2.name)).reverse();
      break;
      case 'date-asc': 
      resultArr.sort((ele1, ele2) => Date.parse(ele1.dates.start.dateTime) - Date.parse(ele2.dates.start.dateTime));
      break;
      case 'date-desc': 
      resultArr.sort((ele1, ele2) => Date.parse(ele1.dates.start.dateTime) - Date.parse(ele2.dates.start.dateTime)).reverse();
      break;
  }
  setResultArr([...resultArr]);
    // console.log(resultArr);
}


  useEffect(() => {
    if (!props.searchObject.clickSearch) {
      return;
    } else {
      const fullURL = url.concat(
        props.searchObject.country === undefined ? "" : `&countryCode=${props.searchObject.country}`,
        `&startDateTime=${props.searchObject.dateFrom}:00Z`,
        `&endDateTime=${props.searchObject.dateTo}:00Z`,
        props.searchObject.keywords === undefined
          ? ""
          : `&keyword=${props.searchObject.keywords.replace(" ", "%20")}`,
          `&sort=date,asc`
      );
      console.log("fullURL", fullURL);
      fetch(fullURL)
        .then(response => response.json())
        .then(data => {data.page.totalPages === 0 ? setResultArr([]) : setResultArr(data._embedded.events);
        setReady(true)});
    }
    return () =>{setReady(false)}
  }, [props.searchObject]);

  console.log(resultArr);
  if(resultArr.length === 0 && props.searchObject.clickSearch && ready) return (
    <>
    <h3>No results found for</h3>
    <h4>Country: {props.searchObject.country}</h4>
    </>
  );
  else if(ready) return (
    <section>
      <label htmlFor="sort-options">Sort By:</label>
        <select id="sort-options" onChange={handleSort} defaultValue={'date-asc'}>
          <option value="title-asc"> Title Asc</option>
          <option value="title-desc"> Title Desc</option>
          <option value="date-asc" > Dates Asc</option>
          <option value="date-desc"> Dates Desc</option>
          </select>
      <br />
      {resultArr.map((ele) => (
        <Results item={ele} key={ele.id} />
      ))}
    </section>
  );
  else return (<></>);
};
