//@ts-nocheck
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import _ from "lodash";

const devMode = true;

let firebaseConfig = {};
if (devMode) {
  firebaseConfig = {
    apiKey: "AIzaSyC1LNlojAnXPYhsCN54uNPrmQXEeoOmvJE",
    authDomain: "development-6b127.firebaseapp.com",
    projectId: "development-6b127",
    storageBucket: "development-6b127.appspot.com",
    messagingSenderId: "361276343360",
    appId: "1:361276343360:web:e4468781cb62702c9c0ba5",
    measurementId: "G-Q10GPV5LKN",

    // apiKey: "AIzaSyAGCXsGDyn8nUy4Fd0omOQr72nCk7e5h_c",
    // authDomain: "developement2-d8702.firebaseapp.com",
    // projectId: "developement2-d8702",
    // storageBucket: "developement2-d8702.appspot.com",
    // messagingSenderId: "665419849716",
    // appId: "1:665419849716:web:14b2aa66c4fca7303de3a1",
    // measurementId: "G-NEHZ1BXFLK",
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyDgECrWknG3jZG24XWOuDkMmXkaW7LS3as",
    authDomain: "forrestbrew.firebaseapp.com",
    projectId: "forrestbrew",
    storageBucket: "forrestbrew.appspot.com",
    messagingSenderId: "220722053401",
    appId: "1:220722053401:web:b445beb10d5a3b73b28588",
  };
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoaded: false,
  companyName: "",
  errorMessage: "",
  loading: false,
  userID: "",
  currentUser: [],
  product: [],
  batch: [],
  hotel: [],
  fermentation: [],
  copyData: [],
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
  getCurrentUser: () => {},
  setLoggedIn: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [batch, setBatch] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [fermentation, setFermentation] = useState([]);
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    console.log("Aubercot v2");
    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) {
        setIsLoggedIn(false);
        setIsLoaded(true);
        console.log("not logged in");
        setCompanyName("");
      } else {
        console.log("signed in", user);
        //   firebase
        //     .firestore()
        //     .collection("users")
        //     .doc(user.uid)
        //     .get()
        //     .then((userObject: any) => {
        //       if (userObject.exists) {
        //         // console.log("userObject data loaded");
        //         setCompanyName(userObject.data().companyName);
        //         setCurrentUser(userObject.data());
        //         setIsLoggedIn(true);
        //         setIsLoaded(true);
        //         firebase
        //           .firestore()
        //           .collection("products")
        //           .doc(userObject.data().companyName)
        //           .collection("products")
        //           .onSnapshot((querySnapshot: any) => {
        //             let prodArr: any[] = [];
        //             console.log(
        //               "total number of document reads for products",
        //               querySnapshot.size
        //             );
        //             querySnapshot.forEach((data: any) => {
        //               prodArr.push(data.data());
        //             });
        //             setProduct(prodArr);
        //           });
        //         firebase
        //           .firestore()
        //           .collection("batch")
        //           .doc(userObject.data().companyName)
        //           .collection("products")
        //           .onSnapshot((querySnapshot: any) => {
        //             let batchArr: any[] = [];
        //             let copyArr: any[] = [];
        //             console.log(
        //               "total number of document reads for batch",
        //               querySnapshot.size
        //             );
        //             querySnapshot.forEach((data: any) => {
        //               batchArr.push(data.data());
        //               copyArr.push(JSON.parse(JSON.stringify(data.data())));
        //             });
        //             setBatch(batchArr);
        //             setCopyData(copyArr);
        //           });
        //         firebase
        //           .firestore()
        //           .collection("fermentation")
        //           .onSnapshot((querySnapshot: any) => {
        //             let batchArr: any[] = [];
        //             console.log(
        //               "total number of document reads for fermentation",
        //               querySnapshot.size
        //             );
        //             querySnapshot.forEach((data: any) => {
        //               batchArr.push(data.data());
        //             });
        //             setFermentation(batchArr);
        //           });
        //         firebase
        //           .firestore()
        //           .collection("hotel")
        //           .onSnapshot((querySnapshot: any) => {
        //             let batchArr: any[] = [];
        //             console.log(
        //               "total number of document reads for Hotel",
        //               querySnapshot.size
        //             );
        //             querySnapshot.forEach((data: any) => {
        //               batchArr.push(data.data());
        //             });
        //             setHotel(batchArr);
        //           });
        //       }
        //     });
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

  const login = (email: string, password: string) => {
    console.log("inside context loginHandler", email, password);
    if (_.isEmpty(email) || _.isEmpty(password)) {
      throw new Error("Please enter your username/password");
    }
    return firebase.auth().signInWithEmailAndPassword(email, password);

    // .catch((error: any) => {
    //   console.log(error);
    //   switch (error.code) {
    //     case "auth/user-not-found":
    //       throw new Error("Account is not found");

    //     case "auth/wrong-password":
    //       throw new Error("Invalid password");

    //     case "auth/invalid-email":
    //       throw new Error("Invalid email");

    //     case "auth/user-disabled":
    //       throw new Error("Account is disabled");

    //     default:
    //       throw new Error("Unexpected error occured", error.code);
    //   }
    // });
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
        product: product,
        batch: batch,
        hotel: hotel,
        fermentation: fermentation,
        copyData: copyData,
        onLogout: logoutHandler,
        onLogin: login,
        setLoggedIn: loggedInHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
