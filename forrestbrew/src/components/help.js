firebase
  .firestore()
  .collection("batch")
  .doc(ctx.currentUser.companyName)
  .collection("products")
  .get()
  .then((snapshot) => {
    console.log(snapshot);
    // console.log("testing => ", snapshot.docs);
    if (snapshot.docs.length) {
      snapshot.forEach((doc) => {
        // addInventory(doc.data());
        console.log(doc.data());
        // console.log(doc.data());
      });
    } else {
      console.log("no data found");
      // setDataExists(false);
    }
    // setIsLoaded(true);
  });

firebase
  .firestore()
  .collection("companies")
  .doc(ctx.currentUser.companyName)
  .collection("product")
  .get()
  .then((snapshot) => {
    console.log(snapshot.docs);
    snapshot.docs.forEach((doc) => {
      console.log("data => ", doc);
    });
  });
firebase
  .firestore()
  .collection("companies")
  .doc(ctx.currentUser.companyName)
  .collection("product")
  .doc("000")
  .collection("data")
  .get()
  .then((snapshot) => {
    let temp = [];
    console.log("Total stocks for product ID 000 => ", snapshot.size);
    snapshot.docs.forEach((doc) => {
      temp.push(doc.data());
    });
    updateBatch(findOcc(temp, "batchNo"));
  })
  .then(function () {
    setIsLoaded(true);
  });

firebase
  .firestore()
  .collection("companies")
  .doc(ctx.currentUser.companyName)
  .collection("product")
  .doc("000")
  .collection("data")
  .where("batchNo", "==", "000")
  .get()
  .then((snapshot) => {
    // snapshot.docs.forEach((doc) => {
    console.log("data => ", snapshot.size);
    // });
  });

return () => {
  console.log("cleanup");
};

// if (obj.length === 0) {
//   setErrorMessage("Please scan in first");
//   document.getElementById("errorMessage").style.backgroundColor = "red";
//   document.getElementById("errorMessage").style.color = "white";
// } else {
//   obj.forEach((d) => {
//     let amount = document.getElementById(d.prodID + d.batchNo).value;
//     // console.log(d.prodName, ", ", d.batchNo, " => ", amount);
//     for (let i = 0; i < amount; i++) {
//       const key = generateKey();
//       // var date = new Date();
//       firebase
//         .firestore()
//         .collection("batch")
//         .doc(ctx.currentUser.companyName)
//         .collection("products")
//         .doc(key)
//         .set({
//           id: data.length + 1,
//           prodName: d.prodName,
//           prodID: d.prodID,
//           batchNo: d.batchNo,
//           addedBy: ctx.currentUser.name,
//           dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
//           dateRemoved: "",
//           remarks: d.remarks,
//           companyName: ctx.currentUser.companyName,
//           companyID: ctx.currentUser.companyID,
//           scanType: "in",
//           uniqueID: key,
//         })
//         // .then(function () {
//         //   firebase
//         //     .firestore()
//         //     .collection("products")
//         //     .doc(ctx.currentUser.companyName)
//         //     .collection("products")
//         //     .doc(d.prodID)
//         //     .update({
//         //       quantity: firebase.firestore.FieldValue.increment(1),
//         //     });
//         // })
//         .then(function () {
//           // console.log("test new batch id");
//           // console.log("d.prod id > ", d.prodID);
//           // console.log("d.batchNo id > ", d.batchNo);
//           let key = generateKey();
//           let bn = d.batchNo.replaceAll("/", "");
//           firebase
//             .firestore()
//             .collection("batch")
//             .doc(ctx.currentUser.companyName)
//             .collection("prodID")
//             .doc(d.prodID)
//             .collection("batchNo")
//             .doc(bn)
//             .set(
//               {
//                 quantity: firebase.firestore.FieldValue.increment(1),
//                 dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
//                 batchNo: d.batchNo,
//                 prodName: d.prodName,
//                 key: key,
//                 addedBy: ctx.currentUser.name,
//               },
//               { merge: true }
//             );
//         })
//         .then(function () {
//           setErrorMessage("data entered successfully");
//           setObj([]);
//           setData([]);
//         });
//     }
//   });
// }

// const removeData = (batchNo, prodID, remarks) => {
//   // console.log("batch number => ", batchNo);
//   //   console.log("product ID => ", prodID);
//   batchNo = batchNo.replaceAll("/", "");

//   const key = generateKey();
//   var date = new Date();

//   let tempQuantity = 0;
//   firebase
//     .firestore()
//     .collection("products")
//     .doc(ctx.currentUser.companyName)
//     .collection("products")
//     .doc(prodID)
//     .get()
//     .then((snapshot) => {
//       if (snapshot.exists) {
//         tempQuantity = snapshot.data().quantity;
//       }
//     })
//     .then(function () {
//       if (tempQuantity > 0) {
//         firebase
//           .firestore()
//           .collection("batch")
//           .doc(ctx.currentUser.companyName)
//           .collection("prodID")
//           .doc(prodID)
//           .collection("batchNo")
//           .doc(batchNo)
//           .get()
//           .then((snapshot) => {
//             if (snapshot.exists) {
//               if (snapshot.data().quantity > 0) {
//                 firebase
//                   .firestore()
//                   .collection("batch")
//                   .doc(ctx.currentUser.companyName)
//                   .collection("products")
//                   .doc(key)
//                   .set({
//                     id: data.length + 1,
//                     prodID: prodID,
//                     batchNo: batchNo,
//                     addedBy: ctx.currentUser.name,
//                     dateAdded:
//                       firebase.firestore.FieldValue.serverTimestamp(),
//                     dateRemoved: "",
//                     remarks: remarks,
//                     companyName: ctx.currentUser.companyName,
//                     companyID: ctx.currentUser.companyID,
//                     scanType: "out",
//                     uniqueID: key,
//                   })
//                   .then(function () {
//                     addData({
//                       id: data.length + 1,
//                       prodID: prodID,
//                       batchNo: batchNo,
//                       addedBy: ctx.currentUser.name,
//                       dateAdded: { seconds: toTimestamp(date) },
//                       scanType: "out",
//                       remarks: remarks,
//                     });
//                     // firebase
//                     //   .firestore()
//                     //   .collection("products")
//                     //   .doc(ctx.currentUser.companyName)
//                     //   .collection("products")
//                     //   .doc(prodID)
//                     //   .update({
//                     //     quantity: firebase.firestore.FieldValue.increment(-1),
//                     //   })
//                     //   .then(function () {
//                     firebase
//                       .firestore()
//                       .collection("batch")
//                       .doc(ctx.currentUser.companyName)
//                       .collection("prodID")
//                       .doc(prodID)
//                       .collection("batchNo")
//                       .doc(batchNo)
//                       .set(
//                         {
//                           quantity:
//                             firebase.firestore.FieldValue.increment(-1),
//                           batchNo: batchNo,
//                         },
//                         { merge: true }
//                       );
//                     // });
//                   })
//                   .then(function () {
//                     setErrorMessage("Scan out successful");
//                   });
//               } else if (snapshot.data().quantity < 0) {
//                 let bn = batchNo.replaceAll("/", "");
//                 firebase
//                   .firestore()
//                   .collection("batch")
//                   .doc(ctx.currentUser.companyName)
//                   .collection("prodID")
//                   .doc(prodID)
//                   .collection("batchNo")
//                   .doc(bn)
//                   .set(
//                     {
//                       quantity: 0,
//                       batchNo: batchNo,
//                     },
//                     { merge: true }
//                   );
//               } else {
//                 setErrorMessage("Invalid data entered");
//               }
//             } else {
//               setErrorMessage("Invalid data entered");
//             }
//           });
//       } else {
//         setErrorMessage("Invalid data entered");
//       }
//     });
// };

// .then(function () {
//   firebase
//     .firestore()
//     .collection("products")
//     .doc(ctx.currentUser.companyName)
//     .collection("products")
//     .doc(d.prodID)
//     .update({
//       quantity: firebase.firestore.FieldValue.increment(1),
//     });
// })
// .then(function () {
//   // console.log("test new batch id");
//   // console.log("d.prod id > ", d.prodID);
//   // console.log("d.batchNo id > ", d.batchNo);
//   let key = generateKey();
//   let bn = d.batchNo.replaceAll("/", "");
//   firebase
//     .firestore()
//     .collection("batch")
//     .doc(ctx.currentUser.companyName)
//     .collection("prodID")
//     .doc(d.prodID)
//     .collection("batchNo")
//     .doc(bn)
//     .set(
//       {
//         quantity: firebase.firestore.FieldValue.increment(1),
//         dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
//         batchNo: d.batchNo,
//         prodName: d.prodName,
//         key: key,
//         addedBy: ctx.currentUser.name,
//       },
//       { merge: true }
//     );
// })
