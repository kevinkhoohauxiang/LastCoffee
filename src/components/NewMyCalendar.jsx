import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import db from "../firebase";
import DatePicker from "react-datepicker";

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

const DUMMY_EVENTS = {
  title: "Big Meeting",
  start: new Date(2022, 6, 10, 10, 0),
  end: new Date(2022, 6, 10, 14, 0),
};

//home page upon signing in
function NewMyCalendar(props) {
  const [editorText, setEditorText] = useState("");
  const userUID = props.user.uid;
  //console.log(userUID);
  //const user = db.collection("CLDDB").doc(userUID);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
  });
  const [allEvents, setAllEvents] = useState(DUMMY_EVENTS);

  function handleAddEvent() {
    console.log(newEvent.title);
    console.log(newEvent.start);
    db.collection("CLDDB").add({
      userUID: userUID,
      title: newEvent.title,
      start_time: newEvent.start,
      end_time: newEvent.end,
      description: newEvent.description,
    });
  }

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />
      <Section>
        <h5>
          <a>THIS IS NEW CALENDAR EVENT</a>
        </h5>
      </Section>
      <NewForm>
        <button>
          <Link to="/mycalendar">
            <a href="/mycalendar">
              <img src="/images/backarrow.svg" alt="" />
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
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
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

export default connect(mapStateToProps)(NewMyCalendar);
