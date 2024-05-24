import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from "./component/HeroSection";
import Payment from "./component/Payment";
import { Layout } from "./component/Layout";
import Ticket from "./component/Ticket";
import Transaction from "./component/Transaction";
import PaymentSuccess from "./component/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Layout>
              <HeroSection />
            </ Layout>
          </>
        } />

        <Route path="/payment" element={
          <>
            <Layout>
              <Payment />
            </ Layout>
          </>
        } />

        <Route path="/payment/success" element={
          <>
          <Layout>
            <PaymentSuccess />
          </ Layout>
        </>
        } />

        <Route path="/tickets" element={
          <>
            <Layout>
              <Ticket />
            </ Layout>
          </>
        } />
        

        <Route path="/transaction" element={
          <>
            <Layout>
              <Transaction />
            </ Layout>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
