import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getTDLundoneAPI, TDLdeleteAPI, TDLdoneAPI } from "../../action";
import TDLmodal from "./TDLmodal";
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
        width: 60px;
        height: 60px;
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
  }
`;

const Article = styled(CommonBox)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const SocialActions = styled.div`
  display: center;
  align-items: center;
  justify-content: flex-start;
  margin: 4px 12px;
  min-height: 40px;
  padding-bottom: 5px;
  img {
    cursor: pointer;
  }
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

function MainUndone(props) {
  const [showModal, setShowModal] = useState("close");
  const [DisplayPicture, setDisplayPicture] = useState("");
  const userUID = props.user.uid;

  useEffect(() => {
    props.getTDLundone(userUID, false);
  }, []);

  const Set_values = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", userUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          setDisplayPicture(doc.data().Actor.display_picture);
        }
      )
    );

  const clickHandler = (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  function changeDoneState(event, article, id) {
    //delete, then create a new entry with the same values
    event.preventDefault();
    article["completed"] = true;
    props.TDLdelete(id);
    props.TDLdone(article, id);
  }

  function changeDeleteState(event, id) {
    event.preventDefault();
    props.TDLdelete(id);
  }

  return (
    <Container>
      <ShareBox>
        <div>
          {props.user.photoURL ? (
            <img src={DisplayPicture} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button
            onClick={clickHandler}
            disabled={props.loading ? true : false}
          >
            Add new To-Do
          </button>
        </div>
      </ShareBox>
      <Content>
        {console.log(props.TDLundone)}
        {props.loading && <img src="/images/spin-loader.gif" alt="" />}
        {props.TDLundone.length > 0 &&
          props.TDLundone.map((article, key) => (
            <Article key={key}>
              {
                //console.log(props.ids[key])}
              }
              <br />
              <h2>Title: {article.title}</h2>
              <h3>Deadline: {article.deadline}</h3>
              <Description>{article.description}</Description>
              {
                //console.log(article["completed"])
              }
              <SocialActions>
                <img
                  src="/images/Donebtn1.svg"
                  alt=""
                  onClick={(event) =>
                    changeDoneState(event, article, props.ids[key])
                  }
                />
                <img
                  src="/images/Deletebtn1.svg"
                  alt=""
                  onClick={(event) => changeDeleteState(event, props.ids[key])}
                />
              </SocialActions>
            </Article>
          ))}
      </Content>
      <TDLmodal showModal={showModal} clickHandler={clickHandler} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.TDLundoneState.loading,
    TDLundone: state.TDLundoneState.TDLundone,
    ids: state.TDLundoneState.ids,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTDLundone: (userUID) => dispatch(getTDLundoneAPI(userUID)),
  TDLdone: (article, id) => dispatch(TDLdoneAPI(article, id)),
  TDLdelete: (id) => dispatch(TDLdeleteAPI(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainUndone);
