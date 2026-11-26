import { Card, Button } from "react-bootstrap";
import { FaCheck, FaTrashAlt } from "react-icons/fa";

export const CartSummary = ({ total, onClear, onCheckout }) => {
  const totalFinal = typeof total === "function" ? total() : total;

  return (
    <Card className="p-4 shadow-sm cart-summary-card">
      <h4 className="mb-3">Resumen de Compra</h4>
      <hr />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fs-5 fw-semibold">Total a pagar:</span>
        <span className="fs-4 fw-bold text-primary">${totalFinal}</span>
      </div>

      <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={onCheckout}>
          <FaCheck className="me-2" /> Finalizar Compra
        </Button>
        <Button variant="outline-secondary" onClick={onClear}>
          <FaTrashAlt className="me-2" /> Vaciar Carrito
        </Button>
      </div>
    </Card>
  );
};