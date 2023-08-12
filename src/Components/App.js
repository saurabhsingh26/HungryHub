import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import About from "./About";
import Error from "./Error";
import RestaurantMenu from "./RestaurantMenu";
import OfferCard from "./Offers";
import ScrollToTop from "./ScrollToTop";
import Cart from "./Cart";
import Congratulations from "./Congratulations";
import Footer from "./Footer";
import Search from "./Search";

// import Grocery from "./Grocery";
const Grocery = lazy(() => import("./Grocery")); // syntax of lazy loading

const App = () => {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/search" element={<Search />} />
          <Route path="/offers" element={<OfferCard />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/grocery"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Grocery />
              </Suspense>
            }
          />
          <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/success" element={<Congratulations />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
