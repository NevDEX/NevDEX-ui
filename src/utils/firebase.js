import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDulWYErIJI11Ww2Fd4qHatAkvzXk6zxMQ",
    authDomain: "nevdex-e8cfc.firebaseapp.com",
    projectId: "nevdex-e8cfc",
    storageBucket: "nevdex-e8cfc.appspot.com",
    messagingSenderId: "935296749297",
    appId: "1:935296749297:web:496d7564a816bf9c116350",
    measurementId: "G-MS829QMG2V",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
export { db }
