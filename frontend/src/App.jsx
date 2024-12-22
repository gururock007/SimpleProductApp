import { Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/Navbar.component";
import CreateProductPage from "./pages/CreateProduct.page";
import ViewProductPage from "./pages/ViewProduct.page";
import EditProductPage from "./pages/EditProduct.page";

const App = () => {
  
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" Component={ViewProductPage} />
        <Route path="/create-product" Component={CreateProductPage} />
        <Route path="/edit" Component={EditProductPage} />
      </Routes>
    </>
  );
}

export default App
