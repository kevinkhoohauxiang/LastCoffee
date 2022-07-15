import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { SignOutAPI } from "../../action";

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  margin: auto;
`;

const Homepage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  h1 {
    font-size: 5rem;
    text-align: center;
    font-family: "Montserrat";
    line-height: 1em;
    font-weight: 600;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    max-width: 53.125rem;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1.25rem;
    margin: 0;
    font-weight: lighter;
    line-height: 1.6em;
    letter-spacing: 0.01em;
    text-align: center;
    margin-bottom: 20px;
  }

  img {
    margin-top: 30px;
    width: 1100px;
    height: 549px;
    object-fit: cover;
  }

  button {
    border: 0.0625rem solid rgb(17, 109, 255);
    background-color: rgb(17, 109, 255);
    border-radius: 1.875rem;
    font-family: var(--main-text-font);
    width: 12.125rem;
    height: 3.5rem;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 0.625rem;
    align-items: center;
  }
`;

//home page upon signing in
function SignOut(props) {
  return (
    <Container>
      {!props.user && <Redirect to="/" />}

      <button className="btn" onClick={() => props.signOut()}>
        <span>Sign Out</span>
      </button>

      <Link to="/home">
        <button className="btn">
          <span>Back</span>
        </button>
      </Link>
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
