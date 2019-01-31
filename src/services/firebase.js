import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDiJ--AaTzWP3NdW1j6Zo4wvB17x1Cr2nk",
    authDomain: "fss-react.firebaseapp.com",
    databaseURL: "https://fss-react.firebaseio.com",
    projectId: "fss-react",
    storageBucket: "fss-react.appspot.com",
    messagingSenderId: "18829816109"
};
firebase.initializeApp(config)

export default firebase