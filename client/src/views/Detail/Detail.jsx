import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail, clearDetail } from "../../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import loader from "../../assets/loader/loader.gif"; // Reemplaza "../path/to/loader.png" con la ruta correcta de tu imagen de carga
import logo from "../../assets/svg/logo.svg";
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
    }, 2000);
    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  return (
    <div>
      {isLoading ? (
        <div className={style.loaderContainer}>
          <img className={style.loader} src={loader} alt="Loading..." />
        </div>
      ) : (
        <div>
          
          <div className={style.btnContainer}>

          <button className={style.btnBack}>
            <NavLink className={style.link} to="/home">Back Home</NavLink>
          </button>
          </div>

          {Object.keys(dogDetails || {}).length !== 0 ?(
            
            <div className={style.detailContainer}>
              <div className={style.title}>
              <img className={style.logo} src={logo} alt="" />
                <h1>Breed Details</h1>
              </div>
              <div className={style.boxContainer}>
              <div className={style.textContainer}>
                <h5>Name: {dogDetails?.name}</h5>
                <h5>Id: {dogDetails?.id}</h5>
                <h5>Life Expectancy: {dogDetails?.life_span}</h5>
                <h5>
                  Weight: {dogDetails?.weight_min} - {dogDetails?.weight_max} kg
                </h5>
                <h5>
                  Height: {dogDetails?.height_min} - {dogDetails?.height_max} cm
                </h5>
                <div>
                  <h5>Temperament:</h5>
                  <h5>{dogDetails?.temperament}</h5>
                </div>
              </div>
              <div className={style.imgContainer} >
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
      )}
    </div>
  );
};

export default Detail;
