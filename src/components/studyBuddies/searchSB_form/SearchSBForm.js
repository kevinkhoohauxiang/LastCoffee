import React, { useState } from "react";
import Card from "../../../action/Card";
import classes from "./SearchSBForm.module.css";

import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";

function SearchSBForm(props) {
  const [SearchNumberSB, setSearchNumberSB] = useState("");
  const [SearchLocation, setSearchLocation] = useState("");
  const [SearchTiming, setSearchTiming] = useState("");
  const [SearchGender, setSearchGender] = useState("");
  const [SearchFaculty, setSearchFaculty] = useState("");

  //const [optionValue, setOptionValue] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    const displayData = {
      number: SearchNumberSB,
      location: SearchLocation,
      timing: SearchTiming,
      gender: SearchGender,
      faculty: SearchFaculty,
      //test: optionValue,
    };

    //console.log(displayData);
    props.onAddData(displayData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="numberSBs">Preferred Number of Study Buddies:</label>
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

export default SearchSBForm;
