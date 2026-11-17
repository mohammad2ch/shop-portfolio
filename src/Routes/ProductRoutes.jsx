import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import AddProduct from "../pages/AddProduct";
import NotFound from "../pages/NotFound";

const ProductRoutes = () => {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="/add"  element={<AddProduct />} />
      <Route path=":id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProductRoutes;