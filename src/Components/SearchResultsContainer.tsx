import { Results } from "./Result";
import { SearchObjectType, TicketmasterEventType} from "../Data/Constants";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";


const url = `${import.meta.env.VITE_BASE_URL}events.json?apikey=${import.meta.env.VITE_API_KEY}`;

export const SearchResultsContainer = (props: {searchObject: SearchObjectType}) => {
  // console.log("searchObject", props.searchObject);
  const [resultArr, setResultArr] = useState<TicketmasterEventType[]>([]);
  const [ready, setReady] = useState(false);

  const handleSort = (event: SelectChangeEvent) => {
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
        `&startDateTime=${props.searchObject.dateFrom}`,
        `&endDateTime=${props.searchObject.dateTo}`,
        props.searchObject.keywords === undefined
          ? ""
          : `&keyword=${props.searchObject.keywords.replace(" ", "%20")}`,
          `&sort=date,asc`
      );
      // console.log("fullURL", fullURL);
      fetch(fullURL)
        .then(response => response.json())
        .then(data => {data.page.totalPages === 0 ? setResultArr([]) : setResultArr(data._embedded.events);
        setReady(true)});
    }
    return () =>{setReady(false)}
  }, [props.searchObject]);

  // console.log(resultArr);
  if(resultArr.length === 0 && props.searchObject.clickSearch && ready) return (
    <Box sx={{display:'flex', justifyContent: 'center'}}>
    <Alert severity="info">
    <AlertTitle>No results found!</AlertTitle>
    </Alert>
    </Box>
  );
  else if(ready) return (
    <section>
    <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center',
    alignIems: 'stretch', alignContent: 'center'}}>
      <Box sx={{display:'flex', alignSelf:'center'}}>
        <Select labelId="sort-options" onChange={handleSort} defaultValue={'date-asc'}>
          <MenuItem value="title-asc"> Title Asc</MenuItem>
          <MenuItem value="title-desc"> Title Desc</MenuItem>
          <MenuItem value="date-asc" > Dates Asc</MenuItem>
          <MenuItem value="date-desc"> Dates Desc</MenuItem>
          </Select>
          </Box>
      {resultArr.map((ele) => (
        <Results item={ele} key={ele.id} />
      ))}
      </Box>
    </section>
  );
  else return (<></>);
};
