import React, { useState, useEffect } from "react";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDgECrWknG3jZG24XWOuDkMmXkaW7LS3as",
  authDomain: "forrestbrew.firebaseapp.com",
  projectId: "forrestbrew",
  storageBucket: "forrestbrew.appspot.com",
  messagingSenderId: "220722053401",
  appId: "1:220722053401:web:b445beb10d5a3b73b28588",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const AuthContext = React.createContext({
  isLoggedIn: "",
  isLoaded: "",
  companyName: "",
  errorMessage: "",
  loading: "",
  userID: "",
  currentUser: [],
  test: (docID) => {},
  onLogout: () => {},
  onLogin: (email, password) => {},
  getCurrentUser: () => {},
  setLoggedIn: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [list, setList] = useState([]);

  const testFunction = async (docID) => {};

  const getProductListByID = async (docID) => {
    const currentCompanyRef = firebase.firestore().collection("companies");

    const snapshot = await currentCompanyRef
      .doc(currentUser.companyName)
      .collection("product")
      .doc(docID)
      .collection("data")
      .get();

    snapshot.forEach((doc) => {
      addList(doc.data());
    });
  };

  const addList = (list) => {
    setList((prevList) => {
      return [list, ...prevList];
    });
  };

  useEffect(() => {
    console.log("inventory web app version 1.1");
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
        setIsLoaded(true);
        console.log("not logged in");
        setCompanyName("");
      } else {
        const currentUserRef = firebase.firestore().collection("users");
        currentUserRef
          .doc(user.uid)
          .get()
          .then((userObject) => {
            if (userObject.exists) {
              console.log("userObject data loaded");
              setCompanyName(userObject.data().companyName);
              setCurrentUser(userObject.data());
              setIsLoggedIn(true);
              setIsLoaded(true);
              console.log("user logged in as, " + userObject.data().name);
            }
          });
      }
    });

  }, []);

  const loggedInHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setIsLoggedIn(false);
      });
  };

  const loginHandler = (email, password) => {
    console.log("inside context loginHandler");
    setErrorMessage("");
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/wrong-password":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid Username/Password");
            break;
          default:
            break;
        }
      })
      .then((result) => {
        setLoading(false);
      });
  };

  // const viewInventoryHandler = () => {
  //   setIsLoggedIn(true);
  // };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoaded: isLoaded,
        companyName: companyName,
        errorMessage: errorMessage,
        loading: loading,
        currentUser: currentUser,
        list: list,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        setLoggedIn: loggedInHandler,
        test: testFunction,
        getProductListByID: getProductListByID,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
