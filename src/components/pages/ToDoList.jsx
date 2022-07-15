import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "../header/components/Header";
import { Link } from "react-router-dom";
import ToDoListList from "../toDoList/todolist_undone/ToDoListList";
import db from "../../firebase";
import { concatenateDateTime } from "../../action";

const DUMMY_DATA = [
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
];

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
function ToDoList(props) {
  const [LoadedToDoList, setLoadedEvents] = useState([]);
  const [DisplayMessage, setDisplayMessage] = useState("");
  //console.log(LoadedToDoList);
  LoadedToDoList.sort(function (x, y) {
    const x_date = concatenateDateTime(x.deadline, "00:00");
    const y_date = concatenateDateTime(y.deadline, "00:00");
    return x_date.getTime() - y_date.getTime();
  });
  const userUID = props.user.uid;

  useEffect(() => {
    db.collection("TDLDB")
      .get()
      .then((snapshot) => {
        const todoEvents = [];
        snapshot.docs.forEach(
          //(doc) => console.log(doc.data()),
          (doc) => {
            //console.log(doc.data());
            if (
              doc.data().completed === false &&
              doc.data().userUID === userUID
            ) {
              const todoEvent = {
                id: doc.id,
                ...doc.data(),
              };
              todoEvents.push(todoEvent);
            }
            //console.log(todoEvents);
          }
        );
        setLoadedEvents(todoEvents);
      });
  }, []);

  useEffect(() => {
    const listLength = LoadedToDoList.length;
    if (listLength !== 0) {
      setDisplayMessage(
        `${LoadedToDoList.length} tasks left to complete! Don't give up!`
      );
    } else {
      setDisplayMessage(`All tasks completed! Well Done!`);
    }
  });

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />
      <Nav>
        <NavListWrap>
          <NavList>
            <Link to="/createnewtodo">
              <a href="/createnewtodo">
                <img src="/images/Addbtn1.svg" alt="" />
              </a>
            </Link>
          </NavList>

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
        <ToDoListList events={LoadedToDoList} />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

/*
const mapDispatchToProps = (dispatch) => ({
  getEvents: () => dispatch(getTDLevents()),
});
*/

export default connect(mapStateToProps)(ToDoList);
