import { useRef } from 'react';
import Card from './Card';
import classes from './NewCalendarForm.module.css';

function SelectDate(props) {
    const currDateInputRef = useRef();
    
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredcurrDate = currDateInputRef.current.value;
      
      
    }
  
    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          
          <div className={classes.control}>
            <label htmlFor='currDate'>Calendar Event Start Date</label>
            <input type='date' required id='currDate' ref={currDateInputRef} />
          </div>
          
          <div className={classes.actions}>
            <button>Select Date</button>
          </div>
        </form>
      </Card>
    );
  }
  
  export default SelectDate;

