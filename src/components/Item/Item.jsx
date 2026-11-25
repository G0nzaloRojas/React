import "./Item.css";
export const Item = ({ nombre, precio, categoria, imagen, children }) => {
  return (
    <article className="card">
      <img src={imagen} />
      <h3>{nombre}</h3>
      <p>{categoria}</p>
      <p>${precio}</p>

      {/* Podemos usar children y reutilizar este componente */}  
      {children}
    </article>
  );
};
