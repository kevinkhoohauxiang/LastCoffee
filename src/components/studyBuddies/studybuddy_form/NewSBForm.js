import { useRef } from "react";
import classes from "./NewSBForm.module.css";
import Card from "../../../action/Card";
import Firebase from "firebase";

function NewSBForm(props) {
  const genderInputRef = useRef();
  const infoInputRef = useRef();
  const locationInputRef = useRef();
  const numberInputRef = useRef();
  const timingInputRef = useRef();
  const descriptionInputRef = useRef();
  const subjectsInputRef = useRef();
  const userUID = props.userUID;
  //console.log(props)

  function submitHandler(event) {
    event.preventDefault();

    const enteredGender = genderInputRef.current.value;
    const enteredInfo = infoInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredNumber = numberInputRef.current.value;
    const enteredTiming = timingInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredSubjects = subjectsInputRef.current.value;

    const SBData = {
      posterUID: userUID,
      gender: enteredGender,
      info: enteredInfo,
      location: enteredLocation,
      number: enteredNumber,
      timing: enteredTiming,
      description: enteredDescription,
      subjects: enteredSubjects,
      timestamp: Firebase.firestore.Timestamp.now(),
    };

    //console.log(SBData)
    props.onAddSB(SBData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="info">My Info</label>
          <input type="text" required id="info" ref={infoInputRef} />
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
        <div className={classes.control}>
          <label htmlFor="number">Preferred Number of Study Buddies</label>
          <input type="text" required id="number" ref={numberInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="location">Preferred Locations</label>
          <input type="text" required id="location" ref={locationInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="timing">Preferred Timing</label>
          <input type="text" required id="timing" ref={timingInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="gender">Gender</label>
          <input type="text" required id="gender" ref={genderInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="subjects">Preferred Course / Modules</label>
          <input type="text" required id="subjects" ref={subjectsInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default NewSBForm;
