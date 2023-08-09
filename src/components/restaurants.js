import React, {useState, useEffect} from "react";
import restaurantDataService from  "../services/restaurant";
import { Link, useParams} from "react-router-dom";

const Restaurant = ({user}) =>{
  const intitalRestaurantState ={
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };

  const [restaurant, setRestaurant] = useState(intitalRestaurantState);

  const { id } = useParams();

  const getRestaurant = id => {
    restaurantDataService
      .get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        console.log("ero")
      });
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  const deleteReview = (reviewId, index) =>{
    restaurantDataService.deleteReview(reviewId, user.id)
    .then(response =>{
      setRestaurant((prevState) =>{
        prevState.reviews.splice(index, 1);
        return({
          ...prevState
        });
      });
    })
    .catch(e =>{
      console.log(e);
    });
  }

  const styles = {
    //styles for white font
    color: "#FCFBFC",
  }

  return(
    <div>
    {restaurant ? (
      <div>
        <h5 style={styles}>{restaurant.name}</h5>
        <p style={styles}>
          <strong>Cuisine: </strong>
          {restaurant.cuisine}
          <br />
          <strong>Address: </strong>
          {restaurant.address.building} {restaurant.address.street},{" "}
          {restaurant.address.zipcode}
        </p>
        {user?(
        <Link to={`/restaurants/${id}/review`} className="btn btn-primary">
          Add Review
        </Link>
        ):(
          <Link to={`/login`} className="btn btn-primary">
          Login to Review
        </Link>
        )}
        <p></p>
        <h4 style={styles}>Reviews</h4>
        <div className="row">
          {restaurant.reviews.length > 0 ? (
            restaurant.reviews.map((review, index) => {
              return (
                <div className="col-lg-4 pb-1" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">
                        {review.text}
                        <br />
                        <strong>User: </strong>
                        {review.name}
                        <br />
                        <strong>Date: </strong>
                        {review.date}
                      </p>
                      { user.name && user.id === review.user_id && (
                        <div className="row">
                          <button
                            onClick={() => deleteReview(review._id, index)}
                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                          >
                            Delete
                          </button>
                          <Link
                            to={{
                              pathname: `/restaurants/${id}/review`,
                              state: {
                                currentReview: review
                              }
                            }}
                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                          >
                            Edit
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={styles} className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div style={styles}>
        <br />
        <p>No restaurant selected.</p>
      </div>
    )}
  </div>
  );
};




export default Restaurant;
