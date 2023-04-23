import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
export { db }
