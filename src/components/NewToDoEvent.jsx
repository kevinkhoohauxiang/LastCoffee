import React, { useState } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import db from "../firebase";
import NewToDoPage from "./todolistform/NewToDoPage";
import { Link } from "react-router-dom";

// import { compose, withState, withHandlers } from 'recompose';
// need to npm install recompose

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

class Todothings {
  constructor(completed, deadline, description, title) {
    this.completed = completed; //boolean
    this.deadline = deadline; // date
    this.description = description; // string
    this.title = title; // string
  }

  toString() {
    return (
      this.completed +
      ", " +
      this.deadline +
      ", " +
      this.description +
      ", " +
      this.title
    );
  }
}

//home page upon signing in
function NewToDoEvent(props) {
  const [editorText, setEditorText] = useState("");
  const userUID = props.user.uid;

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Section>
          <h5>
            <a>THIS IS TO DO LIST</a>
          </h5>
        </Section>

        <button>
          <Link to="/todolist">
            <a href="/todolist">
              <span>Back</span>
            </a>
          </Link>
        </button>

        <NewToDoPage userUID={userUID} />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(NewToDoEvent);
