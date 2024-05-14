import Navbar from "./component/NavBar";
import Footer from "./component/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from "./component/HeroSection";

function App() {
  return (
    <>
    <div>
      <Navbar />
      <HeroSection />
    </div>
    <Footer />
    </>
  );
}

export default App;
