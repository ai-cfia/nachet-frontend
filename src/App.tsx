import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Fragment, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import Navbar from "./components/header/navbar";
import Home from "./root/body";
import Footer from "./components/footer";
import Appbar from "./components/header/appbar";

function App(): JSX.Element {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [uuid, setUuid] = useState<string>("");
  const [creativeCommonsPopupOpen, setCreativeCommonsPopupOpen] =
    useState<boolean>(true);

  const handleCreativeCommonsAgreement = (agree: boolean): void => {
    if (agree) {
      Cookies.set("creative-commons-agreement", "true", { expires: 365 * 10 });
      console.log(
        "Creative Commons Agreement: ",
        Cookies.get("creative-commons-agreement"),
      );
    } else {
      Cookies.set("creative-commons-agreement", "false", { expires: 365 * 10 });
    }
    setCreativeCommonsPopupOpen(false);
  };

  const getCreativeCommonsAgreement = (): void => {
    const existingAgreement = Cookies.get("creative-commons-agreement");
    if (existingAgreement === undefined || existingAgreement === "false") {
      setCreativeCommonsPopupOpen(true);
    }
  };

  const createUuid = (): void => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    Cookies.set("user-uuid", newUuid, { expires: 365 * 10 });
  };

  const getUuid = (): void => {
    const existingUuid = Cookies.get("user-uuid") as string;
    if (existingUuid !== undefined) {
      setUuid(existingUuid);
      console.log("Existing UUID: " + existingUuid);
    } else {
      console.log("Creating new UUID");
      createUuid();
    }
  };

  useEffect(() => {
    getUuid();
    getCreativeCommonsAgreement();
  }, []);

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
          <Route
            path="/"
            element={
              <Home
                windowSize={windowSize}
                uuid={uuid}
                creativeCommonsPopupOpen={creativeCommonsPopupOpen}
                setCreativeCommonsPopupOpen={setCreativeCommonsPopupOpen}
                handleCreativeCommonsAgreement={handleCreativeCommonsAgreement}
              />
            }
          />
        </Routes>
        <Footer windowSize={windowSize} />
      </Fragment>
    </Router>
  );
}

export default App;
