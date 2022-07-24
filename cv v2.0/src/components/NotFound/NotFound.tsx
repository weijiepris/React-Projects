import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      Sorry this is not a valid page <Link to="/">Click here to go home</Link>
    </div>
  );
};

export default NotFound;
