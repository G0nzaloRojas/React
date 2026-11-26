import { Item } from "../Item/Item";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";

export const ItemDetail = ({ product }) => {
  const { addItem } = useCart();
  return (
    <div className="detail-wrapper">
      <Item {...product}>
        <button
          className="btn bg-primary primary"
          onClick={() => addItem(product)}
        >
          Agregar al carrito
        </button>
      </Item>
    </div>
  );
};