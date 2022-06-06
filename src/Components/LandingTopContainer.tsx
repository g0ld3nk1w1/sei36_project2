import { Box, Card, CardContent, CardMedia, IconButton, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchObjectType } from "../Data/Constants";
// import sampleSuggestResponse from "../SampleResponses/suggest.json";
import { SearchForm } from "./SearchForm";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `${import.meta.env.VITE_BASE_URL}suggest.json?size=1&apikey=${API_KEY}`;


export const LandingTopContainer = (props : {handleSearch : Function, searchObject: SearchObjectType}) => {
  const [initImg, setInitImg] = useState<innerImge[]>([]);
  const initialSuggest = () => {
      fetch(url).then( response => response.json())
      .then(data =>     setInitImg([
        {
          imgurl: data._embedded.venues[0].images[0].url,
          alt: data._embedded.venues[0].name,
          "event-link": data._embedded.venues[0].url,
          name: data._embedded.venues[0].name,
          show: false
        } as innerImge,
        {        imgurl: data._embedded.attractions[0].images.filter((ele: { height: number; })=> ele.height >=500 && ele.height < 640)[0].url,
          alt: data._embedded.attractions[0].name,
          "event-link": data._embedded.attractions[0].url,
          name: data._embedded.attractions[0].name,
          show: true
        } as innerImge,
        {        imgurl: data._embedded.events[0].images.filter((ele: {height: number;})=> ele.height >=500 && ele.height < 640)[0].url,
          alt: data._embedded.events[0].name,
          "event-link": data._embedded.events[0].url,
          name: data._embedded.events[0].name,
        show: false} as innerImge,
      ]));
  }

  // const mockedSuggest = () => {
  //   setInitImg([
  //     {
  //       imgurl: sampleSuggestResponse._embedded.venues[0].images[0].url,
  //       alt: sampleSuggestResponse._embedded.venues[0].name,
  //       "event-link": sampleSuggestResponse._embedded.venues[0].url,
  //       name: sampleSuggestResponse._embedded.venues[0].name,
  //       show: true
  //     } as innerImge,
  //     {        imgurl: sampleSuggestResponse._embedded.attractions[0].images.filter(ele=> ele.height >=500 && ele.height < 640)[0].url,
  //       alt: sampleSuggestResponse._embedded.attractions[0].name,
  //       "event-link": sampleSuggestResponse._embedded.attractions[0].url,
  //       name: sampleSuggestResponse._embedded.attractions[0].name,
  //       show: false
  //     } as innerImge,
  //     {        imgurl: sampleSuggestResponse._embedded.events[0].images.filter(ele=> ele.height >=500 && ele.height < 640)[0].url,
  //       alt: sampleSuggestResponse._embedded.events[0].name,
  //       "event-link": sampleSuggestResponse._embedded.events[0].url,
  //       name: sampleSuggestResponse._embedded.events[0].name,
  //     show: false} as innerImge,
  //   ]);
  // };

  const caroArrow = (n: number) => {
    const currShow = initImg.findIndex(ele => ele.show);
    const newShow = (currShow + n)%3;

    let newInit = [];
    if(currShow + n < 0){
       newInit = initImg.map((ele, i) => {
        if (i == currShow || i === initImg.length - 1)
          return { ...ele, show: !ele.show };
          else return ele;
      });
    } else {
      newInit = initImg.map((ele, i) => {
        if (i == currShow || i === newShow)
          return { ...ele, show: !ele.show };
          else return ele;
      });
    }
    setInitImg(newInit);
  }

  useEffect(() => {
    initialSuggest();
  }, []);

  // console.log(initImg);
  // setTimeout(() => caroArrow(1), 5000);
  return (
    <Box sx={{display:"flex", justifyContent:"center"}}>
    <section id="landingTopContainer" className="section">
      <Typography variant="h3" component="h1" gutterBottom>Search ticketmaster tickets here!</Typography>
      <Box sx={{display:"flex", justifyContent:"center"}}>
      <IconButton onClick={()=> caroArrow(-1)}><ArrowBackIosIcon /></IconButton>
        {initImg.map( (ele,index) =>
        ele.show ? 
        <Card key={index} sx={{alignContent:"center"}}>
          <Link underline="none" color="inherit" href={ele["event-link"]} target="_blank">
          <CardMedia component="img" image={ele.imgurl} alt={ele.alt} sx={{height:500}}/>
          <CardContent id="landingSuggestContent">
          <Typography align="center">
            {ele.name}
          </Typography>
          </CardContent>
          </Link>
        </Card> : ""
        )}
        <IconButton onClick={() => caroArrow(1)}><ArrowForwardIosIcon /></IconButton>
      </Box>
      <Box sx={{display:"flex", justifyContent:"center"}}>
    <SearchForm handleSearch={props.handleSearch} searchObject={props.searchObject}/>
    </Box>
    </section>
    </Box>
  );
};

interface innerImge {
  imgurl: string, alt: string, "event-link": string, name: string, show: boolean
}