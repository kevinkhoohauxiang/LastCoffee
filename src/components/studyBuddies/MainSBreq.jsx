import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getSBrequestsAPI, SBrepostAPI, SBdeleteAPI } from "../../action";
import Firebase from "firebase";
import firebase from "firebase";
import db from "../../firebase";

const Container = styled.div`
  grid-area: main;
`;

const CommonBox = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonBox)`
  display: flex;
  flex-direction: column;
  margin: 0 0 8px;
  color: #958b7b;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
      }
    }
  }
`;

const Article = styled(CommonBox)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: #000;
        }
        &:nth-child(n + 2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    top: 0;
    right: 12px;
    border: none;
    outline: none;
    background: transparent;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
  margin: 8px 16px 0;
  background-color: #f9fafb;
  img {
    width: 100%;
    height: 100%;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9efdf;
  color: rgba(0, 0, 0, 0.6);
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      color: rgba(0, 0, 0, 0.6);
      background: transparent;
      span {
        padding-left: 5px;
      }
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 4px 12px;
  min-height: 40px;
  padding-bottom: 5px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    border: none;
    background: transparent;
    span {
      margin-left: 4px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }
  }
  button.active {
    span {
      color: #0a66c2;
      font-weight: 600;
    }
    svg {
      fill: #0a66c2;
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

function MainSBreq(props) {
  const userUID = props.user.uid;
  //console.log(props);

  useEffect(() => {
    props.getSBrequests(userUID);
  }, []);

  function changeRejectState(event, id) {
    event.preventDefault();
    props.SBdelete(id);
  }

  function changeAcceptState(article, event, id) {
    event.preventDefault();
    article["Accepted"] = "accepted";
    article["accepted_timestamp"] = Firebase.firestore.Timestamp.now();
    // bug -- doenst update when calling the db
    /*
    const PosterUID = article.posterUID;
    const ActorUID = article.Actor.userUID;
    let ContactInfo;
    let DisplayInfo;
    let DisplayName;
    let DisplayPicture;

    db.collection("DPDB")
      .where(firebase.firestore.FieldPath.documentId(), "==", PosterUID)
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          console.log(doc.data().Actor.display_name);
          ContactInfo = doc.data().Actor.contact_info;
          DisplayInfo = doc.data().Actor.display_info;
          DisplayName = doc.data().Actor.display_name;
          DisplayPicture = doc.data().Actor.display_picture;
        })
      );

    const newID = PosterUID + ActorUID;
    const payload = {
      Actor: {
        userUID: PosterUID,
        display_name: DisplayName,
        contact_info: ContactInfo,
        display_picture: DisplayPicture,
        display_info: DisplayInfo,
      },
      posterUID: ActorUID,
      Accepted: "accepted",
      sent_timestamp: article.sent_timestamp,
      accepted_timestamp: Firebase.firestore.Timestamp.now(),
      accepter: true,
    };
    console.log(DisplayName);
    */

    props.SBdelete(id);
    props.SBrepost(article, id);
    //props.SBrepost(payload, newID);
  }

  return (
    <Container>
      <Content>
        {props.loading && <img src="/images/spin-loader.gif" alt="" />}
        {props.SBrequests.length > 0 &&
          props.SBrequests.map((article, key) => (
            <Article key={key}>
              <br />
              <h2>
                {article.Actor.display_name} sent you a request to be a study
                buddy!
              </h2>
              <h3>{article.Actor.display_info}</h3>

              <SocialActions>
                <img
                  src="/images/Acceptbtn1.svg"
                  alt=""
                  onClick={(event) =>
                    changeAcceptState(article, event, props.ids[key])
                  }
                />
                <img
                  src="/images/Rejectbtn1.svg"
                  alt=""
                  onClick={(event) => changeRejectState(event, props.ids[key])}
                />
              </SocialActions>
            </Article>
          ))}
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.SBrequestsState.loading,
    SBrequests: state.SBrequestsState.SBrequests,
    ids: state.SBrequestsState.ids,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSBrequests: (userUID) => dispatch(getSBrequestsAPI(userUID)),
  SBrepost: (article, id) => dispatch(SBrepostAPI(article, id)),
  SBdelete: (id) => dispatch(SBdeleteAPI(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSBreq);
