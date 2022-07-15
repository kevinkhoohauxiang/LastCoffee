import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../header/components/Header";

const Container = styled.div`
  max-width: 100%;
  background-color: white;
  margin: auto;
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
function StudyBuddies(props) {
  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <HomePage>
        <button>
          <Link to="/findstudybuddy">
            <a href="/findstudybuddy">
              <span>Find Study Buddies</span>
            </a>
          </Link>
        </button>
        <button>
          <Link to="/mystudybuddies">
            <a href="/mystudybuddies">
              <span>My Study Buddies</span>
            </a>
          </Link>
        </button>
        <button>
          <Link to="/studybuddyrequests">
            <a href="/studybuddyrequests">
              <span>Requests</span>
            </a>
          </Link>
        </button>
        <button>
          <Link to="/studybuddynotifications">
            <a href="/studybuddynotifications">
              <span>Notifications</span>
            </a>
          </Link>
        </button>
      </HomePage>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(StudyBuddies);
