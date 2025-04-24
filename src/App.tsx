import { Route, Routes } from "react-router";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import VincularTwitter from "./pages/auth/register/twitter/VincularTwitter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/register/twitter/:token" element={<VincularTwitter />} />
      </Routes>
    </>
  );
}

export default App;
