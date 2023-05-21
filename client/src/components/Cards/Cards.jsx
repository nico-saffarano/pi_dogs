import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";

const Cards = () => {
  const dogs = useSelector((state) => state.dogs);

  
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);


 
  const max = dogs.length / perPage

  return (
    <div>
      {dogs.slice((page-1)*perPage,(page-1)*perPage+perPage)
      .map((dog) => {
        return (
          <Card
            id={dog.id}
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
        );
      })}

      <Pagination page={page} setPage={setPage} max={max}/>
    </div>
  );
};

export default Cards;

/* 

10: page -> página actual que se muestra
11: perPage -> cantidad de tarjetas de perros que se muestran por página.

15 :calculo el número máximo de páginas
divido la cantidad de la lista de perros por la cantidad de tarjetas de perros por página

19:slice -> para obtener un subconjunto de perros que se mostrarán en la página actual. 
Se calcula el índice inicial y el índice final mediante (page-1)*perPage y (page-1)*perPage+perPage respectivamente. 
Esto asegura que solo se muestren las tarjetas de perros correspondientes a la página actual.
Ej:(page-1)*perPage y (page-1)*perPage+perPage
    (1-1)   *  10   y  (1-1)  *  10   + 10
      0     *  10   y    0    *  10   + 10
          0         y       0         + 10 = 0 y 10 -> los primeros 10 elementos

20:map -> mapeo la lista de perros filtrada para renderizar las tarjetas de perros

37:agrego el componente Pagination navegar entre las páginas.


*/