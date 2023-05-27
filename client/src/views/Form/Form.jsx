import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions";
import style from "../Form/Form.module.css";
import validate from "./validation";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import logo from "../../assets/svg/logo.svg";
import {RiImageAddFill} from 'react-icons/ri'
import { MdArrowBackIosNew } from "react-icons/md";


export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTemperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    height_min: 0,
    height_max: 0,
    weight_min: 0,
    weight_max: 0,
    life_span: 0,
    image: "",
    temperament: [],
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleTemperament = (event) => {
    if (!form.temperament.includes(event.target.value)) {
      setForm({
        ...form,
        temperament: [...form.temperament, event.target.value],
      });
    }
  };

  const handleDeleteTemperament = (event, temperament) => {
    setForm({
      ...form,
      temperament: form.temperament.filter((temp) => temp !== temperament),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setForm((prevForm) => ({
      ...prevForm,
      name: form.name,
      height_min: form.height_min,
      height_max: form.height_max,
      weight_min: form.weight_min,
      weight_max: form.weight_max,
      life_span: form.life_span,
      image: form.image,
      temperament: form.temperament,
    }));
  
    dispatch(createDog(form));
  
    setShowAlert(true);
  
    setTimeout(() => {
      setShowAlert(false);
      navigate("/home");
    }, 3000);
  };
  

  return (
    <div className={style.container}>
      <div className={style.barContainer}>
        <img className={style.logo} src={logo} alt="" />
        <h2 className={style.title}>Create a dog</h2>
        <button className={style.btnBackHome}>
          <NavLink className={style.link} to="/home">
           <MdArrowBackIosNew/> Back home
          </NavLink>
        </button>
      </div>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        <div className={style.dataContainer}>
          <h2 className={style.subtitleData}>Complete the details!</h2>
          <div className={style.nameContainer}>
            <label>
              Name :
              <input
                required
                type="text"
                value={form.name}
                name="name"
                onChange={(event) => handleChange(event)}
                className={style.inputName}
                placeholder="Be creative!"
              />
            </label>
          </div>

          <div className={style.heightContainer}>
            <h5>Height :</h5>
            <label className={style.label}>
              Min
              <input
                min="0"
                type="number"
                value={form.height_min}
                name="height_min"
                onChange={handleChange}
                className={style.input}
                placeholder="min"
              />
            </label>

            <label className={style.label}>
              Max
              <input
                min="0"
                type="number"
                value={form.height_max}
                name="height_max"
                onChange={handleChange}
                className={style.input}
              />
            </label>
          </div>

          <div className={style.weightContainer}>
            <h5 >Weight :</h5>
            <label className={style.label}>
              Min
              <input
                min="0"
                type="number"
                value={form.weight_min}
                name="weight_min"
                onChange={handleChange}
                className={style.input}
                placeholder="min"
              />
            </label>

            <label className={style.label}>
              Max
              <input
                min="0"
                type="number"
                value={form.weight_max}
                name="weight_max"
                onChange={handleChange}
                className={style.input}
              />
            </label>
          </div>

          <div className={style.lifeExpectations}>
            <label>
              Life expectancy :
              <input
                min="0"
                type="number"
                value={form.life_span}
                name="life_span"
                onChange={handleChange}
                className={style.input}
              />
            </label>
          </div>
          <label className={style.temperamentContainer}>
            Temperaments  
            <select
              className={style.selectTemp}
              onChange={handleTemperament}
              defaultValue="all"
            >
              <option className={style.tempOption} value="all" disabled>
                Choose
              </option>
              {allTemperaments.map((temp) => {
                return (
                  <option
                    className={style.tempOption}
                    value={temp.name}
                    key={temp.id}
                  >
                    {temp.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div className={style.imgContainer}>
          <h2 className={style.subtitleImg}>Choose a photo!</h2>
          <label>
  {!form.image && <RiImageAddFill className={style.imgIcon} />}
  <input
    type="text"
    value={form.image}
    name="image"
    onChange={handleChange}
    placeholder="Load your photo from url"
    className={style.inputImg}
  />
</label>
          {form.image && (
            <div>
              {form.image.startsWith("http") ? (
                <img className={style.imgForm} src={form.image} alt="Dog" />
              ) : (
                <p>{form.image}</p>
              )}
            </div>
          )}
        </div>

        <button className={style.btn} type="submit">
          Create!
        </button>
      </form>
      {showAlert && (
        <CustomAlert
          message={`Welcome ${form.name} to Dog Planet!!!`}
          dogData={form}
        />
      )}
      <div className={style.temperamentList}>
        {form.temperament.map((d, i) => {
          return (
            <div className={style.tempShownContainer} key={i++}>
              <div
                className={style.temperamentShown}
                onClick={(event) => handleDeleteTemperament(event, d)}
              >
                {" "}
                {d}{" "}
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.errorContainer}>
      <h6 className={style.errorName}>{errors.name && <p> {errors.name} </p>}</h6>
        <h6 className={style.errorHmin}>
          {errors.height_min && <p> {errors.height_min} </p>}
        </h6>
        <h6 className={style.errorHmax}>
          {errors.height_max && <p> {errors.height_max} </p>}
        </h6>
        <h6 className={style.errorWmin}>
          {errors.weight_min && <p> {errors.weight_min} </p>}
        </h6>
        <h6 className={style.errorWmax}>
          {errors.weight_max && <p> {errors.weight_max} </p>}
        </h6>
        <h6 className={style.errorLspan}>
          {errors.life_span && <p> {errors.life_span} </p>}
        </h6>
        <h6 className={style.errorTemp}>
          {errors.temperament && <p> {errors.temperament} </p>}
        </h6>
        
      </div>
    </div>
  );
}

/* Documentacion

useDispatch para despachar acciones en la store de redux
useNavigate para obtener la función navigate que permite la navegación

useSelector de Redux para obtener los temperamentos desde el estado de redux.

useState para definir el estado inicial del formulario, errors y form. 
El estado form contiene los campos del formulario
El estado errors se utiliza para almacenar los errores de validación.

handleChange para actualizar el estado form con los nuevos valores
Ademas, valida los campos utilizando la función validate importada del archivo validation

useEffect para cargar los temperamentos al montarse el componente, despachando la acción getTemperaments.

handleTemperament para agregar el temperamento seleccionado al estado form.

handleDeleteTemperament para actualizar el estado form eliminando el temperamento seleccionado.

handleSubmit que realiza las siguientes acciones:
Evita el comportamiento predeterminado del envío del formulario.
despacha la acción createDog de redux pasando el estado form como argumento para crear un nuevo perro.
Muestra una alerta indicando que se ha creado correctamente.
Navega al componente de inicio (/home).
Restablece el estado form a sus valores iniciales.

En el componente, se muestra el formulario con diferentes <input> y <select> para ingresar los datos del perro. 
Los campos están vinculados al estado form y actualiza el estado a traves del handleChange

Se muestra una lista de temperamentos seleccionados, donde se puede hacer clic en cada uno para eliminarlo.

Se muestra un contenedor para los mensajes de error. 
Los mensajes de error se muestran si hay errores de validación en los campos del formulario.
*/

