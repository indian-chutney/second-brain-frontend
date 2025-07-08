import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import {
  AuthContextProvider,
  ContentContextProvider,
  ModalContextProvider,
  ShareContextProvider,
} from "./contexts/contexts";
import { DashBoard } from "./pages/dashboard";
import { Landing } from "./pages/landing";
import { SignPage } from "./pages/signin";
import { useAuthContext } from "./hooks/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Content } from "./pages/content";
import { HomeLayout } from "./pages/homelayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();
  const queryClient = new QueryClient();

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
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignPage variant="signin" />} />
              <Route path="/signup" element={<SignPage variant="signup" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <ModalContextProvider>
                    <QueryClientProvider client={queryClient}>
                      <ContentContextProvider>
                        <ShareContextProvider>
                          <HomeLayout />
                        </ShareContextProvider>
                      </ContentContextProvider>
                    </QueryClientProvider>
                  </ModalContextProvider>
                }
              >
                <Route index element={<DashBoard varaint="dashboard" />} />
                <Route path="content/:id" element={<Content />} />
                <Route
                  path="share/:id"
                  element={<DashBoard varaint="share" />}
                />
                <Route
                  path="share/:id/:contentId"
                  element={<Content variant="shared" />}
                />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
