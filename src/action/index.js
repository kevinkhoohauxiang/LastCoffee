import db, { auth, provider, storage } from "../firebase";
import { useHistory } from "react-router-dom";
import {
  SET_LOADING_STATUS,
  SET_USER,
  GET_ARTICLES,
  GET_CALENDAR,
  GET_EVENTS,
  GET_TDL_DONE,
  GET_TDL_UNDONE,
  GET_SB_REQ,
  GET_MY_SB,
  GET_SB_POSTS,
  GET_SB_NOTIFS,
} from "./actionType";
//import firebase from "firebase";

export function setUser(payload) {
  return {
    type: SET_USER,
    user: payload,
  };
}

export function setLoading(status) {
  return {
    type: SET_LOADING_STATUS,
    status: status,
  };
}

export function getArticles(payload, id) {
  return {
    type: GET_ARTICLES,
    payload: payload,
    id: id,
  };
}

export function getCalendar(payload, id) {
  return {
    type: GET_CALENDAR,
    payload: payload,
    id: id,
  };
}

export function getTDLdone(payload, id) {
  return {
    type: GET_TDL_DONE,
    payload: payload,
    id: id,
  };
}
export function getTDLundone(payload, id) {
  return {
    type: GET_TDL_UNDONE,
    payload: payload,
    id: id,
  };
}
export function getEvents(payload, id) {
  return {
    type: GET_EVENTS,
    payload: payload,
    id: id,
  };
}

export function getSBreq(payload, id) {
  return {
    type: GET_SB_REQ,
    payload: payload,
    id: id,
  };
}

export function getmySBs(payload, id) {
  return {
    type: GET_MY_SB,
    payload: payload,
    id: id,
  };
}

export function geTSBposts(payload, id) {
  return {
    type: GET_SB_POSTS,
    payload: payload,
    id: id,
  };
}

export function getSBnotifs(payload, id) {
  return {
    type: GET_SB_NOTIFS,
    payload: payload,
    id: id,
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      //this.currentUser = firebase.auth().currentUser;
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => dispatch(setUser(payload.user)))
      .catch((err) => console.log(err.message));
  };
}

export function SignOutAPI() {
  //const history = useHistory();
  return (dispatch) => {
    //const currentUser = auth.currentUser;
    //console.log(currentUser);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        return null;
      } else {
        auth
          .signOut()
          .then(() => dispatch(setUser(null)))
          .catch((err) => console.log(err));
      }
    });
    window.location.reload();
  };
}

// Functions to post articles in find study buddies
export function postArticleAPI(payload) {
  return (dispatch) => {
    if (payload.image !== "") {
      dispatch(setLoading(true));
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => alert(err),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            likes: {
              count: 0,
              whoLiked: [],
            },
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      dispatch(setLoading(true));
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        likes: {
          count: 0,
          whoLiked: [],
        },
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    } else if (payload.image === "" && payload.video === "") {
      dispatch(setLoading(true));
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedImg: "",
        likes: {
          count: 0,
          whoLiked: [],
        },
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function postTDLAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    db.collection("TDLDB").add({
      userUID: payload.userUID,
      title: payload.title,
      deadline: payload.deadline,
      completed: false,
      description: payload.description,
      timestamp: payload.timestamp,
    });
    dispatch(setLoading(false));
  };
}
export function postCalendarAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    db.collection("CLDDB").add({
      userUID: payload.userUID,
      title: payload.title,
      startDate: payload.startDate,
      startTime: payload.startTime,
      endDate: payload.endDate,
      endTime: payload.endTime,
      start: payload.start,
    });
    dispatch(setLoading(false));
  };
}

export function postSBAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    db.collection("SB posts").add({
      payload,
    });
    dispatch(setLoading(false));
  };
}

// function for getting post articles
export function getArticlesAPI() {
  return (dispatch) => {
    dispatch(setLoading(true));
    let payload;
    let id;
    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        id = snapshot.docs.map((doc) => doc.id);
        dispatch(getArticles(payload, id));
      });
    dispatch(setLoading(false));
  };
}

// function for getting to do list events
export function getTDLundoneAPI(userUID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    var payload = [];
    var id = [];
    db.collection("TDLDB")
      .where("completed", "==", false)
      .where("userUID", "==", userUID)
      //.orderBy("timestamp", "desc")
      .orderBy("deadline", "asc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        id = snapshot.docs.map((doc) => doc.id);

        dispatch(getTDLundone(payload, id));
      });
    dispatch(setLoading(false));
  };
}

export function getSBnotifsAPI(userUID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    var payload = [];
    var id = [];
    db.collection("SBDB")
      .where("Accepted", "==", "accepted")
      .where("Poster.userUID", "==", userUID)
      //.orderBy("timestamp", "desc")
      .orderBy("accepted_timestamp", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        id = snapshot.docs.map((doc) => doc.id);

        dispatch(getSBnotifs(payload, id));
      });
    dispatch(setLoading(false));
  };
}

export function getTDLdoneAPI(userUID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    var payload = [];
    var id = [];
    db.collection("TDLDB")
      .where("completed", "==", true)
      .where("userUID", "==", userUID)
      .orderBy("deadline", "asc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        id = snapshot.docs.map((doc) => doc.id);

        dispatch(getTDLdone(payload, id));
      });
    dispatch(setLoading(false));
  };
}

export function getCalendarAPI(userUID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    var payload = [];
    var id = [];
    db.collection("CLDDB")
      .where("userUID", "==", userUID)
      .orderBy("start", "asc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        id = snapshot.docs.map((doc) => doc.id);
        dispatch(getCalendar(payload, id));
      });
    dispatch(setLoading(false));
  };
}

export function getMySBsAPI(userUID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    var payload = [];
    var id = [];
    db.collection("SBDB")
      .where("Poster.userUID", "==", userUID)
      .where("Accepted", "==", "accepted")
      .orderBy("accepted_timestamp", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        id = snapshot.docs.map((doc) => doc.id);
        dispatch(getmySBs(payload, id));
      });
    dispatch(setLoading(false));
  };
}

export function getSBrequestsAPI(userUID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    var payload = [];
    var id = [];
    db.collection("SBDB")
      .where("Poster.userUID", "==", userUID)
      .where("Accepted", "==", "new")
      //.orderBy("sent_timestamp", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        id = snapshot.docs.map((doc) => doc.id);
        dispatch(getSBreq(payload, id));
      });
    dispatch(setLoading(false));
  };
}
/*
export function getSBpostsAPI(userUID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    var payload = [];
    var id = [];
    db.collection("SBDB")
      .where("posterUID", "==", userUID)
      .where("Accepted", "==", "new")
      //.orderBy("sent_timestamp", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        id = snapshot.docs.map((doc) => doc.id);
        dispatch(getSBreq(payload, id));
      });
    dispatch(setLoading(false));
  };
}*/

export function TDLdoneAPI(payload, id) {
  return (dispatch) => {
    db.collection("TDLDB").doc(id).set(payload);
  };
}

export function TDLdeleteAPI(id) {
  return (dispatch) => {
    db.collection("TDLDB").doc(id).delete();
  };
}

export function updateArticleAPI(payload) {
  return (dispatch) => {
    db.collection("articles").doc(payload.id).update(payload.update);
  };
}

export function CalendarDeleteAPI(id) {
  return (dispatch) => {
    db.collection("CLDDB").doc(id).delete();
  };
}

export function SBdeleteAPI(id) {
  return (dispatch) => {
    db.collection("SBDB").doc(id).delete();
  };
}

export function SBrepostAPI(payload, id) {
  return (dispatch) => {
    db.collection("SBDB").doc(id).set(payload);
  };
}

// Functions to upload stuff to DP
export function postDP(payload) {
  return (dispatch) => {
    if (payload.image !== "") {
      dispatch(setLoading(true));
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => alert(err),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("Users").add({
            UID: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            likes: {
              count: 0,
              whoLiked: [],
            },
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      dispatch(setLoading(true));
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        likes: {
          count: 0,
          whoLiked: [],
        },
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    } else if (payload.image === "" && payload.video === "") {
      dispatch(setLoading(true));
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedImg: "",
        likes: {
          count: 0,
          whoLiked: [],
        },
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function concatenatePayloadID(payload, id) {
  var result = payload;
  for (let i = 0; i < id.length; i++) {
    payload[i] = id[i];
  }
  return result;
}

export function concatenateDateTime(date, time) {
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  const newDate = new Date(+year, month - 1, +day, +hours, +minutes);
  return newDate;
}

export function secondsToString(time) {
  const days = Math.floor(time / 86400);
  const hours = Math.floor(time / 3600);
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time);
  if (days !== 0) {
    if (days === 1) {
      return `~ 1 day ago`;
    } else {
      return `~ ${days} days ago`;
    }
  } else if (hours !== 0) {
    const newMins = Math.floor((time - hours * 3600) / 60);
    if (hours === 1 && newMins !== 0) {
      return `~ ${hours} hour, ${newMins} mins ago`;
    } else if (hours === 1 && newMins === 0) {
      return `~ ${hours} hour ago`;
    } else if (newMins === 0) {
      return `~ ${hours} hours ago`;
    } else {
      return `~ ${hours} hours, ${newMins} mins ago`;
    }
  } else if (mins !== 0) {
    const newSeconds = time - mins * 60;
    if (mins === 1 && newSeconds !== 0) {
      return `~ ${mins} min, ${newSeconds} seconds ago`;
    } else if (mins === 1 && newSeconds === 0) {
      return `~ ${mins} min ago`;
    } else if (newSeconds === 0) {
      return `~ ${mins} mins ago`;
    } else {
      return `~ ${mins} mins, ${newSeconds} seconds ago`;
    }
  } else {
    return `~${secs} seconds ago`;
  }
}
