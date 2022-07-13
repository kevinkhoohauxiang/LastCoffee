import { useRef } from "react";
import Card from "../../../action/Card";
import classes from "./NewToDoForm.module.css";

function NewToDoForm(props) {
  const titleInputRef = useRef();
  const deadlineInputRef = useRef();
  const descriptionInputRef = useRef();
  const userUID = props.userUID;

  //console.log(props)

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDeadline = deadlineInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const todoData = {
      userUID: userUID,
      title: enteredTitle,
      deadline: enteredDeadline,
      completed: false,
      description: enteredDescription,
    };

    //console.log(todoData)
    props.onAddtodo(todoData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">To-do Event Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="deadline">To-do Event Deadline</label>
          <input type="date" required id="deadline" ref={deadlineInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="3"
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

export default NewToDoForm;
