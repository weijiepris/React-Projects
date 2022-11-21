const Skills = require("../configurations/skills");

exports.getSkills = () => {
  return new Promise((resolve, reject) => {
    Skills.get()
      .then((snapshot) => {
        let initialData = [];
        snapshot.docs.forEach((d) => {
          initialData = [...initialData, { value: d.data().value }];
        });
        return initialData;
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
