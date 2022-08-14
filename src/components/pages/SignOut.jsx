import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { SignOutAPI } from "../../action";

const Container = styled.div`
  max-width: 100%;
  background-color: black;
`;

const HomePage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  color: white;
  font-size: 2rem;
  backgroundcolor: black;
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
    margin-top: 5.5rem;
    margin-bottom: 10rem;
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
function SignOut(props) {
  return (
    <Container>
      {!props.user && <Redirect to="/" />}

      <HomePage>
        <br />
        <h1>
          Oh no! you're Leaving... <br /> Are you sure?
        </h1>
        <button className="btn" onClick={() => props.signOut()}>
          <span>Sign Out</span>
        </button>
        <Link to="/home">
          <button className="btn">
            <span>Back</span>
          </button>
        </Link>
      </HomePage>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(SignOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
