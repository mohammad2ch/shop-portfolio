import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import AddProduct from "../pages/AddProduct";

const ProductRoutes = () => {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="/add"  element={<AddProduct />} />
      <Route path=":id" element={<ProductDetail />} />
    </Routes>
  );
};

export default ProductRoutes;