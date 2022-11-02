import _ from "lodash";
import axios from "axios";
import { useQuery } from "react-query";
const TestAxios = () => {
  const testFetch = async () => {
    const res = axios
      .get("http://localhost:3002/technologies")
      .then((response) => {
        return response;
      });

    return res;
  };
  const { data: technology, status } = useQuery("technology", testFetch);

  if (status === "loading") {
    return <p>Loadding</p>;
  }
  if (status === "error") {
    return <p>error</p>;
  }
  if (status === "success") {
    console.log(technology.data);
    return <p>success</p>;
  }
};

export default TestAxios;
