import { Route, Routes } from "react-router";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import VincularTwitter from "./pages/auth/register/twitter/VincularTwitter";
import Loading from "./pages/loading/Loading";
import PrivateRoute from "./components/private_route/PrivateRoute";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import PostDetail from "./pages/post_detail/PostDetail";
import DocumentValidation from "./pages/auth/document-validation/DocumentValidation";
import LinkAccounts from "./pages/link_accounts/LinkAccounts";
import LandingPage from "./pages/landing_page/LandingPage";
import LoginAdmin from "./pages/auth/admin/LoginAdmin";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/twitter/:token" element={<VincularTwitter />} />
        <Route
          path="/document/validation/:token/:cpf"
          element={<DocumentValidation />}
        />

        <Route path="/restricted/access" element={<LoginAdmin />} />

        <Route path="/loading-test" element={<Loading />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute roles={["user"]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:post_id" element={<PostDetail />} />
          <Route path="/link/accounts" element={<LinkAccounts />} />
        </Route>

        <Route element={<PrivateRoute roles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Error */}
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
        <Route path="/not-found" element={<h1>Not Found</h1>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
