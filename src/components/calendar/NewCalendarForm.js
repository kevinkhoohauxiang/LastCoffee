import { useRef } from 'react';
import Card from './Card';
import classes from './NewCalendarForm.module.css';

function NewCalendarForm(props) {
    const titleInputRef = useRef();
    const StartDateInputRef = useRef();
    const StartTimeInputRef = useRef();
    const endDateInputRef = useRef();
    const endTimeInputRef = useRef();
    const descriptionInputRef = useRef();
    //console.log(props.user.uid)
    
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredTitle = titleInputRef.current.value;
      const enteredStartDate = StartDateInputRef.current.value;
      const enteredStartTime = StartTimeInputRef.current.value;
      const enteredendDate = endDateInputRef.current.value;
      const enteredendTime = endTimeInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
  
      const CalendarData = {
        title: enteredTitle,
        startDate: enteredStartDate,
        startTime : enteredStartTime,
        endDate: enteredendDate,
        endTime: enteredendTime,
        description: enteredDescription,
      };
  
      //console.log(CalendarData)
      props.onAddCalendar(CalendarData); 
    }
  
    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='title'>Calendar Event Title</label>
            <input type='text' required id='title' ref={titleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='start date'>Calendar Event Start Date</label>
            <input type='date' required id='startDate' ref={StartDateInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='start time'>Calendar Event Start Time</label>
            <input type='time' required id='startTime' ref={StartTimeInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='end date'>Calendar Event end Date</label>
            <input type='date' required id='endDate' ref={endDateInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='end time'>Calendar Event Start Date</label>
            <input type='time' required id='endTime' ref={endTimeInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              required
              rows='3'
              ref={descriptionInputRef}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Add Calendar Event</button>
          </div>
        </form>
      </Card>
    );
  }
  
  export default NewCalendarForm;

