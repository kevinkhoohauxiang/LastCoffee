//import { useContext } from 'react';
import Card from './Card';
import classes from './SBItem.module.css';


function SBItem(props) {


  function changeState(props) {
    console.log("changed")
    props.completed = true;
    console.log(props.completed)
  }
  

  return (
    <li className={classes.item}>
      <Card>
        
        <div className={classes.content}>
          <h3>{props.info}</h3>
          {props.description}
          <br/>
          {props.number} 
          <br/>
          {props.location}
          <br/>
          {props.timing}
          <br/>
          {props.gender}
          <br/>
          {props.subjects}
        </div>
        <button onClick={changeState}>Send Request!!!</button>
        
      </Card>
    </li>
  );
}

export default SBItem;
