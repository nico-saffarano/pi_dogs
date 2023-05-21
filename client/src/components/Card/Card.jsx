import { Link } from "react-router-dom";
import style from './Card.module.css'

const Card = ({id,name,temperament,height_min,height_max,weight_min,weight_max,life_span,image}) => {
  return <div>
    <Link to={`/dogs/${id}`}>
    <p>Name:{name}</p>
    </Link>
    <p>Height:{height_min}-{height_max}cm</p>
    <p>Weight:{weight_min}-{weight_max}kg</p>
    <p>Life expectations:{life_span}</p>
    <p>Temperament:{temperament}</p>
    <img className = {style.img}src={image } alt={name} />
  </div>;
};

export default Card;
