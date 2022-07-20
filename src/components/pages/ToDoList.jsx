import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "../header/components/Header";
import { Link } from "react-router-dom";
import { concatenateDateTime } from "../../action";
import MainUndone from "../toDoList/MainUndone";

/*const DUMMY_DATA = [
  {
    title: "orbital",
    date: "22/06/22",
    description: "milestone 2 deadline",
  },
  {
    title: "orbital 2",
    date: "23/07/22",
    description: "milestone 3 deadline",
  },
];*/

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
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
//get data again from db
function ToDoList(props) {
  const [LoadedToDoList, setLoadedEvents] = useState([]);
  const [DisplayMessage, setDisplayMessage] = useState("");
  //console.log(LoadedToDoList);
  LoadedToDoList.sort(function (x, y) {
    const x_date = concatenateDateTime(x.deadline, "00:00");
    const y_date = concatenateDateTime(y.deadline, "00:00");
    return x_date.getTime() - y_date.getTime();
  });

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />
      <Nav>
        <NavListWrap>
          <NavList>
            <Link to="/todolistdone">
              <a href="/todolistdone">
                <img src="/images/Togglebtn1.svg" alt="" />
              </a>
            </Link>
          </NavList>
        </NavListWrap>
      </Nav>
      <br />

      <h2>{DisplayMessage}</h2>

      <Content>
        <MainUndone />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(ToDoList);
