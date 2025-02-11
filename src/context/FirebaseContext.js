import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const FireBaseContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const fireBaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(fireBaseApp);
export const fireStore = getFirestore(fireBaseApp);
export const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("User login status changed:", isLoggedIn);
  }, [isLoggedIn]);
  const signupWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signupWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const createNewBookList = async (name, isbn, price, coverPhoto) => {
    try {
      await addDoc(collection(fireStore, "Books"), {
        name,
        isbn,
        price,
        coverPhoto,
        userID: user.uid,
        userEmail: user.email,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const listAllBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, "Books"));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  };

  const getBookById = async (id) => {
    try {
      const docRef = doc(fireStore, "Books", id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = (id, qty) => {
    const collectionRef = collection(fireStore, "Books", id, "orders");
    const result = addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      qty,
    });
    return result;
  };

  const fetchMyBooks = async () => {
    if (!user) return null;
    const collectionRef = collection(fireStore, "Books");
    const q = query(collectionRef, where("userID", "==", user.uid));
    const result = await getDocs(q);
    return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const getOrder = async (id) => {
    const collectionRef = collection(fireStore, "Books", id, "orders");
    const result = await getDocs(collectionRef);
    return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  return (
    <FireBaseContext.Provider
      value={{
        signupWithEmailAndPassword,
        loginWithEmailAndPassword,
        signupWithGoogle,
        createNewBookList,
        listAllBooks,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrder,
        isLoggedIn,
        user,
      }}
    >
      {children}
    </FireBaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FireBaseContext);
export default FirebaseProvider;
