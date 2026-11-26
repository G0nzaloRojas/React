import "./Item.css";

export const Item = ({
  nombre,
  name,
  precio,
  price,
  descripcion,
  description,
  imagen,
  image,
  children,
}) => {
  const titulo = nombre || name;
  const valor = precio ?? price;
  const desc = descripcion || description;
  const foto = imagen || image;

  return (
    <article className="card">
      {foto && <img src={foto} alt={titulo} />}
      <h3>{titulo}</h3>
      {desc && <p>{desc}</p>}
      <p>${valor}</p>


      {children}
    </article>
  );
};
