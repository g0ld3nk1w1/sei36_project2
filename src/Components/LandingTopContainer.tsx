import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { SearchObjectType } from "../Data/Constants";
import sampleSuggestResponse from "../SampleResponses/suggest.json";
import { SearchForm } from "./SearchForm";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `${import.meta.env.VITE_BASE_URL}suggest.json?size=1&apikey=${API_KEY}`;


export const LandingTopContainer = (props : {handleSearch : Function, searchObject: SearchObjectType}) => {
  const [initImg, setInitImg] = useState<innerImge>({} as innerImge);
//   const initialSuggest = () => {
//       fetch(url).then( response => response.json())
//       .then(data => setInitImg({
//           imgurl: data._embedded.venues[0].images[0].url,
//           alt: data._embedded.venues[0].name,
//           "event-link": data._embedded.venues[0].url
//       }));
//   }

  const mockedSuggest = () => {
    setInitImg({
      imgurl: sampleSuggestResponse._embedded.venues[0].images[0].url,
      alt: sampleSuggestResponse._embedded.venues[0].name,
      "event-link": sampleSuggestResponse._embedded.venues[0].url
    });
  };

  useEffect(() => {
    mockedSuggest();
  }, []);

  return (
    <Box sx={{display:"flex", justifyContent:"center"}}>
    <section id="landingTopContainer" className="section">
      <h1 className="title">Ticketmaster Explorer!</h1>
      <a href= {initImg["event-link"]}><img src={initImg.imgurl} alt={initImg.alt} /></a>
      <Box sx={{display:"flex", justifyContent:"center"}}>
    <SearchForm handleSearch={props.handleSearch} searchObject={props.searchObject}/>
    </Box>
    </section>
    </Box>
  );
};

interface innerImge {
  imgurl: string, alt: string, "event-link": string
}