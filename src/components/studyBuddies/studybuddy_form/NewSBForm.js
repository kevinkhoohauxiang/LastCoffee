import React, { useState, useRef } from "react";
import classes from "./NewSBForm.module.css";
import Card from "../../../action/Card";
import Firebase from "firebase";
import { Dropdown } from "react-dropdown-now";

function NewSBForm(props) {
  const infoInputRef = useRef();
  const numberInputRef = useRef();
  const descriptionInputRef = useRef();
  const userUID = props.userUID;
  const [SearchNumberSB, setSearchNumberSB] = useState("");
  const [SearchLocation, setSearchLocation] = useState("");
  const [SearchTiming, setSearchTiming] = useState("");
  const [SearchGender, setSearchGender] = useState("");
  const [SearchFaculty, setSearchFaculty] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    const enteredGender = SearchGender != "" ? SearchGender : "No Preference";
    const enteredInfo = infoInputRef.current.value;
    const enteredLocation =
      SearchLocation != "" ? SearchLocation : "No Preference";
    const enteredNumber =
      SearchNumberSB != "" ? SearchNumberSB : "No Preference";
    const enteredTiming = SearchTiming != "" ? SearchTiming : "No Preference";
    const enteredDescription = descriptionInputRef.current.value;
    const enteredfaculty =
      SearchFaculty != "" ? SearchFaculty : "No Preference";

    const SBData = {
      posterUID: userUID,
      gender: enteredGender,
      info: enteredInfo,
      location: enteredLocation,
      number: enteredNumber,
      timing: enteredTiming,
      description: enteredDescription,
      faculty: enteredfaculty,
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
        <br />

        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="3"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="timing">Preferred Number of Study Buddies:</label>
          <Dropdown
            placeholder="No Preference"
            options={[
              "No preference",
              "1",
              "2",
              "3",
              "4",
              "5",
              "Big Group Studying!",
            ]}
            onChange={(event) => setSearchNumberSB(event.value)}
            onSelect={(event) => setSearchNumberSB(event.value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) =>
              console.log("closedBySelection?:", closedBySelection)
            }
            onOpen={() => console.log("open!")}
          />
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="location">Preferred Study Locations:</label>
          <Dropdown
            placeholder="No Preference"
            options={[
              "No preference",
              "Business",
              "Central Library",
              "Computing",
              "Faculty of Arts and Social Science",
              "Halls, Residential Colleges and Residences",
              "Law",
              "Medicine",
              "NUH",
              "Science",
              "School of Design and Engineering",
              "UTown",
              "Others",
            ]}
            onChange={(event) => setSearchLocation(event.value)}
            onSelect={(event) => setSearchLocation(event.value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) =>
              console.log("closedBySelection?:", closedBySelection)
            }
            onOpen={() => console.log("open!")}
          />
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="timing">Preferred Study Timings:</label>
          <Dropdown
            placeholder="No Preference"
            options={[
              "No preference",
              "Morning",
              "Afternoon",
              "Evening",
              "Night",
            ]}
            onChange={(event) => setSearchTiming(event.value)}
            onSelect={(event) => setSearchTiming(event.value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) =>
              console.log("closedBySelection?:", closedBySelection)
            }
            onOpen={() => console.log("open!")}
          />
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="faculty">Preferred Gender:</label>
          <Dropdown
            placeholder="No Preference"
            options={["No preference", "Male only", "Female only"]}
            onChange={(event) => setSearchGender(event.value)}
            onSelect={(event) => setSearchGender(event.value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) =>
              console.log("closedBySelection?:", closedBySelection)
            }
            onOpen={() => console.log("open!")}
          />
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="faculty">Preferred Faculty:</label>
          <Dropdown
            placeholder="No Preference"
            options={[
              "No preference",
              "Business",
              "College of Humanities and Sciences (CHS)",
              "College of Design and Engineering (CDE)",
              "Computing",
              "Dentistry",
              "Law",
              "Medicine",
              "Science",
              "Nursing",
              "Pharmacy",
              "Music",
            ]}
            onChange={(event) => setSearchFaculty(event.value)}
            onSelect={(event) => setSearchFaculty(event.value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) =>
              console.log("closedBySelection?:", closedBySelection)
            }
            onOpen={() => console.log("open!")}
          />
        </div>
        <br />

        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default NewSBForm;
