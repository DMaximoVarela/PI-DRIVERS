import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div>
        <h1>Welcome to my PI Drivers!</h1>
        <Link to={"/home"}>
          <button>Start</button>
        </Link>
        <img src="https://wallpapercave.com/wp/wp8893820.jpg" alt="F1 image" />
      </div>
    </>
  );
};

export default Landing;
