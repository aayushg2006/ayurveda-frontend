import { useState } from "react";
import { AuthPage } from "./components/auth/AuthPage";
import { DoctorDashboard } from "./components/doctor/DoctorDashboard";
import { PatientDashboard } from "./components/patient/PatientDashboard";

export type UserRole = "doctor" | "patient";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {currentUser.role === "doctor" ? (
        <DoctorDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <PatientDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}