import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ page, setPage, max }) => {

  const handleClick = (newPagina) => {
    if (newPagina >= 1 && newPagina <= max) {
      setPage(newPagina);
    }
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    for (let i = 1; i <= max; i++) {
      const isActive = i === page;

      paginationItems.push(
        <li
          key={i}
          className={`${styles["pagination-item"]}${
            isActive ? ` ${styles["active"]}` : ""
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }

    return paginationItems;
  };

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles["pagination-item"]}${
          page === 1 ? ` ${styles["disabled"]}` : ""
        }`}
        onClick={() => handleClick(page - 1)}
      >
        Previous
      </li>
      {renderPaginationItems()}
      <li
        className={`${styles["pagination-item"]}${
          page === max ? ` ${styles["disabled"]}` : ""
        }`}
        onClick={() => handleClick(page + 1)}
      >
        Next
      </li>
    </ul>
  );
};

export default Pagination;

/* 
3 propiedades: 
-page (página actual), 
-setPage(función para actualizar la página)
-max(número máximo de páginas).

Cuando se hace clic en un número de página, se ejecuta handleClick pasándole el número de página como argumento.

6:handleClick verifica si el número de página está dentro del rango válido (entre 1 y max). 
Si es así, llamo a setPage con el nuevo número de página para actualizar la página actual.

12:Creo un array paginationItem para guardar los li
Genero una lista de elementos de paginación con un bucle for. 
Creo un li para cada número de página
Si el número de página = página actual, se le agrega una clase de estilo especial para resaltarlo.

Al final, se devuelve una lista (ul) que contiene los elementos de paginación, incluyendo los botones Previous y Next que permiten navegar. 
Previous y Next pueden se desactivan si la página actual es la primera o la última.

*/
