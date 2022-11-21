import { useState, useEffect } from "react";
import firebase from "firebase";
import classes from "../components/Profile.module.css";

const Profile = (props) => {
  const storage = firebase.storage();
  const [user, setUser] = useState([]);
  const userid = firebase.auth().currentUser.uid;
  const [isLoaded, setIsLoaded] = useState(false);
  const [update, setUpdate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);

  let reader;
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
          setIsLoaded(true);
        } else {
          console.log("does not exist");
        }
      });
  }, [userid]);

  const onEditPicture = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      console.log("selected image");
      let temp = e.target.files;
      setFiles(temp);
      console.log(temp);
      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("profilePicture").src = reader.result;
        console.log("image loaded");
        setUpdate(true);
      };
      reader.readAsDataURL(temp[0]);
    };
    input.click();
  };

  const onChangePicture = async () => {
    setUploading(true);
    const uri = files[0];
    console.log(uri);

    console.log("change picture");
    const childPath = `post/${userid}/${Math.random().toString(36)}`;

    let task = storage.ref().child(childPath).put(files[0]);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  const savePostData = (profilePicture) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .set({ profilePicture }, { merge: true })
      .then(function () {
        setUpdate(false);
      });
  };
  if (!isLoaded) {
    return (
      <section className={classes.auth}>
        <div className={classes.picture}>
          <img id="profilePicture" alt="" />
        </div>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <section className={classes.auth}>
      <div className={classes.picture}>
        <img id="profilePicture" alt="" src={user.profilePicture} />
        <span onClick={onEditPicture}>Edit</span>
      </div>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.contact}</h1>
      {update && (
        <div className={classes.actions}>
          {!uploading ? (
            <button onClick={onChangePicture}>Update Profile</button>
          ) : (
            <p>Updating...</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;
