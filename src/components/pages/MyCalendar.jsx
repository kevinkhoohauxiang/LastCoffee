import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "../header/components/Header";
import db from "../../firebase";
import { Link } from "react-router-dom";
import CalendarApp from "../calendar/calendar_app/CalendarApp";
import { concatenateDateTime } from "../../action";
import Calendarmodal from "../calendar/Calendarmodal";

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
  margin-top: 60px;
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

function MyCalendar(props) {
  const [showModal, setShowModal] = useState("close");
  const [loadedEventslist, setLoadedEvents] = useState([]);
  const userUID = props.user.uid;

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
          }
        });
        setLoadedEvents(calendarEvents);
      });
  }, []);

  const clickHandler = (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />

      <Nav>
        <NavListWrap>
          <NavList>
            <Link to="/calendarevents">
              <a href="/calendarevents">
                <img src="/images/Togglebtn1.svg" alt="" />
              </a>
            </Link>
            <img
              src="/images/Addbtn1.svg"
              alt=""
              onClick={clickHandler}
              disabled={props.loading ? true : false}
            />
          </NavList>
        </NavListWrap>
      </Nav>

      <Content>
        <CalendarApp userUID={userUID} events={loadedEventslist} />
      </Content>
      <Calendarmodal showModal={showModal} clickHandler={clickHandler} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyCalendar);
