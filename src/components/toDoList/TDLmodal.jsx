import { useState } from "react";
import { connect } from "react-redux";
import Firebase from "firebase";
import styled from "styled-components";
import { postTDLAPI } from "../../action";
import firebase from "firebase";
import db from "../../firebase";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s ease;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  max-height: 90%;
  background-color: #fff;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 20px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-weight: 400;
  }
  button {
    width: 40px;
    height: 40px;
    min-width: auto;
    border: none;
    outline: none;
    background: transparent;
    img,
    svg {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 5px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border-radius: 50%;
    border: 2px solid transparent;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 24px 10px 16px;
`;

const PostButton = styled.button`
  min-width: 60px;
  padding: 0 16px;
  border-radius: 20px;
  background: ${(props) => (props.disabled ? "#b8b8b8" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "#5a5a5a" : "#fff")};
  font-size: 16px;
  letter-spacing: 1.1px;
  border: none;
  outline: none;
  &:hover {
    background: ${(props) => (props.disabled ? "#b8b8b8" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  label {
    text-align: left;
  }
  textarea {
    width: 100%;
    min-height: 35px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

function TDLmodal(props) {
  const [Title, setTitle] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [Description, setDescription] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");
  const userUID = props.user.uid;
  //const [assetArea, setAssetArea] = useState("");

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

  const reset = (event) => {
    setTitle("");
    setDeadline("");
    setDescription("");
    props.clickHandler(event);
  };

  function postTDL(event) {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }

    const payload = {
      deadline: Deadline,
      description: Description,
      title: Title,
      userUID: props.user.uid,
      timestamp: Firebase.firestore.Timestamp.now(),
    };
    //console.log(payload);

    props.postTDL(payload);
    reset(event);
  }

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Add New To-Do </h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={DisplayPicture} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  {props.user.displayName ? props.user.displayName : "Name"}
                </span>
              </UserInfo>
              <Editor>
                <label>Title</label>
                <textarea
                  value={Title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Finish up orbital milestone 3..."
                  //autoFocus={true}
                />

                <label>{<br />}Deadline</label>
                <div>
                  <input
                    //value={Deadline}
                    type="date"
                    required
                    id="deadline"
                    onChange={(event) => setDeadline(event.target.value)}
                  />
                </div>

                <label>Description</label>
                <textarea
                  value={Description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Complete deployment of app, update tailwind.css ..."
                  //autoFocus={true}
                />
              </Editor>
            </SharedContent>
            <ShareCreation>
              <PostButton
                disabled={!Title ? true : false}
                onClick={(event) => postTDL(event)}
              >
                Add
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTDL: (payload) => dispatch(postTDLAPI(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TDLmodal);
