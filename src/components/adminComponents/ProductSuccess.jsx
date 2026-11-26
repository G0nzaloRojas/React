import { Link, useLocation, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./ProductSuccess.css";

export const ProductSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const { isEditing, nombre } = location.state || {};

  return (
    <section className="success-page">
      <FaCheckCircle className="success-icon text-success" />
      <h2>{isEditing ? "¡Producto actualizado!" : "¡Producto creado con éxito!"}</h2>
      <p>
        {nombre
          ? `Los cambios en "${nombre}" ya se guardaron en Firestore.`
          : "La operación se completó correctamente en la base de datos."}
        {id && (
          <>
            <br />
            <strong>ID registrado:</strong> {id}
          </>
        )}
      </p>

      <div className="success-actions">
        <Link to="/admin/dashboard" className="btn btn-primary">
          Ir al Dashboard
        </Link>
        <Link to="/admin/products/new" className="btn btn-secondary">
          Cargar otro producto
        </Link>
      </div>
    </section>
  );
};