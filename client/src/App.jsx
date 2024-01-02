import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import About from "./views/About/About";
import Nav from "./components/Nav/Nav";
import Error404 from "./views/Error404/Error404";
import axios from "axios";
import { getDriverByName } from "./redux/action/actions";

function App() {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);

  const createDriver = async (driver) => {
    const URL = "http://localhost:3001/drivers";

    try {
      const { data } = await axios.post(URL, driver);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async (driverName) => {
    if (!driverName) {
      console.log("Please enter a driver name");
      return;
    }

    // Llamar a getDriverByName y reemplazar los conductores existentes
    dispatch(getDriverByName(driverName));
  };

  const location = useLocation();
  return (
    <>
      <div>
        {location.pathname !== "/" && <Nav onSearch={onSearch} />}

        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/form" element={<Form createDriver={createDriver} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
