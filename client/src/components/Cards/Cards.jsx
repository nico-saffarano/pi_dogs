import { useSelector } from 'react-redux';
import Card from '../Card/Card'


const Cards = () => {
  const dogs = useSelector(state => state.dogs)
  return <div>
    {
      dogs.map(dog=>{
        return <Card
        key={dog.id}
        name={dog.name}
        temperament={dog.temperament}
        height_min={dog.height_min}
        height_max={dog.height_max}
        weight_min={dog.weight_min}
        weight_max={dog.weight_max}
        life_span={dog.life_span}
        image={dog.image}
      

        />
      })
    }
   
  </div>;
}

export default Cards;

