import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions";
import style from "../Form/Form.module.css";
import validate from "./validation";

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
    dispatch(createDog(form));
    alert("Successfully created!");
    navigate("/home");

    setForm({
      name: "",
      height_min: 0,
      height_max: 0,
      weight_min: 0,
      weight_max: 0,
      life_span: 0,
      image: "",
      temperament: [],
    });
  };

  return (
    <div className={style.container}>
      <button className={style.btnBackHome}>
        <NavLink className={style.link} to="/home">Back home</NavLink>
      </button>

      <form onSubmit={handleSubmit} className={style.formContainer}>
        <label className={style.name}>
          Name 
          <input
            required
            type="text"
            value={form.name}
            name="name"
            onChange={(event) => handleChange(event)}
            className={style.inputName}
          />
        </label>

        <div className={style.heightContainer}>
          <label className={style.label}>
            Min height 
            <input
              min="0"
              type="number"
              value={form.height_min}
              name="height_min"
              onChange={handleChange}
              className={style.input}
            />
          </label>

          <label className={style.label}>
            Max height 
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
          <label className={style.label}>
            Min weight
            <input
              min="0"
              type="number"
              value={form.weight_min}
              name="weight_min"
              onChange={handleChange}
              className={style.input}
            />
          </label>

          <label className={style.label}>
            Max weight 
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
        <label className={style.lifeExpectations}>
          Life expectations
          <input
            min="0"
            type="number"
            value={form.life_span}
            name="life_span"
            onChange={handleChange}
            className={style.input}
          />
        </label>

        <label className={style.temperament}>
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

        <div>
          <label className={style.imgContainer}>
            Image
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
        <h6 className={style.error}>{errors.name && <p> {errors.name} </p>}</h6>
        <h6 className={style.error}>
          {errors.height_min && <p> {errors.height_min} </p>}
        </h6>
        <h6 className={style.error}>
          {errors.height_max && <p> {errors.height_max} </p>}
        </h6>
        <h6 className={style.error}>
          {errors.weight_min && <p> {errors.weight_min} </p>}
        </h6>
        <h6 className={style.error}>
          {errors.weight_max && <p> {errors.weight_max} </p>}
        </h6>
        <h6 className={style.error}>
          {errors.life_span && <p> {errors.life_span} </p>}
        </h6>
        <h6 className={style.error}>
          {errors.temperament && <p> {errors.temperament} </p>}
        </h6>
      </div>
    </div>
  );
}
