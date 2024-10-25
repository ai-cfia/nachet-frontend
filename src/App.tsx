import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useCallback, Fragment, useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import Navbar from "./components/header/navbar";
import Body from "./root/body";
import Footer from "./components/footer";
import Appbar from "./components/header/appbar";
import { decodeAndDecompressCookie } from "./common/cookiedecoder";

interface AppProps {
  basename?: string;
}

function App({
  basename = process.env.REACT_APP_BASENAME ?? "/",
}: AppProps): Promise<JSX.Element> {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [uuid, setUuid] = useState<string>("");
  // const [container_uuid, setContainerUuid] = useState<string>("");
  const [creativeCommonsPopupOpen, setCreativeCommonsPopupOpen] =
    useState<boolean>(false);
  const [switchLanguage, setSwitchLanguage] = useState<boolean>(false);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false);

  const handleCreativeCommonsAgreement = (agree: boolean): void => {
    // set a cookie to remember the users choice for 10 years (user choice should be stored in authentication database in the future)
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

  const getCreativeCommonsAgreement = useCallback((): void => {
    // check if the user has already agreed to the creative commons agreement (cookie)
    const existingAgreement = Cookies.get("creative-commons-agreement");
    if (existingAgreement === undefined || existingAgreement === "false") {
      setCreativeCommonsPopupOpen(true);
    }
  }, []);

  // const createContainerUuid = useCallback((): void => {
  //   // create a new uuid for user and set a cookie to remember it for 10 years (it is used to identify user container in azure storage)
  //   const newUuid = uuidv4();
  //   setContainerUuid(newUuid);
  //   Cookies.set("container-uuid", newUuid, { expires: 365 * 10 });
  // }, []);

  // const getContainerUuid = useCallback((): void => {
  //   // check if the user has already a uuid (cookie)
  //   const existingUuid = Cookies.get("container-uuid") as string;
  //   if (existingUuid !== undefined) {
  //     setContainerUuid(existingUuid);
  //     console.log("Existing Container UUID: " + existingUuid);
  //   } else {
  //     console.log("Creating new Container UUID");
  //     createContainerUuid();
  //   }
  // }, [createContainerUuid]);

  // const handleSignIn = (): void => {
  //   setSignedIn(true);
  // };

  const createTestCookie = Cookies.set("jxVouchCookie", 'H4sIAAAAAAAA_4SRTY-bMBCGf1ErsPejHJc0WEOBLM6CsS8r7GSLib1QgZXgX19ZqhT1tOeZZ-bV8563fJBE6YPOofEQVxoW-KSPagdPcJm7dpcn389bHivUbtJmqziGQTUpm6y8ozOP00FaM4K-6hq3_kSStUa3oWexh3F-BtuunJkFxkn3NvGCCXvqSqdQ5k4k8TUxTuHUcExniR6cQKXjaK-LXe44i03gjnfud_OPg89oAZOmHFVG4aqRaDVSwxPY0yTj5I9qqkhkhpaNGA97qiVa0xJT-tas-Gyq5RgN5Ny-RKyJiYh-hH_1kdH7nSDCZrEIIuz_GTm7XXuydxxljjM6FLYaCvL1TnAkuuEK43SrPDwefpa-9M1W7PJZ4TKUwCRuxz5Ih-hFiMsbaX-5VyEEfn_PH6CISJe4D_O61fukf_72YS6L5n8DAAD__-T0U8bFAQAA', {
    expires: 365 * 10,
  });

  // uuid will check if an email is already stored in the cookie, if not setsignup open
  const encodedJWT = Cookies.get("jxVouchCookie");
  if (encodedJWT) {
    const decodedJWT = decodeAndDecompressCookie(encodedJWT);
    if (decodedJWT.CustomClaims.email) {
      // setUuid(decodedJWT.email);
      // setSignedIn(true);
      console.log(decodedJWT.CustomClaims.email);
    }
  }
  // const getUuid = useCallback((): void => {
  //   // check if the user has email stored in the cookie
  //   const email: string | undefined = Cookies.get("user-email");
  //   if (email == null || !email.includes("@") || !signedIn) {
  //     setSignUpOpen(true);
  //   } else {
  //     requestUUID(email)
  //     .then((response) => {
  //       setUuid(response.data.uuid);
  //       Cookies.set("user-uuid", response.data.uuid, { expires: 30 });
  //     }
  //     setUuid(uuid);
  //     Cookies.set("user-uuid", uuid, { expires: 30 });
  //   }
  // }, [signedIn]);

  useEffect(() => {
    getCreativeCommonsAgreement();
  }, [getCreativeCommonsAgreement]);

  useEffect(() => {
    // update window size on resize
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
    <Router basename={basename}>
      <Fragment>
        <Navbar
          windowSize={windowSize}
          setSignedIn={setSignedIn}
          signedIn={signedIn}
          setSignUpOpen={setSignUpOpen}
          signUpOpen={signUpOpen}
        />
        <Appbar
          windowSize={windowSize}
          setSwitchLanguage={setSwitchLanguage}
          switchLanguage={switchLanguage}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Body
                windowSize={windowSize}
                uuid={uuid}
                creativeCommonsPopupOpen={creativeCommonsPopupOpen}
                setCreativeCommonsPopupOpen={setCreativeCommonsPopupOpen}
                handleCreativeCommonsAgreement={handleCreativeCommonsAgreement}
                setSignUpOpen={setSignUpOpen}
                signUpOpen={signUpOpen}
                signedIn={signedIn}
                setSignedIn={setSignedIn}
                setUuid={setUuid}
              />
            }
          />
        </Routes>
        <Footer uuid={uuid} windowSize={windowSize} />
      </Fragment>
    </Router>
  );
}

export default App;
