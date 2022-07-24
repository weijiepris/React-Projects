import React, { useEffect, useState } from "react";
import axios from "axios";

const Footer = (props: any) => {

  props.test = "test";
  // const url = "https://jsonplaceholder.typicode.com/users";
  // const name = "chan wei jie";

  // const res = new Set(name.split(""));

  // console.log(res);

  // const [users, setUsers] =0 useState<any>([]);

  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const modifyArr = (arr: number[], cb: Function) => {
    arr.push(4);
    cb();
  };

  const arr = [1, 2, 3];
  modifyArr(arr, () => {
    console.log(arr);
  });

  return <div>hello</div>;
  // return users && users.map((user: any) => <div>{user.company.name}</div>);
};

export default Footer;
