import { useState } from "react";
import Card from "../../action/Card";
import classes from "./EditProfileForm.module.css";
import db from "../../firebase";
import firebase from "firebase/app";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";

function EditProfileForm(props) {
  const [DisplayName, setDisplayName] = useState("");
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");
  const userUID = props.userUID;
  const [NewDisplayName, setNewDisplayName] = useState("");
  const [NewContactInfo, setNewContactInfo] = useState("");
  const [NewDisplayInfo, setNewDisplayInfo] = useState("");
  const [NewGender, setNewGender] = useState("");
  const [NewFaculty, setNewFaculty] = useState("");
  const [NewYear, setNewYear] = useState("");
  const oldData = [];

  function renderDoc(doc) {
    const ContactInfo = doc.data().Actor.contact_info;
    const DisplayInfo = doc.data().Actor.display_info;
    const DisplayName = doc.data().Actor.display_name;
    const Gender = doc.data().Actor.gender;
    const Faculty = doc.data().Actor.faculty;
    const Year = doc.data().Actor.year;
    setDisplayPicture(doc.data().Actor.display_picture);
    setDisplayName(DisplayName);
    setContactInfo(ContactInfo);
    setDisplayInfo(DisplayInfo);

    oldData.push(DisplayName, ContactInfo, DisplayInfo, Gender, Faculty, Year);
  }

  const Set_Values = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", userUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          renderDoc(doc);
        }
      )
    );

  function submitHandler(event) {
    event.preventDefault();
    const newData = [];
    const finalData = [];
    newData.push(
      NewDisplayName,
      NewContactInfo,
      NewDisplayInfo,
      NewGender,
      NewFaculty,
      NewYear
    );

    for (let i = 0; i < oldData.length; i++) {
      const oldValue = oldData[i];
      const newValue = newData[i];
      if (newValue === "") {
        finalData.push(oldValue);
      } else {
        finalData.push(newValue);
      }
    }

    const displayData = {
      Actor: {
        display_name: finalData[0],
        contact_info: finalData[1],
        display_picture: DisplayPicture,
        display_info: finalData[2],
        gender: finalData[3],
        faculty: finalData[4],
        year: finalData[5],
      },
    };

    //console.log(displayData);
    props.onAddData(displayData);
  }

  function handleNameChange(event) {
    setNewDisplayName(event.target.value);
    //console.log(event.target.value);
  }

  function handleContactInfoChange(event) {
    setNewContactInfo(event.target.value);
    //console.log(event.target.value);
  }

  function handleDisplayInfoChange(event) {
    setNewDisplayInfo(event.target.value);
    //console.log(event.target.value);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Display Name: {DisplayName}</label>
          <input
            type="text"
            onChange={handleNameChange}
            //setNewDisplayName(event.value)}
            placeholder="New Name"
          />
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="email">Contact Info: {ContactInfo}</label>
          <input
            type="text"
            onChange={handleContactInfoChange}
            placeholder="New Email/ Telehandle/ Phone number"
          />
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="displayinfo">Display Info: {DisplayInfo}</label>
          <textarea
            id="displayinfo"
            rows="3"
            onChange={handleDisplayInfoChange}
            placeholder="New Display Info"
          ></textarea>
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="gender">Gender: </label>
          <Dropdown
            placeholder="Select Gender"
            options={["Male", "Female", "Others", "Prefer not to say"]}
            onChange={(event) => setNewGender(event.value)}
            onSelect={(event) => setNewGender(event.value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) =>
              console.log("closedBySelection?:", closedBySelection)
            }
            onOpen={() => console.log("open!")}
          />
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="faculty">Faculty:</label>
          <Dropdown
            placeholder="Select Faculty"
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
            onChange={(event) => setNewFaculty(event.value)}
            onSelect={(event) => setNewFaculty(event.value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) =>
              console.log("closedBySelection?:", closedBySelection)
            }
            onOpen={() => console.log("open!")}
          />
        </div>
        <br />

        <div className={classes.control}>
          <label htmlFor="year">Year of Study:</label>
          <Dropdown
            placeholder="Select Year of Study"
            options={[
              "Year 1",
              "Year 2",
              "Year 3",
              "Year 4",
              "PHD",
              "Graduated",
            ]}
            onChange={(event) => setNewYear(event.value)}
            onSelect={(event) => setNewYear(event.value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) =>
              console.log("closedBySelection?:", closedBySelection)
            }
            onOpen={() => console.log("open!")}
          />
        </div>

        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default EditProfileForm;
