import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Link, ListSubheader, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TicketmasterEventType } from "../Data/Constants";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';



//Flexbox between Arist Line up and venue
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
      <Typography variant="h3" component="h1" gutterBottom>{data.name}</Typography>
      <img
        src={data?.images.filter((ele) => ele.width === 640)[0].url}
        alt={data.name}
      />
      <Grid container columnGap={3} justifyContent="center" >
      <Grid item id="artist-venue">
        {data._embedded.attractions === undefined ? (
          ""
        ) : (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Artist Lineup</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ImageList>
                {data._embedded.attractions.map((ele) => (
                  <ImageListItem key={ele.name}>
                    <img
                      src={ele.images.filter((img) => img.width <= 300)[0].url}
                      alt={ele.name}
                    />
                    <ImageListItemBar
                      title={ele.name}
                      subtitle={`Genre: ${ele.classifications[0].genre.name} - ${ele.classifications[0].subGenre.name}`}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${ele.name}`}
                        >
                          <Link href={ele.url} key={ele.id} color="inherit" target="_blank"> 
                            <InfoIcon />
                          </Link>
                        </IconButton>
                      }
                    ></ImageListItemBar>
                  </ImageListItem>
                ))}
              </ImageList>
            </AccordionDetails>
          </Accordion>
        )}
        </Grid>
        <Grid item>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Venue</Typography>
            </AccordionSummary>
            {data._embedded.venues[0].images === undefined ? (<>
                        <Typography>{data._embedded.venues[0].name}</Typography>
                        <IconButton><Link href={data._embedded.venues[0].url} color="inherit" target="_blank"><InfoIcon /></Link></IconButton></>
            ) : (<>
            <Typography>{data._embedded.venues[0].name}</Typography>
              <img
                src={
                  data._embedded.venues[0].images.filter(
                    (ele) => ele.ratio === "16_9"
                  )[0].url
                }
              /><IconButton><Link href={data._embedded.venues[0].url} color="inherit" target="_blank"><InfoIcon /></Link></IconButton>
              </>
            )}
            <Typography>
              {data._embedded.venues[0].city.name},{" "}
              {data._embedded.venues[0].state?.name},{" "}
              {data._embedded.venues[0].country.name} <br /> Postal Code:{" "}
              {data._embedded.venues[0].postalCode}
            </Typography>
        </Accordion>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={goToEventPage}>
            Buy Now!
          </Button>
        </Grid>
        <Grid item>
          <Button color="success" variant="contained" onClick={() => nav("/")}>
            Return To Results
          </Button>
        </Grid>
      </Grid>
      <Typography component={'footer'} variant='caption'>{data.pleaseNote}</Typography>
    </main>
  );
};
