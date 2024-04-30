import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Chat from "./pages/chat";
import Private from "./pages/Private";

function AuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = !!localStorage.getItem("token");

    if (!hasToken) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return null;
}

function App() {
  const hasToken = !!localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<AuthCheck />} />
        {hasToken && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/private_messages" element={<Private />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
