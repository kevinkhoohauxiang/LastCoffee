import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import db from "../../firebase";
import Header from "../header/components/Header";
import { Link } from "react-router-dom";
import SBList from "../studyBuddies/studybuddy_posts/SBList";
import SBListMine from "../studyBuddies/studybuddy_mypost/SBListMine";
import Left from "./Left";

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left main ";
  grid-template-columns: minmax(0, 5fr) minmax(0, 17fr);
  column-gap: 25px;
  row-gap: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const HomePage = styled.div`
  display: block;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  img {
    margin-left: 10px;
    margin-right: 10px;
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
function FindStudyBuddy(props) {
  const userUID = props.user.uid;
  const [loadedSBlist, setLoadedEvents] = useState([]);
  const [mySBPost, setmySBPost] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  loadedSBlist.sort(function (x, y) {
    console.log(x.timestamp.seconds);
    return y.timestamp.seconds - x.timestamp.seconds;
  });

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
            if (doc.data().posterUID === userUID) {
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
        <HomePage>
          <Link to="/findnewsb">
            <a href="/findnewsb">
              <img src="/images/Postbtn1.svg" alt="" />
            </a>
          </Link>
          <Link to="/searchsb">
            <a href="/searchsb">
              <img src="/images/Searchbtn1.svg" alt="" />
            </a>
          </Link>
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
