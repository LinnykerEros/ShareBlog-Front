import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { SignIn } from "./pages/login";
import { Register } from "./pages/register";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserLogedPosts } from "./pages/userLogedPosts";
import Admin from "./pages/admin";
import { FilterProvider } from "./contexts/FilterContext";
import SearchUser from "./pages/searchUser";
import { Header } from "./components/Header";
import { UserPosts } from "./pages/userPosts";
function App() {
  return (
    <Router>
      <AuthProvider>
        <FilterProvider>
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} exact />
            <Route path="/register" element={<Register />} />
            <Route path="/userLogedPosts" element={<UserLogedPosts />} />
            <Route path="/userPosts" element={<UserPosts />} />
            <Route path="/searchUser" element={<SearchUser />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/app" element={<Home />} />
          </Routes>
        </FilterProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
