import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound";
import StudentListing from "./components/Helpers/StudentListing";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="*" element={<PageNotFound />} />
        <Route path="/studentportal" element={<StudentListing />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
