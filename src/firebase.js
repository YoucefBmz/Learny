import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyByG2D6o-UUgYaqWoco1N_dHla3arKba3s",
  authDomain: "studyapp2-2691c.firebaseapp.com",
  projectId: "studyapp2-2691c",
  storageBucket: "studyapp2-2691c.appspot.com",
  messagingSenderId: "1069546676094",
  appId: "1:1069546676094:web:b7c432a792dbb17f9add2f",
  measurementId: "G-PCV95QEB9H",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });

export default firestore;
