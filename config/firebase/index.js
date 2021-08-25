import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyB45fTEQ2-csHnUo2D2M1T4IhGoY4M111o",
    authDomain: "clocker-fb15b.firebaseapp.com",
    projectId: "clocker-fb15b",
    storageBucket: "clocker-fb15b.appspot.com",
    messagingSenderId: "2904585298",
    appId: "1:2904585298:web:5700f3a0399553ed691b8b",
    measurementId: "G-CC1JLPRQN2"
}

export default firebase.apps.length 
    ? firebase.app() 
    : firebase.initializeApp(firebaseConfig);
