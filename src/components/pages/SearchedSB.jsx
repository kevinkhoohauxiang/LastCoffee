import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import db from "../../firebase";
import Header from "../header/components/Header";
import { Link } from "react-router-dom";
import SBList from "../studyBuddies/studybuddy_posts/SBList";
import Left from "./Left";
import firebase from "firebase";

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
function SearchedSB(props) {
  const userUID = props.user.uid;
  const [loadedSBlist, setLoadedEvents] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [SearchLocation, setSearchLocation] = useState("");
  const [SearchTiming, setSearchTiming] = useState("");
  const [SearchGender, setSearchGender] = useState("");
  const [SearchFaculty, setSearchFaculty] = useState("");
  const SBSearch = [];
  //console.log(SearchData);

  useEffect(() => {
    db.collection("SB Searches")
      .where(firebase.firestore.FieldPath.documentId(), "==", userUID)
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach(
          //(doc) => console.log(doc.data()),
          (doc) => {
            const number = doc.data().number;
            const location = doc.data().location;
            const timing = doc.data().timing;
            const gender = doc.data().gender;
            const faculty = doc.data().faculty;
            SBSearch.push(number, location, timing, gender, faculty);
          }
        )
      );
    db.collection("SB Posts")
      .get()
      .then((snapshot) => {
        const SBs = [];
        snapshot.docs.forEach(
          //(doc) => console.log(doc.data()),
          (doc) => {
            const PostData = [];
            let count = 0;
            const number = doc.data().number;
            const location = doc.data().location;
            const timing = doc.data().timing;
            const gender = doc.data().gender;
            const faculty = doc.data().subjects;
            PostData.push(number, location, timing, gender, faculty);

            for (let i = 0; i < PostData.length; i++) {
              const PostValue = PostData[i];
              const SearchValue = SBSearch[i];
              if (SearchValue === "" || SearchValue === PostValue) {
                count++;
              }
            }
            console.log(count);
            if (count === PostData.length && doc.data().posterUID !== userUID) {
              const SB = {
                id: doc.id,
                ...doc.data(),
              };
              SBs.push(SB);
            }
          }
        );
        setIsLoading(false);
        setLoadedEvents(SBs);
      });
  }, []);
  // create function to query for searches in the db that match the search data
  // if data is "", ignore.

  /*
  useEffect(() => {
    setIsLoading(true);
    db.collection("SB Posts")
      .get()
      .then((snapshot) => {
        const SBs = [];
        snapshot.docs.forEach(
          //(doc) => console.log(doc.data()),
          (doc) => {
            const PostData = [];
            let count = 0;
            const location = doc.data().location;
            const timing = doc.data().timing;
            const gender = doc.data().gender;
            const faculty = doc.data().subjects;
            PostData.push(location);
            PostData.push(timing);
            PostData.push(gender);
            PostData.push(faculty);
            console.log(SBSearch);
            for (let i = 0; i < PostData.length; i++) {
              const PostValue = PostData[i];
              const SearchValue = SearchData[i];
              if (SearchValue == "" || SearchValue == PostValue) {
                count++;
              }
            }
            console.log(count);
            if (count == PostData.length) {
              const SB = {
                id: doc.id,
                ...doc.data(),
              };
              SBs.push(SB);
            }
          }
        );
        setIsLoading(false);
        setLoadedEvents(SBs);
      });
  }, []);
  */

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Link to="/searchSB">
          <a href="/searchSB">
            <img src="/images/Backbtn1.svg" alt="" />
          </a>
        </Link>
        <Layout>
          <Left />

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

export default connect(mapStateToProps)(SearchedSB);
