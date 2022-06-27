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
          <h3>Info: {props.info}</h3>
          {props.description}
          <br/>
          <br/>
          Preferred number of study buddies: {props.number} 
          <br/>
          Preferred studying locations: {props.location}
          <br/>
          Preferred study timings: {props.timing}
          <br/>
          Preferred gender: {props.gender}
          <br/>
          Preferred course / modules: {props.subjects}
        </div>
        <button onClick={changeState}>Send Request!!!</button>
        
      </Card>
    </li>
  );
}

export default SBItem;
