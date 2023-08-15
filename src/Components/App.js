import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignUp, Profile } from "../pages";
import {
  Body,
  About,
  Error,
  RestaurantMenu,
  OfferCard,
  ScrollToTop,
  Cart,
  Header,
  Congratulations,
  Footer,
  Search,
  FixedFooter,
  ProtectedRoute,
} from "./";


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
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<SignUp />} />
          <Route
            path="/users/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/order/success"
            element={
              <ProtectedRoute>
                <Congratulations />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <FixedFooter />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
