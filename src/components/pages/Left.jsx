import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import db from "../../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const Container = styled.div`
  grid-area: left;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  border-radius: 5px;
  background-color: #fff;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  display: flex;
  flex-direction: column;
  width: 72px;
  height: 72px;
  border: 2px solid white;
  margin: -39px auto 11px;
  border-radius: 50%;
  img {
    width: 72px;
    height: 72px;
    background-clip: content-box;
    border-radius: 50%;
  }
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;

function Left(props) {
  // use the photo from google sign in, if not use the default photo
  const userUID = props.user.uid;
  //console.log(userUID);
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

  const Set_values = db
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

  let photoUrl = DisplayPicture ? DisplayPicture : "/images/photo.svg";

  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo>
              <img src={photoUrl} />
            </Photo>
            <Link>
              Welcome to <br></br>The Last Coffee, <br></br>{" "}
              {props.user ? DisplayName : ""}!
            </Link>
          </a>
          <a>
            <AddPhotoText>
              Dreams don't work <br /> unless you do!!!
            </AddPhotoText>
          </a>
        </UserInfo>
      </ArtCard>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Left);
