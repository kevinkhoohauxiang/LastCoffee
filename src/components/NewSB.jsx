import React, { useState } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";
import NewSBPage from "./studybuddyform/NewSBPage";
import db from "../firebase";
import DatePicker from "react-datepicker";
import Firebase from "firebase";

// import { compose, withState, withHandlers } from 'recompose';
// need to npm install recompose

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
`;

const Section = styled.section`
  min-height: 50px;
  margin: 16px 0 -30px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    margin-block-start: 0;
    margin-block-end: 0;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    margin-block-start: 0;
    margin-block-end: 0;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
    margin: 16px 0;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const NewForm = styled.section`
  margin-bottom: 0.5rem;
  input,
  textarea {
    display: block;
    font: inherit;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0.25rem;
    width: 100%;
  }
`;

//home page upon signing in
function NewSB(props) {
  const userUID = props.user.uid;

  const [newEvent, setNewEvent] = useState({
    userUID: "",
    myInfo: "",
    description: "",
    numberBuddies: "",
    locations: "",
    timings: "",
    course: "",
    gender: "",
  });
  //const [allEvents, setAllEvents] = useState(DUMMY_EVENTS);

  function handleAddEvent() {
    console.log(newEvent.title);
    console.log(newEvent.start);
    db.collection("SBDB").add({
      userUID: userUID,
      myInfo: newEvent.myInfo,
      description: newEvent.description,
      numberBuddies: newEvent.numberBuddies,
      locations: newEvent.locations,
      timings: newEvent.timings,
      course: newEvent.course,
      gender: newEvent.gender,
      timestamp: Firebase.firestore.Timestamp.now(),
    });
  }

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Section>
          <h5>
            <a>THIS IS FIND NEW SB</a>
          </h5>
        </Section>

        <NewForm>
          <button>
            <Link to="/studybuddies">
              <a href="/studybuddies">
                <span>Back</span>
              </a>
            </Link>
          </button>

          <input
            type="text"
            placeholder="My Info"
            style={{ marginRight: "10px" }}
            value={newEvent.myInfo}
            onChange={(e) =>
              setNewEvent({ ...newEvent, myInfo: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            style={{ marginRight: "10px" }}
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Preferred Number of Study Buddies"
            style={{ marginRight: "10px" }}
            value={newEvent.numberBuddies}
            onChange={(e) =>
              setNewEvent({ ...newEvent, numberBuddies: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Preferred Locations"
            style={{ marginRight: "10px" }}
            value={newEvent.locations}
            onChange={(e) =>
              setNewEvent({ ...newEvent, locations: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Preferred Timings"
            style={{ marginRight: "10px" }}
            value={newEvent.timings}
            onChange={(e) =>
              setNewEvent({ ...newEvent, timings: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Preferred Course / Modules"
            style={{ marginRight: "10px" }}
            value={newEvent.course}
            onChange={(e) =>
              setNewEvent({ ...newEvent, course: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Gender"
            style={{ marginRight: "10px" }}
            value={newEvent.gender}
            onChange={(e) =>
              setNewEvent({ ...newEvent, gender: e.target.value })
            }
          />
          <br />
          <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
            <Link to="/findstudybuddy">
              <a href="/findstudybuddy">Submit Request</a>
            </Link>
          </button>
        </NewForm>

        {/*<NewSBPage userUID={userUID} />
         */}
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(NewSB);
