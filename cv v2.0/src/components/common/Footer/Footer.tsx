import React, { useEffect, useState } from "react";
import axios from "axios";

const Footer = (props: any) => {
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
  // const user = { name: "weijie", address: { state: "bedok" } };

  // const {
  //   name: n,
  //   address: { state },
  // } = user;

  // console.log(n, state);

  // const modifyArr = (arr: number[], cb: Function) => {
  //   arr.push(4);
  //   let arr2 = new Set(arr);
  //   console.log(cb());
  //   console.log(arr2);
  // };

  // const arr = [1, 2, 3, 3, 3, 3];
  // modifyArr(arr, () => {
  //   console.log(arr);
  // });

  // // axios
  // //   .get("url")
  // //   .then((res: any) => console.log(res))
  // //   .catch((error: any) => {});

  // const useDebounce = (inputValue: string, delay = 500) => {
  //   const [value, setValue] = useState("");

  //   useEffect(() => {
  //     const timer = setTimeout(() => setValue(inputValue), delay);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, [inputValue, delay]);

  //   return value;
  // };

  // const [text, setText] = useState("");
  // const debounceValue = useDebounce(text);
  // let x: any;
  // const onChange = (event: any) => {
  //   setText(event.target.value);
  // };
  // useEffect(() => {
  //   console.log(debounceValue);
  // }, [debounceValue]);

  // const arr = [0, 0, 0, 0, 0, 8, 5, 0, 10, 0, 20];

  // // arr of numbers, move all 0 to the back
  // const moveZeros = (arr: number[]) => {
  //   let c = 0;
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i] !== 0) {
  //       [arr[i], arr[c]] = [arr[c], arr[i]];
  //       c++;
  //     }
  //   }
  //   return arr;
  // };

  // [arr[0], arr[1]] = [3, 5];
  // console.log([arr[0], arr[1]]);

  // arr.forEach((ele: number, index: number) => {
  //   let zCount = 0;
  //   if (ele !== 0) {
  //     [arr[index], arr[zCount]] = [arr[zCount], arr[index]];
  //     zCount++;
  //   }
  // });
  // console.log(arr);

  // "MCMXCIV"
  // 1994
  // M = 1000, CM = 900, XC = 90 and IV = 4.
  const romanToInt = (s: string): number => {
    let ans = 0;
    let symbol: any = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

    Object.keys(symbol).forEach((value: any, index: number) => {
      console.log(value, index);
    });

    for (let i = 0; i < s.length; i++) {
      if (i + 1 < s.length) {
        let current = symbol[s[i]];
        let next = symbol[s[i + 1]];
        if (current < next) {
          console.log(next - current);
        } else {
          ans += current;
        }
      }
    }

    return ans;
  };

  let list = "III";

  console.log(romanToInt(list));

  return (
    <div>
      <input type="text"></input>
    </div>
  );
  // return users && users.map((user: any) => <div>{user.company.name}</div>);
};

export default Footer;
