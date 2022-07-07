import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import db from "../firebase";
import { Link } from "react-router-dom";
import Card from "./calendarform/Card";
import classes from "./calendarform/NewCalendarForm.module.css";
import CalendarApp from "./calendar/CalendarApp";
//import CalendarApp from "./calendar/CalendarApp";

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

const HomePage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  button {
    border: 0.0625rem solid rgb(17, 109, 255);
    background-color: rgb(17, 109, 255);
    border-radius: 1.875rem;
    font-family: var(--main-text-font);
    width: 20rem;
    height: 3.5rem;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 2rem;
    align-items: center;
    a:link {
      text-decoration: none;
    }

    a:visited {
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
    }

    a:active {
      text-decoration: none;
    }

    span {
      color: white;
      text-decoration: none;
      background-color: none;
    }
  }
`;

//home page upon signing in
function MyCalendar(props) {
  const [editorText, setEditorText] = useState("");
  const userUID = props.user.uid;
  console.log(userUID);
  //const user = db.collection("DPDB").doc(userUID);

  const EventUpload = () => {
    //need to link front end to backend, upload the new name to the db and query it
    const handleEventUpload = () => {
      db.collection("TEST").doc(userUID).add({});
    };

    // events will be stored as arrays in the main array, TDLDB. aka arrays of events in the main array
    return (
      <div>
        <br />
        <textarea
          value={editorText}
          onChange={(event) => setEditorText(event.target.value)}
          placeholder="Upload a calendar event!"
          autoFocus={true}
        />
        <button onClick={handleEventUpload}>Upload Event</button>
        <br />
      </div>
    );
  };

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />
      <Section>
        <h5>
          <a>THIS IS MY CALENDAR EVENT</a>
        </h5>
      </Section>
      <HomePage>
        {
          <button>
            <Link to="/createnewcalendar">
              <a href="/createnewcalendar">
                <span>Add new Calendar Event</span>
              </a>
            </Link>
          </button>
        }
      </HomePage>
      <CalendarApp userUID={userUID} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyCalendar);
