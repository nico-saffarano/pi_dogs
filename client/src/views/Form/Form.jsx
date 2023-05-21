import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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


  console.log("form", form.temperament);


  

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
      image:'',
      temperament: [],
    }); 
  };


  return (
    <div>
      <button>
        Back home
        <Link to="/home"></Link>
      </button>

      <form onSubmit={handleSubmit}>
        <label>
          Name :
          <input
            required
            type="text"
            value={form.name}
            name="name"
            onChange={(event) => handleChange(event)}
          />
        </label>
        <h6>{errors.name && <p> {errors.name} </p>}</h6>

        <label>
          Min height :
          <input
            min="0"
            type="number"
            value={form.height_min}
            name="height_min"
            onChange={handleChange}
          />
        </label>
        <h6>{errors.height_min && <p> {errors.height_min} </p>}</h6>

        <label>
          Max height :
          <input
            min="0"
            type="number"
            value={form.height_max}
            name="height_max"
            onChange={handleChange}
          />
        </label>
        <h6>{errors.height_max && <p> {errors.height_max} </p>}</h6>

        <label>
          Min weight :
          <input
            min="0"
            type="number"
            value={form.weight_min}
            name="weight_min"
            onChange={handleChange}
          />
        </label>
        <h6>{errors.weight_min && <p> {errors.weight_min} </p>}</h6>

        <label>
          Max weight :
          <input
            min="0"
            type="number"
            value={form.weight_max}
            name="weight_max"
            onChange={handleChange}
          />
        </label>
        <h6>{errors.weight_max && <p> {errors.weight_max} </p>}</h6>

        <label>
          Life expectations:
          <input
            min="0"
            type="number"
            value={form.life_span}
            name="life_span"
            onChange={handleChange}
          />
        </label>
        <h6>{errors.life_span && <p> {errors.life_span} </p>}</h6>

        <label>
          Temperaments
          <select onChange={handleTemperament} defaultValue="all">
            <option value="all" disabled>
              Choose
            </option>
            {allTemperaments.map((temp) => {
              return (
                <option value={temp.name} key={temp.id}>
                  {temp.name}
                </option>
              );
            })}
          </select>
        </label>
        <h6>{errors.temperament && <p> {errors.temperament} </p>}</h6>
        <div>
          <label>
            Image:
            <input
              type="text"
              value={form.image}
              name="image"
              onChange={handleChange}
              placeholder="Load your photo from url"
            />
          </label>
          {form.image && (
            <div>
              {form.image.startsWith("http") ? (
                <img src={form.image} alt="Dog" />
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

      <div>
        {form.temperament.map((d, i) => {
          return (
            <div key={i++}>
              <div className={style.btnh3}> {d} </div>
              <button
                className={style.eraserbtn}
                onClick={(event) => handleDeleteTemperament(event, d)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
