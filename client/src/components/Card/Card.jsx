const Card = ({name,temperament,height_min,height_max,weight_min,weight_max,life_span,image}) => {
  return <div>
    <p>Nombre:{name}</p>
    <p>Temperamento:{temperament}</p>
    <p>Altura:{height_min} - {height_max}</p>
    <p>Peso:{weight_min} - {weight_max}</p>
    <p>Expectativa de vida:{life_span}</p>
    <img src={image } alt={name} />
  </div>;
};

export default Card;
