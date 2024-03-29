import firebase from "firebase";

export const onLogin = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const onLogout = () => {
  return new Promise((resolve) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve(false);
      });
  });
};
