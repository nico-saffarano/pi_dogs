import style from "./About.module.css";
import { NavLink } from "react-router-dom";
import dogA from "../../assets/images/dogs/1.png";
import dogB from "../../assets/images/dogs/2.png";
import dogC from "../../assets/images/dogs/3.png";
import dogD from "../../assets/images/dogs/4.png";

const About = () => {
  return (
    <div className={style.aboutContainer}>
       <button className={style.btnBack}>
        <NavLink className={style.link} to="/">Back</NavLink>
      </button>
      <h1 className={style.mainTitle}>¡Welcome to Dog Planet!</h1>
      <p className={style.textA}>
        Here you can easily explore the wonderful world of canines and funny.
        Our platform uses the powerful API TheDogApi to provide you with a
        complete and personalized experience. Search dogs, discover information
        Detailed information about each breed and filters according to weight,
        origin and temperament. 
        </p>
        <p className={style.textB}>

        Besides, you will be able to sort them
        alphabetically by name for an experience of more organized search But
        that is not all! You can also create your own custom dogs and add them
        to our database. Explore, learn and have fun with the most adorable
        canines in the world! in our web application!
        </p>
      
      
      <div className={style.imgContainer}>
        <img className={style.dogB} src={dogB} alt="dog b" />
        <img className={style.dogA} src={dogA} alt="dog a" />
        <img className={style.dogC} src={dogC} alt="dog c" />
        <img className={style.dogD} src={dogD} alt="dog d" />
      </div>
    </div>
  );
};

export default About;
