import SBItem from './SBItem';
import classes from './SBList.module.css';

function SBList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <SBItem
          key={event.id}
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

export default SBList;
