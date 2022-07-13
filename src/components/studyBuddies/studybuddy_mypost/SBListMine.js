import SBItem from "./SBItem";
import classes from "./SBList.module.css";

function SBListMine(props) {
  if (props.events.length === 0) {
    console.log(props.events.length);
    return <h2>empty</h2>;
  } else {
    return (
      <ul className={classes.list}>
        {props.events.map((event) => (
          <SBItem
            key={event.id}
            // *bug solved* note: userUID not passed into the db
            userUID={props.userUID}
            id={event.id}
            posterUID={event.posterUID}
            gender={event.gender}
            info={event.info}
            location={event.location}
            number={event.number}
            timing={event.timing}
            subjects={event.subjects}
            description={event.description}
          />
        ))}
      </ul>
    );
  }
}

export default SBListMine;
