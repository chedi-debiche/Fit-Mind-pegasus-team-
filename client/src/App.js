import Header from "./components/backoffice/sharedBack/Header";
import Home from "./components/backoffice/Home";
import SideNav from "./components/backoffice/sharedBack/SideNav";
import Footer from "./components/backoffice/sharedBack/Footer";
import HeaderFront from "./components/frontoffice/shared/HeaderFront";
import HomeFront from "./components/frontoffice/HomeFront";
import FooterFront from "./components/frontoffice/shared/FooterFront";

function App() {
  return (
  <>

  {/* back office */}
  {/* <Header /> 
  <Home />
  <SideNav/>
   <Footer/>  */}

  {/* front office */}
  <HeaderFront/>
  <HomeFront/>
  <FooterFront/>

  {/* <Front/> */}

  </>
  );
}

export default App;
