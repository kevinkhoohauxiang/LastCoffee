import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "../header/components/Header";
import db from "../../firebase";
import { Link } from "react-router-dom";
import CalendarList from "../calendar/calendar_events/CalendarList";
import { concatenateDateTime } from "../../action";

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
function CalendarEvents(props) {
  const [loadedEventslist, setLoadedEvents] = useState([]);
  const userUID = props.user.uid;
  loadedEventslist.sort(function (x, y) {
    //define a function to compare dates in string form
    const x_date = concatenateDateTime(x.startDate, x.startTime);
    //console.log(x_date.getTime());
    const y_date = concatenateDateTime(y.startDate, y.startTime);
    return x_date.getTime() - y_date.getTime();
  });

  useEffect(() => {
    //setIsLoading(true);

    db.collection("CLDDB")
      .get()
      .then((snapshot) => {
        const calendarEvents = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data().userUID === userUID) {
            const calendarEvent = {
              id: doc.id,
              title: doc.data().title,
              startDate: doc.data().startDate,
              startTime: doc.data().startTime,
              endDate: doc.data().endDate,
              endTime: doc.data().endTime,
              userUID: doc.data.userUID,
            };
            //console.log(calendarEvent.startDate);
            calendarEvents.push(calendarEvent);
          }
        });
        setLoadedEvents(calendarEvents);
      });
  }, []);

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />

      <Content>
        <HomePage>
          <Link to="/mycalendar">
            <a href="/mycalendar">
              <img src="/images/Backbtn1.svg" alt="" />
            </a>
          </Link>
        </HomePage>

        <CalendarList events={loadedEventslist} />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(CalendarEvents);
