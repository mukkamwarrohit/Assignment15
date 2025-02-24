import { Link } from "react-router-dom";
import { Product } from "../types";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div>
      <img src={product.image} alt={product.title} width="100" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
