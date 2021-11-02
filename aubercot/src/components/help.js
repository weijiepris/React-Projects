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

// firebase
//   .firestore()
//   .collection("products")
//   .doc(ctx.currentUser.companyName)
//   .collection("products")
//   .orderBy("serialno", "asc")
//   .get()
//   .then((snapshot) => {
//     let tempQuantity = 0;
//     if (snapshot.docs.length) {
//       let temp2 = [];
//       let c = 1;
//       snapshot.forEach((doc) => {
//         // console.log(doc.data());
//         let tempQ = 0;
//         firebase
//           .firestore()
//           .collection("batch")
//           .doc(ctx.currentUser.companyName)
//           .collection("prodID")
//           .doc(doc.data().id)
//           .collection("batchNo")
//           .orderBy("quantity", "asc")
//           .get()
//           .then((snapshot) => {
//             if (snapshot.docs.length) {
//               snapshot.forEach((docs) => {
//                 if (docs.data().quantity > 0) {
//                   // console.log("t =>", docs.data());

//                   let r = [];
//                   r = {
//                     prodID: doc.data().id,
//                     quantity: docs.data().quantity,
//                     batchNo: docs.data().batchNo,
//                     prodName: docs.data().prodName,
//                     dateAdded: docs.data().dateAdded,
//                   };
//                   addCurrentInventory(r);
//                   tempQ += docs.data().quantity;
//                 }
//               });
//             }
//           })
//           .then(function () {
//             tempQuantity += tempQ;
//           })
//           .then(function () {
//             temp2[0] = ["Element", "In stock", { role: "style" }];
//             temp2[c] = [
//               doc.data().name,
//               tempQ,
//               "stroke-color: black;stroke-width: 2; fill-color:" +
//                 doc.data().color +
//                 ";",
//             ];
//             setQuantity(snapshot.docs.length);
//             setBargraph(temp2);
//             c++;
//           });
//       });
//     }
//   });

// firebase
//   .firestore()
//   .collection("batch")
//   .doc(ctx.currentUser.companyName)
//   .collection("products")
//   .where("scanType", "==", "in")
//   .orderBy("dateAdded", "asc")
//   .get()
//   .then((snapshot) => {
//     let arr = [];
//     let testing = [];
//     let temp2 = [];
//     snapshot.forEach((doc) => {
//       const dt = doc.data().prodID;
//       const dt2 = getDate(doc.data().dateAdded["seconds"]);
//       if (!arr[dt]) {
//         arr[dt] = 1;
//       } else {
//         arr[dt] += 1;
//       }

//       if (!testing[dt2]) {
//         testing[dt2] = 1;
//       } else {
//         testing[dt2] += 1;
//       }
//     });

//     let op = [];
//     let c = 1;
//     temp2[0] = ["Date", "Scan in"];
//     temp2[1] = ["No Data Found", 0];
//     for (const value in testing) {
//       op = [
//         ...op,
//         {
//           x: new Date(value),
//           y: testing[value],
//         },
//       ];

//       temp2[c] = [
//         new Date(value).toString().substring(4, 15),
//         testing[value],
//       ];
//       c++;
//     }
//     // console.log(temp2);
//     setLinegraph(temp2);

//     // console.log("testing => ", arr);
//     for (const t in arr) {
//       firebase
//         .firestore()
//         .collection("batch")
//         .doc(ctx.currentUser.companyName)
//         .collection("products")
//         .where("prodID", "==", t)
//         .orderBy("dateAdded", "desc")
//         .get()
//         .then((snapshot) => {
//           let arr2 = [];
//           let c = 0;
//           snapshot.forEach((doc) => {
//             // console.log("d = ", doc.data());
//             const dt = getDate(doc.data().dateAdded["seconds"]);
//             if (!arr2[c]) {
//               arr2[c] = {
//                 count: 1,
//                 date: dt,
//                 prodID: t,
//                 prodName: doc.data().prodName,
//               };
//             } else {
//               if (arr2.prodID === t) {
//                 for (const d in arr2) {
//                   if (arr2[d].count) {
//                     arr2[d].count++;
//                   }
//                 }
//               }
//             }
//             c++;
//           });
//           let v = {};
//           v["data"] = arr2;
//           addSummary(v);
//         });
//     }
//   });

// firebase
//   .firestore()
//   .collection("products")
//   .doc(ctx.currentUser.companyName)
//   .collection("products")
//   .orderBy("serialno", "desc")
//   .get()
//   .then((snapshot) => {
//     if (snapshot.docs.length) {
//       snapshot.forEach((doc) => {
//         let t = doc.data();
//         let tempQ = 0;
//         firebase
//           .firestore()
//           .collection("batch")
//           .doc(ctx.currentUser.companyName)
//           .collection("prodID")
//           .doc(doc.data().id)
//           .collection("batchNo")
//           .orderBy("quantity", "asc")
//           .get()
//           .then((snapshot) => {
//             if (snapshot.docs.length) {
//               snapshot.forEach((docs) => {
//                 if (docs.data().quantity > 0) {
//                   tempQ += docs.data().quantity;
//                 }
//               });
//             }
//           })
//           .then(function () {
//             t.quantity = tempQ;
//             console.log(t);
//             addInventory(t);
//           });
//       });
//     } else {
//       console.log("no data found");
//       setDataExists(false);
//     }
//     setIsLoaded(true);
//   });

// const retrieveList = () => {
//   setIsLoaded(false);
//   setInventory([]);
//   firebase
//     .firestore()
//     .collection("products")
//     .doc(ctx.currentUser.companyName)
//     .collection("products")
//     .orderBy("serialno", "desc")
//     .get()
//     .then((snapshot) => {
//       // console.log("testing => ", snapshot.docs);
//       if (snapshot.docs.length) {
//         snapshot.forEach((doc) => {
//           addInventory(doc.data());
//           // console.log(doc.data());
//         });
//       } else {
//         console.log("no data found");
//         setDataExists(false);
//       }
//       setIsLoaded(true);
//     });
// };

// firebase
//   .firestore()
//   .collection("products")
//   .doc(ctx.currentUser.companyName)
//   .collection("products")
//   .orderBy("serialno", "asc")
//   .get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       products.push(doc.data());
//       if (!prodArr[doc.data().id]) {
//         prodArr[doc.data().id] = 0;
//       }
//       firebase
//         .firestore()
//         .collection("batch")
//         .doc(ctx.currentUser.companyName)
//         .collection("products")
//         .where("prodID", "==", doc.data().id)
//         .where("scanType", "==", "in")
//         .get()
//         .then((snapshot) => {
//           snapshot.forEach((docs) => {
//             prodArr[doc.data().id] += 1;
//           });
//         })
//         .then(function () {
//           for (let i in prodArr) {
//             for (let k in products) {
//               if (products[k].id == i) {
//                 products[k].quantity = prodArr[i];
//               }
//             }
//           }
//         })
//         .then(function () {});
//     });
//   })
//   .then(function () {
//     setInventory(products);
//     setIsLoaded(true);
//   });

// const fetchData = async () => {
//   console.log("fetching data for ViewInventory");
//   let prodArr = [];
//   let products = [];

//   const productsRef = firebase
//     .firestore()
//     .collection("products")
//     .doc(ctx.currentUser.companyName)
//     .collection("products");

//   const batchRef = firebase
//     .firestore()
//     .collection("batch")
//     .doc(ctx.currentUser.companyName)
//     .collection("products");

//   const productsSnapshot = await productsRef
//     .orderBy("id", "asc")
//     .get({ source: "cache" });
//   const batchSnapshot = await batchRef
//     .where("scanType", "==", "in")
//     .get({ source: "cache" });

//   productsSnapshot.forEach(async (doc) => {
//     products.push(doc.data());
//     if (!prodArr[doc.data().id]) {
//       prodArr[doc.data().id] = 0;
//     }
//   });

//   batchSnapshot.forEach((doc) => {
//     prodArr[doc.data().prodID] += 1;
//   });

//   for (let i in prodArr) {
//     for (let k in products) {
//       if (products[k].id === i) {
//         products[k].quantity = prodArr[i];
//       }
//     }
//   }

//   products.sort(function (a, b) {
//     var textA = a.prodID.toUpperCase();
//     var textB = b.prodID.toUpperCase();
//     return textA < textB ? -1 : textA > textB ? 1 : 0;
//   });

//   setInventory(products);
//   setDataExists(true);
//   setIsLoaded(true);
// };

// firebase
//   .firestore()
//   .collection("products")
//   .doc(ctx.currentUser.companyName)
//   .collection("products")
//   .get()
//   .then((snapshot) => {
//     let prodArr = [];
//     let currentArr = [];
//     let barGraphArr = [];
//     let stockCount = 0;
//     let stockOutCount = 0;
//     setQuantity(snapshot.docs.length);
//     snapshot.forEach((docs) => {
//       // define array to store all the product names
//       if (
//         typeof prodArr[docs.data().name + "//" + docs.data().color] ==
//         "undefined"
//       ) {
//         prodArr[docs.data().name + "//" + docs.data().color] = 0;
//       }
//       firebase
//         .firestore()
//         .collection("batch")
//         .doc(ctx.currentUser.companyName)
//         .collection("products")
//         .orderBy("dateAdded", "asc")
//         .where("prodID", "==", docs.data().id)
//         .get()
//         .then((snapshot) => {
//           snapshot.forEach((doc) => {
//             if (doc.data().scanType === "in") {
//               if (
//                 !currentArr[
//                   doc.data().prodID +
//                     "//" +
//                     doc.data().batchNo +
//                     "//" +
//                     doc.data().prodName +
//                     "//" +
//                     getDate(doc.data().dateAdded["seconds"])
//                 ]
//               ) {
//                 currentArr[
//                   doc.data().prodID +
//                     "//" +
//                     doc.data().batchNo +
//                     "//" +
//                     doc.data().prodName +
//                     "//" +
//                     getDate(doc.data().dateAdded["seconds"])
//                 ] = 1;
//               } else {
//                 currentArr[
//                   doc.data().prodID +
//                     "//" +
//                     doc.data().batchNo +
//                     "//" +
//                     doc.data().prodName +
//                     "//" +
//                     getDate(doc.data().dateAdded["seconds"])
//                 ] += 1;
//               }
//               stockCount += 1;
//               // find all available product name and count them into array
//               prodArr[doc.data().prodName + "//" + docs.data().color] += 1;
//             } else {
//               stockOutCount += 1;
//             }
//           });
//         })
//         .then(function () {
//           setCurrentInv(currentArr);
//           setStockQuantity(stockCount);
//           setStockOut(stockOutCount);
//           // default if dataset is empty
//           barGraphArr[0] = ["Element", "In stock", { role: "style" }];
//           barGraphArr[1] = ["No Data Found", 0, "transparent"];
//           let c = 1;
//           for (let i in prodArr) {
//             let res = i.split("//");
//             barGraphArr[c] = [
//               res[0],
//               prodArr[i],
//               "stroke-color: black; stroke-width: 2; fill-color:" +
//                 res[1] +
//                 "; opacity:0.8;",
//             ];
//             c++;
//           }
//         });
//     });
//     setBargraph(barGraphArr);
//   });

// firebase
//   .firestore()
//   .collection("batch")
//   .doc(ctx.currentUser.companyName)
//   .collection("products")
//   .orderBy("dateAdded", "asc")
//   .get()
//   .then((snapshot) => {
//     setTotalStock(snapshot.docs.length);
//     let arr = [];
//     let testing = [];
//     let temp2 = [];
//     snapshot.forEach((doc) => {
//       const dt = doc.data().prodID;
//       if (!arr[dt]) {
//         arr[dt] = 1;
//       } else {
//         arr[dt] += 1;
//       }
//       if (doc.data().scanType === "in") {
//         const dt2 = getDate(doc.data().dateAdded["seconds"]);
//         if (!testing[dt2]) {
//           testing[dt2] = 1;
//         } else {
//           testing[dt2] += 1;
//         }
//       } else {
//       }
//     });

//     let op = [];
//     let c = 1;
//     temp2[0] = ["Date", "Scan in"];
//     temp2[1] = ["No Data Found", 0];
//     for (const value in testing) {
//       op = [
//         ...op,
//         {
//           x: new Date(value),
//           y: testing[value],
//         },
//       ];

//       temp2[c] = [
//         new Date(value).toString().substring(4, 15),
//         testing[value],
//       ];
//       c++;
//     }
//     // console.log(temp2);
//     setLinegraph(temp2);

// console.log("testing => ", arr);
for (const t in arr) {
  firebase
    .firestore()
    .collection("batch")
    .doc(ctx.currentUser.companyName)
    .collection("products")
    .where("prodID", "==", t)
    .orderBy("dateAdded", "desc")
    .get()
    .then((snapshot) => {
      let arr2 = [];
      let c = 0;
      snapshot.forEach((doc) => {
        // console.log("d = ", doc.data());
        const dt = getDate(doc.data().dateAdded["seconds"]);
        if (!arr2[c]) {
          arr2[c] = {
            count: 1,
            date: dt,
            prodID: t,
            prodName: doc.data().prodName,
            batchNo: doc.data().batchNo,
          };
        } else {
          if (arr2.prodID === t) {
            for (const d in arr2) {
              if (arr2[d].count) {
                arr2[d].count++;
              }
            }
          }
        }
        c++;
      });
      let v = {};
      v["data"] = arr2;
      addSummary(v);
    });
}

const fetchData = async () => {
  console.log("fetching data for scan history");

  const batchRef = firebase
    .firestore()
    .collection("batch")
    .doc(ctx.currentUser.companyName)
    .collection("products");

  const batchSnapshot = await batchRef.get();
  let arr = [];
  let arr2 = [];
  batchSnapshot.forEach((doc) => {
    let inArr = [];
    let outArr = [];
    if (doc.data().dateRemoved === "") {
      if (
        getDate2(doc.data().dateAdded["seconds"]) ===
        new Date().toString().substring(4, 15)
      ) {
        arr2.push(doc.data());
      }
      arr.push(doc.data());
    } else {
      inArr = doc.data();
      inArr.scanType = "in";
      outArr = doc.data();
      outArr.dateAdded = outArr.dateRemoved;

      if (outArr.removedBy === "" || !outArr.removedBy) {
        outArr.addedBy = outArr.addedBy;
      } else {
        outArr.addedBy = outArr.removedBy;
      }

      if (outArr.remarksOut === "" || !outArr.remarksOut) {
        outArr.remarks = outArr.remarks;
      } else {
        outArr.remarks = outArr.remarksOut;
      }

      if (
        getDate2(inArr.dateAdded["seconds"]) ===
        new Date().toString().substring(4, 15)
      ) {
        arr2.push(inArr);
      }

      if (
        getDate2(outArr.dateAdded["seconds"]) ===
        new Date().toString().substring(4, 15)
      ) {
        arr2.push(outArr);
      }
      arr.push(inArr);
      arr.push(outArr);
    }

    arr.sort(function (a, b) {
      var textA = a.scanType.toUpperCase();
      var textB = b.scanType.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    arr.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(b.dateAdded["seconds"]) - new Date(a.dateAdded["seconds"])
      );
    });
    arr2.sort(function (a, b) {
      var textA = a.scanType.toUpperCase();
      var textB = b.scanType.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    arr2.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(b.dateAdded["seconds"]) - new Date(a.dateAdded["seconds"])
      );
    });

    addData(arr2);
    addFilter(arr);
  });
};

const fetchData = async () => {
  let arr = [];
  let arr2 = [];
  ctx.batch.forEach((doc) => {
    let inArr = [];
    let outArr = [];
    if (doc.dateRemoved === "") {
      if (
        getDate2(doc.dateAdded["seconds"]) ===
        new Date().toString().substring(4, 15)
      ) {
        arr2.push(doc);
      }
      arr.push(doc);
    } else {
      inArr = doc;
      inArr.scanType = "in";
      outArr = doc;
      outArr.dateAdded = outArr.dateRemoved;

      if (outArr.removedBy === "" || !outArr.removedBy) {
        outArr.addedBy = outArr.addedBy;
      } else {
        outArr.addedBy = outArr.removedBy;
      }

      if (outArr.remarksOut === "" || !outArr.remarksOut) {
        outArr.remarks = outArr.remarks;
      } else {
        outArr.remarks = outArr.remarksOut;
      }

      if (
        getDate2(inArr.dateAdded["seconds"]) ===
        new Date().toString().substring(4, 15)
      ) {
        arr2.push(inArr);
      }

      if (
        getDate2(outArr.dateAdded["seconds"]) ===
        new Date().toString().substring(4, 15)
      ) {
        arr2.push(outArr);
      }
      arr.push(inArr);
      arr.push(outArr);
    }

    arr.sort(function (a, b) {
      var textA = a.scanType.toUpperCase();
      var textB = b.scanType.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    arr.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(b.dateAdded["seconds"]) - new Date(a.dateAdded["seconds"])
      );
    });
    arr2.sort(function (a, b) {
      var textA = a.scanType.toUpperCase();
      var textB = b.scanType.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    arr2.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(b.dateAdded["seconds"]) - new Date(a.dateAdded["seconds"])
      );
    });

    addData(arr2);
    addFilter(arr);
  });
};

const checkValid = () => {
  let arrayCheck = [];
  for (let i in obj) {
    if (typeof arrayCheck[obj[i].prodID] == "undefined") {
      arrayCheck[obj[i].prodID] = 0;
    }
    arrayCheck[obj[i].prodID] += obj[i].amount;
  }
  console.log(arrayCheck);

  for (let i in arrayCheck) {
    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .where("prodID", "==", i)
      .where("scanType", "==", "in")
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs.length);
        if (arrayCheck[i] > snapshot.docs.length) {
          setErrorMessage(
            "Exceeded amount for " +
              i +
              " (Remaining amount: " +
              snapshot.docs.length +
              ")"
          );
          document.getElementById("errorMessage").style.backgroundColor = "red";
          document.getElementById("errorMessage").style.color = "white";
        }
      });
  }
};