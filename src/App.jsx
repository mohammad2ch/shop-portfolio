import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Users from "./pages/Users";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Lauout from "./layout/Lauout";
import ThemeProvider from "./context/ThemeContext";
import LanguageProvider from "./context/LanguageContext";

const queryClient = new QueryClient();
if (import.meta.env.DEV) {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <LanguageProvider>
            <Lauout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/users" element={<Users />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
              </Routes>
            </Lauout>
          </LanguageProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
