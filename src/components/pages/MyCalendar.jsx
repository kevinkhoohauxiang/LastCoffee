import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import db from "../../firebase";
import { Link } from "react-router-dom";
import CalendarApp from "../calendar/calendar_app/CalendarApp";
import { concatenateDateTime } from "../../action";
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

const Nav = styled.nav`
  margin-left: auto;
  margin-bottom: -50px;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  justify-content: space-between;
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 100px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      text-align: center;
    }
    @media (max-width: 768px) {
      min-width: 50px;
      font-size: 9px;
      span > img {
        width: 60%;
      }
    }
  }
`;

//home page upon signing in
function MyCalendar(props) {
  const [loadedEventslist, setLoadedEvents] = useState([]);
  const userUID = props.user.uid;
  //console.log(loadedEventslist);
  //console.log(userUID);

  useEffect(() => {
    db.collection("CLDDB")
      .get()
      .then((snapshot) => {
        const calendarEvents = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data().userUID === userUID) {
            const calendarEvent = {
              id: doc.id,
              title: doc.data().title,
              start: concatenateDateTime(
                doc.data().startDate,
                doc.data().startTime
              ),
              end: concatenateDateTime(doc.data().endDate, doc.data().endTime),
            };
            calendarEvents.push(calendarEvent);
            //console.log(calendarEvents);
          }
        });
        //console.log(calendarEvents);
        setLoadedEvents(calendarEvents);
        //console.log(loadedEventslist);
      });
  }, []);

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />

      <Nav>
        <NavListWrap>
          <NavList>
            <Link to="/createnewcalendar">
              <a href="/createnewcalendar">
                <img src="/images/Addbtn1.svg" alt="" />
              </a>
            </Link>
          </NavList>
          <NavList>
            <Link to="/calendarevents">
              <a href="/calendarevents">
                <img src="/images/Togglebtn1.svg" alt="" />
              </a>
            </Link>
          </NavList>
        </NavListWrap>
      </Nav>
      <CalendarApp userUID={userUID} events={loadedEventslist} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyCalendar);
