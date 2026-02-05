import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DsaSheet from "./pages/DsaSheet";
import ChatArena from "./pages/ChatArena";
import AiPlanner from "./pages/AiPlanner";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import AdminDashboard from "./pages/AdminDashboard";
import SubjectPage from "./pages/SubjectPage";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Protected */}
        <Route
          path="/dsa"
          element={
            <ProtectedRoute>
              <DsaSheet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatArena />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-planner"
          element={
            <ProtectedRoute>
              <AiPlanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/core-subjects"
          element={
            <ProtectedRoute>
              <SubjectPage category="CORE" title="Core Subjects" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lld"
          element={
            <ProtectedRoute>
              <SubjectPage category="LLD" title="Low Level Design (LLD)" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hld"
          element={
            <ProtectedRoute>
              <SubjectPage category="HLD" title="High Level Design (HLD)" />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
