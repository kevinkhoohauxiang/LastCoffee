import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getSBrequestsAPI, SBrepostAPI, SBdeleteAPI } from "../../action";
import Firebase from "firebase";

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

    const PosterUID = article.Poster.userUID;
    const ActorUID = article.Actor.userUID;
    const Poster_contact_info = article.Poster.contact_info;
    const Poster_display_info = article.Poster.display_info;
    const Poster_display_name = article.Poster.display_name;
    const Poster_display_picture = article.Poster.display_picture;
    const Actor_contact_info = article.Actor.contact_info;
    const Actor_display_info = article.Actor.display_info;
    const Actor_display_name = article.Actor.display_name;
    const Actor_display_picture = article.Actor.display_picture;

    const newID = ActorUID + PosterUID;
    //console.log(newID);
    const payload = {
      Actor: {
        userUID: PosterUID,
        display_name: Poster_display_name,
        contact_info: Poster_contact_info,
        display_picture: Poster_display_picture,
        display_info: Poster_display_info,
      },

      Poster: {
        userUID: ActorUID,
        display_name: Actor_display_name,
        contact_info: Actor_contact_info,
        display_picture: Actor_display_picture,
        display_info: Actor_display_info,
      },
      Accepted: "accepted",
      sent_timestamp: article.sent_timestamp,
      accepted_timestamp: Firebase.firestore.Timestamp.now(),
      accepter: true,
    };
    //console.log(payload);

    props.SBdelete(id);
    props.SBrepost(article, id);
    props.SBrepost(payload, newID);
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
