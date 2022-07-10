import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import db from "../firebase";
import firebase from "firebase";
import Header from "./Header";
import { Link } from "react-router-dom";
import SBList from "./studybuddyform/SBList";
import SBListMine from "./studybuddymine/SBListMine";
import Left from "./Left";
import { useRadioGroup } from "@mui/material";

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

class StudyBuddiesThing {
  constructor(
    modules,
    description,
    gender,
    info,
    location,
    num_buddies,
    study_timing,
    title
  ) {
    this.modules = modules; // array of strings
    this.gender = gender; // string -- male, female, no preference
    this.info = info; // String
    this.location = location; // string
    this.title = title; // string
    this.description = description; // string
    this.numBuddies = num_buddies; // number
    this.studyTiming = study_timing; // string
  }

  toString() {
    return (
      this.title +
      ", " +
      this.description +
      ", " +
      this.modules +
      ", " +
      this.gender +
      ", " +
      this.info +
      ", " +
      this.location +
      ", " +
      this.numBuddies +
      ", " +
      this.studyTiming
    );
  }
}

const initState = {
  name: "",
  type: "Volunteer",
  email: "",
  startDate: new Date(),
  timeDay: "",
  age: "",
  listingTitle: "",
  description: "",
};

//home page upon signing in
function FindStudyBuddy(props) {
  const userUID = props.user.uid;
  const [loadedSBlist, setLoadedEvents] = useState([]);
  const [mySBPost, setmySBPost] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    db.collection("SB Posts")
      .get()
      .then((snapshot) => {
        const SBs = [];
        const mySBs = [];
        snapshot.docs.forEach(
          //(doc) => console.log(doc.data()),
          (doc) => {
            const SB = {
              id: doc.id,
              ...doc.data(),
            };
            //console.log(doc.data());
            if (doc.data().posterUID == userUID) {
              mySBs.push(SB);
              //console.log(mySBPost);
            } else {
              SBs.push(SB);
              //console.log(loadedSBlist);
            }
          }
        );
        setIsLoading(false);
        setLoadedEvents(SBs);
        setmySBPost(mySBs);
      });
  }, []);

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Section>
          <h5>
            <a>THIS IS FIND STUDY BUDDY</a>
          </h5>
        </Section>
        <HomePage>
          <button>
            <Link to="/findnewsb">
              <a href="/findnewsb">
                <span>Find Study Buddies!!! </span>
              </a>
            </Link>
          </button>
        </HomePage>

        <Layout>
          <Left />
          <SBListMine events={mySBPost} userUID={userUID} />
          Find my Study Buddies!!!
          <SBList events={loadedSBlist} userUID={userUID} />
        </Layout>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(FindStudyBuddy);
