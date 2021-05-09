import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyB_oLFCl7V6oiMK0Y_GUyCFBn8qa5hQhU0",
    authDomain: "fir-4d2be.firebaseapp.com",
    projectId: "fir-4d2be",
    storageBucket: "fir-4d2be.appspot.com",
    messagingSenderId: "743754525025",
    appId: "1:743754525025:web:0dc30ecdf40a42c24bbd20",
    databaseURL: 'https://fir-4d2be-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// Initialize Firebase
// firebase.messaging.isSupported()
firebase.initializeApp(firebaseConfig);

export default firebase