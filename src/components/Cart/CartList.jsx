import { Table } from "react-bootstrap";
import { CartItem } from "./CartItem";

export const CartList = ({ cart, onRemove }) => {
  return (
    <Table striped bordered hover responsive className="bg-white shadow-sm">
      <thead className="table-dark">
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th className="text-center">Acción</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={onRemove} />
        ))}
      </tbody>
    </Table>
  );
};