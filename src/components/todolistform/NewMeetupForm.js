import { useRef } from 'react';
import Card from './Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm(props) {
    const titleInputRef = useRef();
    const deadlineInputRef = useRef();
    const descriptionInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredTitle = titleInputRef.current.value;
      const enteredDeadline = deadlineInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
  
      const meetupData = {
        title: enteredTitle,
        deadline: enteredDeadline,
        completed: false,
        description: enteredDescription,
      };
  
      console.log(meetupData)
      //props.onAddMeetup(meetupData);
    }
  
    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='title'>To-do Event Title</label>
            <input type='text' required id='title' ref={titleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='deadline'>To-do Event Deadline</label>
            <input type='date' required id='deadline' ref={deadlineInputRef} />
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
            <button>Add To Do Event</button>
          </div>
        </form>
      </Card>
    );
  }
  
  export default NewMeetupForm;

