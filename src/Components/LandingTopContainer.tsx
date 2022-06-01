//Will always pull one suggest to load the page.
//will trigger sibling to display results
import { useEffect, useState } from "react";
import sampleSuggestResponse from "../SampleResponses/suggest.json";
import { SearchForm } from "./SearchForm";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://app.ticketmaster.com/discovery/v2/suggest.json?size=1&apikey=${API_KEY}`;

// console.log("url at landingTopContainer", url);

export const LandingTopContainer = (props : {handleSearch : Function}) => {
  const [initImg, setInitImg] = useState({});
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
    <section id="landingTopContainer">
      <h1>Ticketmaster Explorer!</h1>
      <a href= {initImg["event-link"]}><img src={initImg.imgurl} alt={initImg.alt} /></a>
    <SearchForm handleSearch={props.handleSearch}/>
    </section>
  );
};
