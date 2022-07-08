import CalendarItem from "./CalendarItem";
import classes from "./CalendarList.module.css";

function CalendarList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <CalendarItem
          key={event.id}
          userUID={event.userUID}
          startDate={event.startDate}
          startTime={event.startTime}
          endDate={event.endDate}
          endTime={event.endTime}
          title={event.title}
          //description={event.description}
        />
      ))}
    </ul>
  );
}

export default CalendarList;
