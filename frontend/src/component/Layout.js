import Navbar from "./NavBar";
import Footer from "./Footer"


export const Layout = ({children}) => {

  return (
    <>
        <Navbar />
        <div className="bg-dark bg-opacity-25 text-dark mh-100" style={{minHeight: "100vh"}}>
            {children}
        </div>
        <Footer />
    </>
  )
}
