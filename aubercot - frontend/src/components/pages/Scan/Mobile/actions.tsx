import { SummarisedModel } from "../model/ScanModel";

export const mapSummariseObject = (posts: any[]) => {
  let map = new Map();

  // set up hashmap
  posts.forEach((post) => {
    if (map.has(post.userId)) {
      map.set(post.userId, map.get(post.userId) + 1);
    } else {
      map.set(post.userId, 1);
    }
  });

  let obj: SummarisedModel[] = [];

  //set up obj and append key and count
  map.forEach((value, key) => {
    let summarisedDto: SummarisedModel = {
      userId: key,
      count: value,
      body: [],
    };
    obj.push(summarisedDto);
  });

  // append additional data into obj
  obj.forEach((data) => {
    posts.forEach((post) => {
      if (data.userId === post.userId) {
        data.body.push(post);
      }
    });
  });

  return obj;
};
