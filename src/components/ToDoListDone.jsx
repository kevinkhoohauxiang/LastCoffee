import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";
import ToDoListList from "./todolistform/ToDoListList";
import ToDoListListDone from "./todolistdone/ToDoListListDone";

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

const HomePage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  h2 {
    margin-top: 20px;
    font-size: 1.25rem;
    margin: 0;
    font-weight: lighter;
    line-height: 1.6em;
    letter-spacing: 0.01em;
    text-align: center;
    margin-bottom: 20px;
  }

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
function ToDoListDone(props) {
  const [loadedtodolist, setLoadedEvents] = useState([]);
  const userUID = props.user.uid;

  useEffect(() => {
    //setIsLoading(true);
    fetch(
      "https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const todos = [];

        for (const key in data) {
          const tuple = data[key];
          //console.log(tuple.completed);
          if (tuple.completed == true && tuple.userUID == userUID) {
            console.log("load");
            const todo = {
              id: key,
              ...tuple,
            };
            todos.push(todo);
          }
        }

        //setIsLoading(false);
        setLoadedEvents(todos);
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
            <Link to="/todolist">
              <a href="/todolist">
                <span>Undone todolist events</span>
              </a>
            </Link>
          </button>
          <h2>Well Done! You have completed the following tasks!</h2>
        </HomePage>

        <ToDoListListDone events={loadedtodolist} />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(ToDoListDone);
