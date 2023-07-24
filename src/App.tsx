import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Fragment, useState, useEffect } from "react";
import Navbar from "./components/header/navbar";
import Home from "./pages/body";
import Footer from "./components/footer";
import Appbar from "./components/header/appbar";

function App(): JSX.Element {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  return (
    <Router>
      <Fragment>
        <Navbar windowSize={windowSize} />
        <Appbar windowSize={windowSize} />
        <Routes>
          <Route path="/" element={<Home windowSize={windowSize} />} />
        </Routes>
        <Footer windowSize={windowSize} />
      </Fragment>
    </Router>
  );
}

export default App;
