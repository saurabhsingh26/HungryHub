import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import About from "./About";
import Error from "./Error";
import RestaurantMenu from "./RestaurantMenu";
import OfferCard from "./Offers";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Body />,
//     errorElement: <Error />,
//   },
//   {
//     path: "/about",
//     element: <About />,
//   },
//   {
//     path: "/contact",
//     element: <Contact />,
//   },
// ]);

// import Grocery from "./Grocery";
const Grocery = lazy(() => import("./Grocery")); // syntax of lazy loading

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
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
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      {/* <RouterProvider router={appRouter} /> */}
    </div>
  );
}



export default App;
