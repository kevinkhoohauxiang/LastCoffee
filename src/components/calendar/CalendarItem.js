//import { useContext } from 'react';
import Card from './Card';
import classes from './CalendarItem.module.css';


function CalendarItem(props) {
  

  return (
    <li className={classes.item}>
      <Card>
        
        <div className={classes.content}>
          <h3>{props.title}</h3>
          {props.startDate}
          {props.startTime}
          <br/>
          {props.endDate}
          {props.endTime}
          <br />
          {props.description}
        </div>
        
        
      </Card>
    </li>
  );
}

export default CalendarItem;
