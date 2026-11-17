import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop.JSX";
import MiniCart from "../components/MiniCart/MiniCart";
import { Toaster } from "sonner";
const Lauout = ({ children }) => {
  return (
    <div>
      <Toaster
        position="top-center"
        theme="system"
        dir="rtl"
        expand
        visibleToasts={3}
        gap={12}
      />
      <ScrollToTop />
      <Header />
      <main className="min-h-lvh">{children}</main>
      <MiniCart />
      <Footer />
    </div>
  );
};

export default Lauout;
