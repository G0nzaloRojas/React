import { Link } from "react-router-dom";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/CartContext"; // Ajustá si tu hook se llama useCart
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import "./Cart.css";

export const CartView = () => {
  const { cart, clearCart, removeItem, total } = useCartContext();

  const handleCheckout = () => {
    toast.success("¡Compra realizada con éxito! Muchas gracias.");
    clearCart();
  };

  if (!cart || cart.length === 0) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="info" className="py-4 shadow-sm">
          <h4>Tu carrito está vacío</h4>
          <p className="mb-3">Agregá productos desde el catálogo para comenzar tu pedido.</p>
          <Button as={Link} to="/" variant="primary">
            <FaArrowLeft className="me-2" /> Volver a la tienda
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Carrito de Compras</h2>
      <Row>
        <Col lg={8} className="mb-4">
          <CartList cart={cart} onRemove={removeItem} />
        </Col>
        <Col lg={4}>
          <CartSummary
            total={total}
            onClear={clearCart}
            onCheckout={handleCheckout}
          />
        </Col>
      </Row>
    </Container>
  );
};