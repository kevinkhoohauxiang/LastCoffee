import { useRef } from 'react';
import Card from './Card';
import classes from './NewContactUsForm.module.css';

function NewContactUsForm(props) {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const subjectInputRef = useRef();
    const descriptionInputRef = useRef();
    //console.log(props)
    
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredname = nameInputRef.current.value;
      const enteredemail = emailInputRef.current.value;
      const enteredsubject = subjectInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
  
      const ContactUsData = {
        name: enteredname,
        email: enteredemail,
        subject: enteredsubject,
        description: enteredDescription,
      };
  
      //console.log(ContactUsData)
      props.onAddContactUs(ContactUsData); 
    }
  
    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='name'>Name</label>
            <input type='text' required id='name' ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='email'>Email / Phone Number</label>
            <input type='text' required id='email' ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='subject'>Subject</label>
            <input type='text' required id='subject' ref={subjectInputRef} />
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
            <button>Submit</button>
          </div>
        </form>
      </Card>
    );
  }
  
  export default NewContactUsForm;

