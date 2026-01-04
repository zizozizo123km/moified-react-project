import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Mock Components representing the structure of a Facebook application
// In a real application, these would be imported from external files (e.g., ./pages/Feed)

const MainLayout = () => (
  <div className="facebook-layout">
    {/* Header/Navigation Bar (e.g., Blue bar) */}
    <header style={{ height: '56px', backgroundColor: '#4267B2', color: 'white', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
      <h1>Fakebook</h1>
    </header>
    <div style={{ display: 'flex', paddingTop: '16px', justifyContent: 'center' }}>
        {/* Renders nested routes (Feed, Profile, etc.) */}
        <Outlet />
    </div>
  </div>
);

const FeedPage = () => (
  <div className="feed-page" style={{ width: '600px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    <h2>News Feed (Scrollable content)</h2>
    <p>Post 1...</p>
    <p>Post 2...</p>
  </div>
);

const ProfilePage = () => (
  <div className="profile-page" style={{ width: '900px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    <h2>User Profile (Timeline & Info)</h2>
  </div>
);

const LoginPage = () => (
  <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
    <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h3>Log In or Sign Up</h3>
    </div>
  </div>
);

const NotFound = () => (
    <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>404 Page Not Found</h1>
        <p>The page you requested was not found.</p>
    </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated Routes (Wrapped in Main Layout) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<FeedPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            {/* Example: Route path="/friends" element={<FriendsPage />} */}
          </Route>
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;