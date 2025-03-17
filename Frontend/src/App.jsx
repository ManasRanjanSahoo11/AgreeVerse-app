import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import PageNotFound from "./pages/PageNotFound";
import ProductDetailsAndPayment from "./pages/ProductDetailsAndPayment";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/product/:productId" element={<ProductDetailsAndPayment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App