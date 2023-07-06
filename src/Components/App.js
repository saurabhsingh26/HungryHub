import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import About from "./About";
import  Contact  from "./Contact";
import Error from "./Error";
import RestaurantMenu from "./RestaurantMenu";
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

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      {/* <RouterProvider router={appRouter} /> */}
    </div>
  );
}



export default App;
