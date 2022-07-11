import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";
import ToDoListList from "../toDoList/todolist_undone/ToDoListList";
import db from "../../firebase";

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

//home page upon signing in
function ToDoList(props) {
  const [loadedtodolist, setLoadedEvents] = useState([]);
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

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <HomePage>
          <button>
            <Link to="/createnewtodo">
              <a href="/createnewtodo">
                <span>Add new To Do Event</span>
              </a>
            </Link>
          </button>
          <button>
            <Link to="/todolistdone">
              <a href="/todolistdone">
                <span>Completed todolist events</span>
              </a>
            </Link>
          </button>
        </HomePage>

        <ToDoListList events={loadedtodolist} />
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
