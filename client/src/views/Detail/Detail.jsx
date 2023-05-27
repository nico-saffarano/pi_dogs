import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail, clearDetail } from "../../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import loader from "../../assets/loader/loader.gif";
import logo from "../../assets/svg/logo.svg";
import { MdArrowBackIosNew } from "react-icons/md";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dog = useSelector((state) => state.dogDetail);
  const dogDetails = dog[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getDogDetail(id));
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  const background = dogDetails?.image_id;

  return (
    <div>
      {isLoading ? (
        <div className={style.loaderContainer}>
          <img className={style.loader} src={loader} alt="Loading..." />
        </div>
      ) : (
        <div
          className={style.backgroundImage}
          style={{
            backgroundImage: `url(https://cdn2.thedogapi.com/images/${background}.jpg)`,
          }}
        >
          <div className={style.backgroundColor}>
            <div className={style.btnContainer}>
              <button className={style.btnBack}>
                <NavLink className={style.link} to="/home">
                  {<MdArrowBackIosNew />}Back Home
                </NavLink>
              </button>
            </div>

            {Object.keys(dogDetails || {}).length !== 0 ? (
              <div className={style.detailContainer}>
                <div className={style.title}>
                  <img className={style.logo} src={logo} alt="" />
                  <h1>Breed Details</h1>
                </div>
                <div className={style.boxContainer}>
                  <h5 className={style.name}>{dogDetails?.name}</h5>
                  <div className={style.textContainer}>
                    <h5>Id: {dogDetails?.id}</h5>
                    <h5>Life Expectancy: {dogDetails?.life_span}</h5>
                    <h5>
                      Weight: {dogDetails?.weight_min} -{" "}
                      {dogDetails?.weight_max} kg
                    </h5>
                    <h5>
                      Height: {dogDetails?.height_min} -{" "}
                      {dogDetails?.height_max} cm
                    </h5>
                    <h5>Bred for: {dogDetails?.bredFor}</h5>
                    <h5>Origin: {dogDetails?.origin || "Unknown"}</h5>

                    <h5>Temperament:{dogDetails?.temperament}</h5>
                  </div>
                  <div className={style.imgContainer}>
                    <img
                      src={dogDetails?.image}
                      alt={dogDetails?.name}
                      className={style.img}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h5>Loading Details...</h5>{" "}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

/* 
useDispatch para despachar acciones en la store de redux

useParams para obtener el parámetro de la URL (id) correspondiente al detalle del perro

useSelector para obtener el estado dogDetail desde el estado de redux.

useState para definir el estado inicial de isLoading como true, lo que indica que se está cargando el detalle del perro.

useEffect para cargar el detalle del perro al iniciar el componente o cuando el parámetro id cambie. 
Realiza las siguientes acciones:
setea isLoading como true para mostrar el loader
despacha la acción getDogDetail de redux pasando el id del perro para obtener los detalles
Simulando la carga de 1.5 seg y setea isLoading como false.
Limpia dogDetail despachando la accion que se ejecutará cuando el componente se desmonte

En el componente, se muestra un condicional. 
Si isLoading es true, se muestra una imagen de carga. 
Si isLoading es false, se muestra el detalle del perro.

Si dogDetails (el detalle del perro) no está vacío, se muestra el detalle del perro en un contenedor. 
Si dogDetails está vacío, se muestra un mensaje de carga de detalles.
*/
