import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams, useLocation } from "react-router-dom";

const AddReview = (props) => {

  console.log("props.user:", props.user);
  const { id } = useParams();
  const location = useLocation();
  const currentReview = location.state?.currentReview;
  
  const [review, setReview] = useState(currentReview ? currentReview.text : "");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    const data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id
    };

    if(props.user.id != null)
    {

      if (currentReview) {
        data.review_id = currentReview._id;
        RestaurantDataService.updateReview(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        RestaurantDataService.createReview(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
    else
    {
      alert("Please login to leave a review");
    }
  };

  const style = {
    color: "#FCFBFC",
  }

  return (
    <div  styles={style}>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={`/restaurants/${id}`} className="btn btn-primary">
              Back to Restaurant
            </Link>
          </div>
        ) : (
          <div>
            <div styles={style} >
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
                placeholder={currentReview ? "Edit your review here.." : "Create your review here.."}
              />
            </div>
            <button onClick={saveReview} className="btn btn-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReview;