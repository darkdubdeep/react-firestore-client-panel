import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers

import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyBxXqcKRNRq5h7c9Gzz8KnythNd3mechEs",
  authDomain: "react-client-panel-2a534.firebaseapp.com",
  databaseURL: "https://react-client-panel-2a534.firebaseio.com",
  projectId: "react-client-panel-2a534",
  storageBucket: "react-client-panel-2a534.appspot.com",
  messagingSenderId: "963933705208"
};
//react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// firestore init
// const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

//check fro settings in local storage

if (localStorage.getItem("settings") == null) {
  //defaults
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true,
    allowRegistration: false
  };
  //set to localstorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

//Create initital state

const initialState = {
  settings: JSON.parse(localStorage.getItem("settings"))
};
//Create store

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
