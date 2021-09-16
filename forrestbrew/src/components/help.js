// firebase
//   .firestore()
//   .collection("batch")
//   .doc(ctx.currentUser.companyName)
//   .collection("products")
//   .get()
//   .then((snapshot) => {
//     console.log(snapshot);
//     // console.log("testing => ", snapshot.docs);
//     if (snapshot.docs.length) {
//       snapshot.forEach((doc) => {
//         // addInventory(doc.data());
//         console.log(doc.data());
//         // console.log(doc.data());
//       });
//     } else {
//       console.log("no data found");
//       // setDataExists(false);
//     }
//     // setIsLoaded(true);
//   });

// firebase
//   .firestore()
//   .collection("companies")
//   .doc(ctx.currentUser.companyName)
//   .collection("product")
//   .get()
//   .then((snapshot) => {
//     console.log(snapshot.docs);
//     snapshot.docs.forEach((doc) => {
//       console.log("data => ", doc);
//     });
//   });
// firebase
//   .firestore()
//   .collection("companies")
//   .doc(ctx.currentUser.companyName)
//   .collection("product")
//   .doc("000")
//   .collection("data")
//   .get()
//   .then((snapshot) => {
//     let temp = [];
//     console.log("Total stocks for product ID 000 => ", snapshot.size);
//     snapshot.docs.forEach((doc) => {
//       temp.push(doc.data());
//     });
//     updateBatch(findOcc(temp, "batchNo"));
//   })
//   .then(function () {
//     setIsLoaded(true);
//   });

// firebase
//   .firestore()
//   .collection("companies")
//   .doc(ctx.currentUser.companyName)
//   .collection("product")
//   .doc("000")
//   .collection("data")
//   .where("batchNo", "==", "000")
//   .get()
//   .then((snapshot) => {
//     // snapshot.docs.forEach((doc) => {
//       console.log("data => ", snapshot.size);
//     // });
//   });

// return () => {
//   console.log("cleanup");
// };
