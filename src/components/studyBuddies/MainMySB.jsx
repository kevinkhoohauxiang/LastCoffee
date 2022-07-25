import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getMySBsAPI, SBdeleteAPI } from "../../action";

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

const Article = styled(CommonBox)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SocialActions = styled.div`
  display: center;
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

function MainMySB(props) {
  const userUID = props.user.uid;

  useEffect(() => {
    props.getMySBs(userUID);
  }, []);

  function changeDeleteState(event, ID1, ID2) {
    event.preventDefault();
    const newID1 = ID1 + ID2;
    const newID2 = ID2 + ID1;
    props.SBDelete(newID1);
    props.SBDelete(newID2);
  }

  return (
    <Container>
      <Content>
        {props.loading && <img src="/images/spin-loader.gif" alt="" />}
        {props.mySBs.length > 0 &&
          props.mySBs.map((article, key) => (
            <Article key={key}>
              {
                //console.log(props.ids[key])}
              }
              <br />
              <h2>Name: {article.Actor.display_name}</h2>
              <h2>Info: {article.Actor.display_info}</h2>
              <h3></h3>
              <h3></h3>

              <SocialActions>
                <img
                  src="/images/Deletebtn1.svg"
                  alt=""
                  onClick={(event) =>
                    changeDeleteState(
                      event,
                      article.Actor.userUID,
                      article.Poster.userUID
                    )
                  }
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
    loading: state.mySBState.loading,
    mySBs: state.mySBState.mySBs,
    ids: state.mySBState.ids,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getMySBs: (userUID) => dispatch(getMySBsAPI(userUID)),
  SBDelete: (id) => dispatch(SBdeleteAPI(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMySB);
