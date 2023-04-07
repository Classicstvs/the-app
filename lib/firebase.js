
import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore'


const apiKey = process.env.API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "classicstv.firebaseapp.com",
  projectId: "classicstv",
  storageBucket: "classicstv.appspot.com",
  messagingSenderId: "134614897237",
  appId: "1:134614897237:web:6d428197ddea4e9b917adc",
  measurementId: "G-TSSEGD2SD3",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)