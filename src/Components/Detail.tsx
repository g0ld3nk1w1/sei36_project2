import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TicketmasterEventType } from "../Data/Constants";


export const Detail = () => {
  const { eventID } = useParams();
  const nav = useNavigate();
const [data, setData] = useState<TicketmasterEventType>({} as TicketmasterEventType);
  const url = `${import.meta.env.VITE_BASE_URL}events/${eventID}.json?apikey=${import.meta.env.VITE_API_KEY}`;
// console.log("details", url);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  },[]);


  
const goToEventPage = () => {
    window.open(data.url,"_blank")
}
// console.log(data);
if(Object.keys(data).length === 0) return null;
  else return (
    <main>
      <h1>{data.name}</h1>
      <img
        src={data?.images.filter((ele) => ele.width === 640)[0].url}
        alt={data.name}
      />
      <div id="artist-venue">
        {data._embedded.attractions === undefined ? "" :
        <details>
          <summary>Artist Lineup:</summary>
          {data._embedded.attractions.map(ele =>(
              <a href= {ele.url} key={ele.id}>
              <img src={ele.images.filter(img => img.width<=300)[0].url} alt={ele.name}/>
              <h2>{ele.name}</h2>
              <h3>{ele.classifications[0].segment.name} Genre: {ele.classifications[0].genre.name} - {ele.classifications[0].subGenre.name}</h3>
              </a>
          ))}
        </details>
        }
        <details>
          <summary>Venue:</summary>
          <a href={data._embedded.venues[0].url}>
          <h2>{data._embedded.venues[0].name}</h2>
          {data._embedded.venues[0].images === undefined ? "" : <img src={data._embedded.venues[0].images.filter(ele => ele.ratio === "16_9")[0]?.url} />}
          <h3>{data._embedded.venues[0].city.name}, {data._embedded.venues[0].state?.name}, {data._embedded.venues[0].country.name} <br/> Postal Code: {data._embedded.venues[0].postalCode}</h3>
          </a>
        </details>
      </div>
      <button onClick={goToEventPage}>Buy Now!</button>
      <button onClick={()=> nav("/")}> Return To Results</button>
      <footer>
          {data.pleaseNote}
      </footer>
    </main>
  );
};
