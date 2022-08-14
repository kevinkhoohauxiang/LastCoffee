import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "../header/components/Header";
import { Link } from "react-router-dom";
import { concatenateDateTime } from "../../action";
import MainCalendar from "../calendar/MainCalendar";

const Container = styled.div`
  max-width: 100%;
`;

const Nav = styled.nav`
  margin-left: auto;
  margin-bottom: -20px;
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

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />

      <Nav>
        <NavListWrap>
          <NavList>
            <Link to="/mycalendar">
              <a href="/mycalendar">
                <img src="/images/Backbtn1.svg" alt="" />
              </a>
            </Link>
          </NavList>
        </NavListWrap>
      </Nav>
      <br />
      <MainCalendar />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(CalendarEvents);
