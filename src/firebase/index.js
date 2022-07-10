import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

//const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
//const database = getDatabase(app);

export { auth, provider, storage };
export default db;
