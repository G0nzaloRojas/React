import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export const CartItem = ({ item, onRemove }) => {
  const titulo = item.nombre || item.name;
  const precio = item.precio ?? item.price;
  const foto = item.imagen || item.image;
  const cantidad = item.quantity || item.cantidad || 1;

  return (
    <tr className="align-middle">
      <td>
        <div className="d-flex align-items-center gap-3">
          {foto && <img src={foto} alt={titulo} className="cart-item-img" />}
          <span className="fw-semibold">{titulo}</span>
        </div>
      </td>
      <td>${precio}</td>
      <td>{cantidad}</td>
      <td className="fw-bold">${precio * cantidad}</td>
      <td className="text-center">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onRemove(item.id)}
          title="Eliminar producto"
        >
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};