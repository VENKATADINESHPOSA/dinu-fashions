import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRkrq8Ya3CW7823W8ZxN31JQ3YMo_k1Tk",
  authDomain: "dinu-fashions-db.firebaseapp.com",
  projectId: "dinu-fashions-db",
  storageBucket: "dinu-fashions-db.appspot.com",
  messagingSenderId: "105333667373",
  appId: "1:105333667373:web:01116f3a10b67c0d4c6aa4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

//Authentication functionality
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//firestore functionality

export const db = getFirestore();
export const createUserDocumentOnAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
};
