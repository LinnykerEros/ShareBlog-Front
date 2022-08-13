import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { SignIn } from "./pages/login";
import { Register } from "./pages/register";
import { AuthProvider } from "./contexts/AuthContext.jsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
