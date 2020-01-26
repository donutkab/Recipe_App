import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyBIyLpTq0jYbiFhDM_9X6Ln6nuldJpwFjc",
        authDomain: "card-dc62a.firebaseapp.com",
        databaseURL: "https://card-dc62a.firebaseio.com",
        projectId: "card-dc62a",
        storageBucket: "card-dc62a.appspot.com",
        messagingSenderId: "872359343635",
    }
    firebase.initializeApp(config)
    //firebase.firestore().settings({timestampsInSnapshots: true})
}
const fireDb = firebase.firestore()
export {fireDb}