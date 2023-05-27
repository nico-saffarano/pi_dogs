import { NavLink } from "react-router-dom";
import style from './Card.module.css'

const Card = ({id,name,height_min,height_max,weight_min,weight_max,life_span,image,origin}) => {
  return <div className={style.cardContainer}>
    <NavLink className={style.dataName} to={`/dogs/${id}`}>
    <p >{name}</p>
    </NavLink>
    <NavLink className={style.dataName} to={`/dogs/${id}`}>
    <img className = {style.img}src={image } alt={name} />
    </NavLink>
    <p className={style.data}>Height:{height_min}-{height_max}cm</p>
    <p className={style.data}>Weight:{weight_min}-{weight_max}kg</p>
    <p className={style.data}>Life expectations:{life_span}</p>
    <p className={style.data}>Origin: {origin? origin : 'Unknown'} </p>
  </div>;
};

export default Card;
