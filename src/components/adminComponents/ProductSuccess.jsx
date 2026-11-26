import { Link, useLocation, useParams } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { FaCheckCircle, FaList, FaPlus } from "react-icons/fa";

export const ProductSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const { isEditing, nombre } = location.state || {};

  return (
    <Card className="p-5 text-center shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
      <FaCheckCircle size={55} className="text-success mx-auto mb-3" />
      <h3>{isEditing ? "¡Producto actualizado!" : "¡Producto creado con éxito!"}</h3>
      <p className="text-muted mb-2">
        {nombre
          ? `Los cambios en "${nombre}" ya se guardaron en Firestore.`
          : "La operación se completó correctamente en la base de datos."}
      </p>

      {id && (
        <div className="mb-4">
          <span className="text-muted small me-2">ID en Firestore:</span>
          <Badge bg="light" text="dark" className="border font-monospace">
            {id}
          </Badge>
        </div>
      )}

      <div className="d-flex justify-content-center gap-3">
        <Button as={Link} to="/admin/dashboard" variant="primary">
          <FaList className="me-1" /> Ir al Dashboard
        </Button>
        <Button as={Link} to="/admin/products/new" variant="outline-success">
          <FaPlus className="me-1" /> Cargar otro
        </Button>
      </div>
    </Card>
  );
};