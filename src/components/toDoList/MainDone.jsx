import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { getTDLdoneAPI, TDLdeleteAPI, TDLdoneAPI } from "../../action";
import TDLmodal from "./TDLmodal";

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

function MainDone(props) {
  const [showModal, setShowModal] = useState("close");
  const userUID = props.user.uid;

  useEffect(() => {
    props.getTDLdone(userUID);
  }, []);

  function changeDeleteState(event, id) {
    event.preventDefault();
    props.TDLdelete(id);
  }

  return (
    <Container>
      <Content>
        {
          //console.log(props.articles)}
        }
        {props.loading && <img src="/images/spin-loader.gif" alt="" />}
        {props.TDLdone.length > 0 &&
          props.TDLdone.map((article, key) => (
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
                  src="/images/Deletebtn1.svg"
                  alt=""
                  onClick={(event) => changeDeleteState(event, props.ids[key])}
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
    loading: state.TDLdoneState.loading,
    TDLdone: state.TDLdoneState.TDLdone,
    ids: state.TDLdoneState.ids,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTDLdone: (userUID) => dispatch(getTDLdoneAPI(userUID)),
  TDLdelete: (id) => dispatch(TDLdeleteAPI(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainDone);
