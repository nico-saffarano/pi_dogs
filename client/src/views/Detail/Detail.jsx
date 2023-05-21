import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDogDetail,clearDetail } from "../../redux/actions";
import { useEffect} from "react";
import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const {id} = useParams(); 
  const dog = useSelector((state) => state.dogDetail);
  const dogDetails = dog[0];

  useEffect(() => {
    dispatch(getDogDetail(id));
    return dispatch(clearDetail())
  }, [dispatch,id]);


  return (
    <div>
      <button>
        <Link to="/home">Back Home</Link>
      </button>
  
      {Object.keys(dog)? (
        <div>
          <div>
            <h1> Name : {dogDetails?.name}</h1>
            <h1>Id: {dogDetails?.id}</h1>
            <h2>Life expectations : {dogDetails?.life_span}</h2>
            <h2>
              {" "}
              Weight :{dogDetails?.weight_min} - {dogDetails?.weight_max} kg
            </h2>
            <h2> Height :{dogDetails?.height_min} - {dogDetails?.height_max} cm</h2>
            <div>
              <h2>Temperament :</h2>
              <h2>{dogDetails?.temperament}</h2>
              <img src={dogDetails?.image} alt= {dogDetails?.name}/>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading Details...</h1>{" "}
        </div>
      )}
    </div>
  );
};

export default Detail;
