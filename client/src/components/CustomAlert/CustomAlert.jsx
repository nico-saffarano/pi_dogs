import React from "react";
import style from "./CustomAlert.module.css";

const CustomAlert = ({ dogData, message }) => {
  return (
   
    <div className={style.customAlert}>
      <div className={style.title}>
        <h1>{message}</h1>
      </div>
      <h4 className={style.subtitleData}>Here's your details</h4>
      <div className={style.alertContainer}>
        <p>Name : {dogData.name}</p>
        <p>
          Height : {dogData.height_min} - {dogData.height_max} cm{" "}
        </p>
        <p>
          Weight : {dogData.weight_min} - {dogData.weight_max} kg{" "}
        </p>
        <p>Life expectancy : {dogData.life_span}</p>
        <p>Temperament : {dogData.temperament}</p>
      </div>
      <div className={style.imgContainer}></div>
      <img src={dogData.image} alt="" />
      
    </div>
 
  );
};

export default CustomAlert;
