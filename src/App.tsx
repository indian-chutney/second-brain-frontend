import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AuthContextProvider, ModalContextProvider } from "./contexts/contexts";
import { DashBoard } from "./pages/dashboard";
import { Landing } from "./pages/landing";
import { SignPage } from "./pages/signin";
import { useAuthContext } from "./hooks/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <ModalContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthContextProvider>
    </ModalContextProvider>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/signin" element={<SignPage variant="signin" />} />
          <Route path="/signup" element={<SignPage variant="signup" />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient();

const HomeRedirect = () => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated === false ? (
    <Landing />
  ) : (
    <QueryClientProvider client={queryClient}>
      <DashBoard varaint="dashboard" />
    </QueryClientProvider>
  );
};

export default App;
