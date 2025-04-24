import { Route, Routes } from "react-router";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import VincularTwitter from "./pages/auth/register/twitter/VincularTwitter";
import Loading from "./pages/loading/Loading";
import PrivateRoute from "./components/private_route/PrivateRoute";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/twitter/:token" element={<VincularTwitter />} />

        <Route path="/loading-test" element={<Loading />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute roles={["user"]} />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
