import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Left from "./Left";
import Header from "./Header";
import { storage } from "../firebase";
import db from "../firebase";
import Card from "./calendar/Card";
import classes from "./calendar/CalendarItem.module.css";
import { getArticlesAPI } from "../action";
import { updateArticleAPI } from "../action";

const Container = styled.div`
  max-width: 100%;
`;

const MainProfile = styled.div``;

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

// for uploading new profile picture

//for changing your name

//for changing contact info

class Info {
  constructor(contact_info, display_name) {
    this.contact = contact_info; // string
    this.name = display_name; // string
  }
  toString() {
    return this.contact + ", " + this.name;
  }
}

//home page upon signing in
function MyProfile(props) {
  //console.log(props);
  //console.log(props.user);
  //console.log(props.user.uid);
  const userUID = props.user.uid;
  const descriptionInputRef = useRef();

  /*const DPupload = () => 
	const DPupload = 
		db.collection("TEST").doc(userUID)
		.collection('CLDDB').add({
			name: 'ZEN'
		});

		*/

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
            });
        }
      );
    };

    /*
	function uploadDPHandler(event, postIndex, id) {
      event.preventDefault();
      let UID = props.user.uid;
      let currentLikes = props.articles[postIndex].likes.count;
      let whoLiked = props.articles[postIndex].likes.whoLiked;
      let user = props.user.email;
      let userIndex = whoLiked.indexOf(user);

      const payload = {
        update: {
          likes: {
            count: currentLikes,
            whoLiked: whoLiked,
          },
        },
        id: id,
      };

      props.likeHandler(payload);
    }
	*/

    //console.log("image", image)

    return (
      <div>
        <br />
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload Picture</button>
        <br />
      </div>
    );
  };

  const NameUpload = () => {
    //need to link front end to backend, upload the new name to the db and query it
    const handleNameUpload = () => {
      db.collection("TEST").doc(userUID).update({
        "DPDB.display_name": "testing",
      });
    };

    return (
      <div>
        <br />
        <input id="text" />
        <button onClick={handleNameUpload}>Change Name</button>
        <br />
      </div>
    );
  };

  const ContactUpload = () => {
    //need to link front end to backend, upload the new name to the db and query it
    const handleNameUpload = () => {
      db.collection("TEST").doc(userUID).update({
        "DPDB.display_name": "testing",
      });
    };

    return (
      <div>
        <br />
        <input id="text" />
        <button onClick={handleNameUpload}>Change Contact Info</button>
        <br />
      </div>
    );
  };

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Section>
          <h5>
            <a>THIS IS MY PROFILE</a>
          </h5>
        </Section>

        <Layout>
          <Left />

          <Card>
            <Portrait>
              <img src="/images/dummy profile.png" alt="" />
            </Portrait>
          </Card>
        </Layout>
        <Card>
          <h3>Add a new photo</h3>
          <ReactFirebaseImageUpload />
          {
            //<button onClick={DPupload}>DISPLAY INFO UPLOAD</button>
          }
          <br />
          <h3>Change name</h3>

          <NameUpload />

          <br />
          <h3>Change contact info</h3>

          <ContactUpload />

          <br />
        </Card>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyProfile);
