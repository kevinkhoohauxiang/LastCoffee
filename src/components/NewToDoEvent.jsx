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

//home page upon signing in
function NewToDoEvent(props) {
  const [editorText, setEditorText] = useState("");
  const userUID = props.user.uid;

  /*
	const EventUpload = () => {

		//need to link front end to backend, upload the new event to the db and query it
		const handleEventUpload = () => {
			db.collection("TEST").doc(userUID).add({
				
			});
		}

		// events will be stored as arrays in the main array, TDLDB. aka arrays of events in the main array
		// learn how to create a form and upload the form onto firebase in the form of an array
		return (
			<div>
				<br/>
				<textarea value={editorText} onChange={(event) => setEditorText(event.target.value)} placeholder="To do List event" autoFocus={true} />
				<button onClick = {handleEventUpload}>Upload Event</button>
				<br/>
			</div>
		);
	}
	*/

  // need to create a new function to toggle the state of the "completed" so as to query the type of event

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

        <NewToDoPage props />

        <button>
          <Link to="/todolist">
            <a href="/todolist">
              <span>Back</span>
            </a>
          </Link>
        </button>
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
