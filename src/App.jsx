import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/login";
import SignUp from "./components/auth/Register";
import Profile from "./components/profile/profile";
import PrivateRoute from "./helper/PrivateRoute ";
import { useState } from "react";


function App() {
 const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="bg-slate-900 h-screen">
        <Routes>
          {/* Protect the profile route with the PrivateRoute */}
          <Route
            path="/profile"
            element={<PrivateRoute user={user} element={<Profile />} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn  setUser={setUser}/>} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

