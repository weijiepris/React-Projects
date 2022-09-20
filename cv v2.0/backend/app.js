// imports
const firebase = require("firebase-admin");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// firebase config import
const User = require("./configurations/users");
const Skills = require("./configurations/skills");
const FirebaseValue = require("./configurations/firebaseValue");
const Experiences = require("./configurations/experience");
const Projects = require("./configurations/projects");
const Educations = require("./configurations/educations");

// initialise app
const app = express();

// applying middleware
app.use(cors({ origin: true }));
app.use(express.json());

// get mapping
app.get("/", (req, res) => {
  try {
    updateReaders();
    res.status(200).send({ message: "loaded successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/frameworks", async (req, res) => {
  try {
    const initialData = [];
    const snapshot = await Skills.get();
    snapshot.docs.forEach((d) => {
      if (d.id === "frameworks") initialData.push(...d.data().value);
    });
    res.status(200).send(initialData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/technologies", async (req, res) => {
  try {
    const initialData = [];
    const snapshot = await Skills.get();
    snapshot.docs.forEach((d) => {
      if (d.id === "technologies") initialData.push(...d.data().value);
    });
    res.status(200).send(initialData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/languages", async (req, res) => {
  try {
    const initialData = [];
    const snapshot = await Skills.get();
    snapshot.docs.forEach((d) => {
      if (d.id === "languages") initialData.push(...d.data().value);
    });
    res.status(200).send(initialData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/experiences", async (req, res) => {
  try {
    const initialData = [];
    const snapshot = await Experiences.get();
    snapshot.docs.forEach((d) => {
      initialData.push(d.data());
    });

    res.status(200).send(initialData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/projects", async (req, res) => {
  try {
    const initialData = [];
    const snapshot = await Projects.get();
    snapshot.docs.forEach((d) => {
      initialData.push(d.data());
    });

    res.status(200).send(initialData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/educations", async (req, res) => {
  try {
    const initialData = [];
    const snapshot = await Educations.get();
    snapshot.docs.forEach((d) => {
      initialData.push(d.data());
    });

    res.status(200).send(initialData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// post mapping
app.post("/frameworks", async (req, res) => {
  // [
  //   "English (Written & Spoken)",
  //   "Mandarin (Spoken)"
  // ]
  const data = req.body;
  try {
    // getting existing values in db
    const snapshot = await Skills.get();
    const initialData = [];
    snapshot.docs.forEach((d) => {
      if (d.id === "frameworks") initialData.push(...d.data().value);
    });

    // merge existing and new data
    let value = [];
    initialData.forEach((d) => value.push(d));
    data.forEach((d) => (value = [...value, d]));
    Skills.doc("frameworks").set({ value });

    res.send({ message: "new frameworks added successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/technologies", async (req, res) => {
  // [
  //   "English (Written & Spoken)",
  //   "Mandarin (Spoken)"
  // ]
  const data = req.body;
  try {
    // getting existing values in db
    const snapshot = await Skills.get();
    const initialData = [];
    snapshot.docs.forEach((d) => {
      if (d.id === "technologies") initialData.push(...d.data().value);
    });

    // merge existing and new data
    let value = [];
    initialData.forEach((d) => value.push(d));
    data.forEach((d) => (value = [...value, d]));
    Skills.doc("technologies").set({ value });

    res.send({ message: "new technologies added successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/languages", async (req, res) => {
  // [
  //   "English (Written & Spoken)",
  //   "Mandarin (Spoken)"
  // ]
  const data = req.body;
  try {
    // getting existing values in db
    const snapshot = await Skills.get();
    const initialData = [];
    snapshot.docs.forEach((d) => {
      if (d.id === "languages") initialData.push(...d.data().value);
    });

    // merge existing and new data
    let value = [];
    initialData.forEach((d) => value.push(d));
    data.forEach((d) => (value = [...value, d]));
    Skills.doc("languages").set({ value });

    res.send({ message: "new languages added successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/experiences", async (req, res) => {
  // {
  //   "title": "Software Engineer",
  //   "category": "full time",
  //   "company": "NCS Group",
  //   "dateStart": "January 2022",
  //   "dateEnd": "Current",
  //   "skills": [
  //     "Agile",
  //     "Angular",
  //     "Gitlab",
  //     "Mockito",
  //     "Spring Boot"
  //   ],
  //   "descriptions": [
  //     "Developed features based on user stories using test driven developement",
  //     "REST api in java Spring Boot and hibernate",
  //     "Mockito for unit test",
  //     "Implemented CRON to schedule jobs"
  //   ]
  // }
  const data = req.body;
  try {
    Experiences.add(data);

    res.send({ message: "new experiences added successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/projects", async (req, res) => {
  // {
  //   "title": "Inventory Management Systems",
  //   "dateStart": "August 2021",
  //   "dateEnd": "Current",
  //   "skills": [
  //     "React",
  //     "Firebase"
  //   ],
  //   "descriptions": [
  //     "Cloud-Based inventory management system."
  //   ]
  // }
  const data = req.body;
  try {
    Projects.add(data);

    res.send({ message: "new projects added successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/educations", async (req, res) => {
  // {
  //   "title": "Inventory Management Systems",
  //   "dateStart": "August 2021",
  //   "dateEnd": "Current",
  //   "skills": [
  //     "React",
  //     "Firebase"
  //   ],
  //   "descriptions": [
  //     "Cloud-Based inventory management system."
  //   ]
  // }
  const data = req.body;
  try {
    Educations.add(data);

    res.send({ message: "new educations added successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const port = process.env.SECRET_PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

const updateReaders = async () => {
  User.doc("readers").update({ reads: FirebaseValue.increment(1) });
};
