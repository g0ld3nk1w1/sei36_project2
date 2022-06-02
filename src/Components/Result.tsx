import { useNavigate } from "react-router-dom";
import { TicketmasterEventType } from "../Data/Constants";

export const Results = (props: { item: TicketmasterEventType }) => {
  const nav =useNavigate();
  return (
    <article onClick={() => {nav(`/details/${props.item.id}`)}}>
      <img
        src={
          props.item.images.filter(
            (ele) => ele.ratio === "16_9" && ele.width === 100
          )[0].url
        }
        alt={props.item.name}
      />
      <h5>{props.item.name}</h5>
      <h6>
        Event Start date: {props.item.dates.start.localDate}
        {props.item.dates.start.localTime}
      </h6>
      <h6>
        {props.item._embedded.venues[0].name ? `${props.item._embedded.venues[0].name} at `:"" }
        {props.item._embedded.venues[0].country.name},
        {props.item._embedded.venues[0].state ? `${props.item._embedded.venues[0].state.name}, `:"" }
        {props.item._embedded.venues[0].city.name}
      </h6>
    </article>
  );
};

