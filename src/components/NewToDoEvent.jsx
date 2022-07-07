import React, { useState } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import db from "../firebase";
import NewToDoPage from "./todolistform/NewToDoPage";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

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
function NewToDoEvent(props) {
  const [editorText, setEditorText] = useState("");
  const userUID = props.user.uid;
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    description: "",
  });
  //const [allEvents, setAllEvents] = useState(DUMMY_EVENTS);

  function handleAddEvent() {
    //console.log(newEvent.title);
    //console.log(newEvent.start);
    db.collection("TDLDB").add({
      userUID: userUID,
      title: newEvent.title,
      deadline: newEvent.deadline,
      description: newEvent.description,
    });
  }

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}

      <Section>
        <h5>
          <a>THIS IS NEW TO DO LIST</a>
        </h5>
      </Section>
      <NewForm>
        <button>
          <Link to="/todolist">
            <a href="/todolist">
              <span>Back</span>
            </a>
          </Link>
        </button>
        <input
          type="text"
          placeholder="Add Title"
          style={{ marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Deadline"
          style={{ marginRight: "10px", marginBottom: "10px" }}
          selected={newEvent.deadline}
          onChange={(deadline) => setNewEvent({ ...newEvent, deadline })}
        />
        <input
          type="text"
          placeholder="Add Description"
          style={{ marginRight: "10px" }}
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        />
        <br />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          <Link to="/mycalendar">
            <a href="/mycalendar">Add new Calendar Event</a>
          </Link>
        </button>
      </NewForm>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(NewToDoEvent);
