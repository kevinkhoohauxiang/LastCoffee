import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../header/components/Header";
import { storage } from "../../firebase";
import db from "../../firebase";
import Card from "../../action/Card";
import firebase from "firebase/app";
import EditProfilePage from "../editprofile/EditProfilePage";

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
  grid-template-areas: "left main ";
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
const Portrait = styled.div`
  img {
    margin-top: 5px;
    width: 830px;
    border-radius: 100px;
    float: left;
    margin-right: 10px;
    object-fit: cover;
  }
`;

const InputBox = styled.div`
  input,
  textarea {
    display: block;
    font: inherit;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0.25rem;
    width: 100%;
  }
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const Photo = styled.div`
  box-shadow: none;
  background: url(${(props) => props.photoUrl});
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: #fff;
  background-position: center;
  /* background-size: 60%; */
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const ImageUpload = styled.div`
  img {
    cursor: pointer;
  }
  input {
    display: none;
  }
`;

// for uploading new profile picture

//for changing your name

//for changing contact info

//home page upon signing in
function MyProfileEdit(props) {
  const userUID = props.user.uid;
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");

  function renderDoc(doc) {
    setContactInfo(doc.data().Actor.contact_info);
    setDisplayInfo(doc.data().Actor.display_info);
    setDisplayName(doc.data().Actor.display_name);
    setDisplayPicture(doc.data().Actor.display_picture);
    //console.log(DisplayPicture);
  }

  const Set_Values = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", userUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          renderDoc(doc);
        }
      )
    );
  //console.log(userUID);
  const ReactFirebaseImageUpload = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const handleUpload = () => {
      const uploadTask = storage
        .ref(`${userUID}/images/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`${userUID}/images`)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setUrl(url);
              db.collection("DPDB").doc(userUID).update({
                "Actor.display_picture": url,
              });
            });
        }
      );
    };

    return (
      <ImageUpload>
        <br />
        <label for="file-input">
          <img src="/images/Uploadbtn1.svg" />
        </label>
        <input id="file-input" type="file" onChange={handleChange} />
        <img src="/images/Submitbtn1.svg" alt="" onClick={handleUpload} />

        <br />
      </ImageUpload>
    );
  };

  let photoUrl = DisplayPicture ? DisplayPicture : "/images/photo.svg";

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Card>
          <Layout>
            <Link to="/myprofile">
              <a href="/myprofile">
                <img src="/images/Backbtn1.svg" alt="" />
              </a>
            </Link>
          </Layout>

          <Photo photoUrl={DisplayPicture} />
          <h3>Add a new photo</h3>
          <ReactFirebaseImageUpload />
          {
            //<button onClick={DPupload}>DISPLAY INFO UPLOAD</button>
          }
          <br />
        </Card>

        <EditProfilePage userUID={userUID} />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyProfileEdit);
