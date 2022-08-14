import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "../header/components/Header";
import { Link } from "react-router-dom";
import Left from "./Left";
import SearchSBPage from "../studyBuddies/searchSB_form/SearchSBPage";

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left main";
  grid-template-columns: minmax(0, 5fr) minmax(0, 17fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

//home page upon signing in
function SearchSB(props) {
  const userUID = props.user.uid;

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Link to="/findstudybuddy">
          <a href="/findstudybuddy">
            <img src="/images/Backbtn1.svg" alt="" />
          </a>
        </Link>
        <Layout>
          <Left />
          <h1>Filter and search for study buddies!</h1>
        </Layout>
        <SearchSBPage userUID={userUID} />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(SearchSB);
