import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Ajustá estas 3 rutas si los guardaste directo en adminComponents sin subcarpeta
import { Dashboard } from "./components/adminComponents/Dashboard";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />

      <Routes>
        {/* ---------------------- RUTAS PUBLICAS ------------------------- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<ItemListContainer />} />

          <Route path="/category/:category" element={<ItemListContainer />} />

          <Route path="/product/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartView />} />
        </Route>

        {/* Login por fuera de AdminLayout para acceder si no estamos logueados */}
        <Route path="/admin/login" element={<Login />} />

        {/* ----------------------------- ADMIN --------------------------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={"dashboard"} replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products/new" element={<ProductFormContainer />} />
          <Route path="products/edit/:id" element={<ProductFormContainer />} />
          <Route path="products/success/:id" element={<ProductSuccess />} />
        </Route>

        {/* Redirección por defecto si ingresan a una ruta inexistente */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
