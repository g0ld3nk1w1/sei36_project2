import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { TicketmasterEventType } from "../Data/Constants";

export const Results = (props: { item: TicketmasterEventType }) => {
  const nav =useNavigate();
  return (
    <Card variant="outlined" sx ={{width:300, mx:4, mb: 4}}>
      <CardContent><CardActionArea>
    <article onClick={() => {nav(`/details/${props.item.id}`)}}>
      <CardMedia
      component="img"
        image={
          props.item.images.filter(
            (ele) => ele.ratio === "16_9" && ele.width === 205
          )[0].url
        }
        alt={props.item.name}
      />
      <Typography variant="h5">{props.item.name}</Typography>
      <Typography variant="subtitle1">
        Starts: {parseISO(props.item.dates.start.localDate).toDateString()} 
        {props.item.dates.start.localTime ? ` at ${props.item.dates.start.localTime?.slice(0,5)}` : ""}
      </Typography>
      <Typography variant="subtitle2">
        {props.item._embedded.venues[0].name ? `${props.item._embedded.venues[0].name} at `:"" }<br/>
        {props.item._embedded.venues[0].state ? `${props.item._embedded.venues[0].state.name}, `:"" }
        {props.item._embedded.venues[0].city.name},<br/>
        {props.item._embedded.venues[0].country.name}<br/>
      </Typography>
    </article>
    </CardActionArea>
    </CardContent>
    </Card>
  );
};

