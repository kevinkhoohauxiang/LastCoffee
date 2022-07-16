import { useState } from "react";
import Card from "../../../action/Card";
import classes from "./SearchSBForm.module.css";
import db from "../../../firebase";
import firebase from "firebase/app";

function SearchSBForm(props) {
  const [SearchLocation, setSearchLocation] = useState("");
  const [SearchTiming, setSearchTiming] = useState("");
  const [SearchGender, setSearchGender] = useState("");
  const [SearchFaculty, setSearchFaculty] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    const displayData = {
      location: SearchLocation,
      timing: SearchTiming,
      gender: SearchGender,
      faculty: SearchFaculty,
    };

    //console.log(displayData);
    props.onAddData(displayData);
  }

  function handleLocationChange(event) {
    setSearchLocation(event.target.value);
    //console.log(event.target.value);
  }

  function handleTimingChange(event) {
    setSearchTiming(event.target.value);
    //console.log(event.target.value);
  }
  function handleGenderChange(event) {
    setSearchGender(event.target.value);
    //console.log(event.target.value);
  }

  function handleFacultyChange(event) {
    setSearchFaculty(event.target.value);
    //console.log(event.target.value);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <br />
        <div className={classes.control}>
          <label htmlFor="location">Preferred Study Locations</label>
          <input
            type="text"
            onChange={handleLocationChange}
            placeholder="Location"
          />
        </div>
        <br />
        <div className={classes.control}>
          <label htmlFor="timing">Preferred Study Timings</label>
          <input
            type="text"
            onChange={handleTimingChange}
            placeholder="Timing"
          />
        </div>
        <br />
        <div className={classes.control}>
          <label htmlFor="gender">Preferred Gender </label>
          <input
            type="text"
            onChange={handleGenderChange}
            placeholder="Gender"
          />
        </div>
        <br />
        <div className={classes.control}>
          <label htmlFor="faculty">Preferred Faculty </label>
          <input
            type="text"
            onChange={handleFacultyChange}
            placeholder="Faculty"
          />
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default SearchSBForm;
