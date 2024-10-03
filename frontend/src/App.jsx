import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/signup/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import SideBar from "./components/common/SideBar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const { data: authUser, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        
        return data; // Return the authenticated user data
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-500">Failed to load user data. Please try again later.</p>
      </div>
    );
  }

  const renderSidebarAndPanel = () => (
    <>
      {authUser && <SideBar />}
      {authUser && <RightPanel />}
    </>
  );

  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        {renderSidebarAndPanel()}
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
