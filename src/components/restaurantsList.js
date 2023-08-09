import React, { useState, useEffect, useCallback } from "react";
import restaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const onChangeSearchZip = (e) => {
    setSearchZip(e.target.value);
  };

  const onChangeSearchCuisine = (e) => {
    setSearchCuisine(e.target.value);
  };

  const retrieveRestaurants = useCallback(() => {
    restaurantDataService.getAll(currentPage)
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
        setTotalPages(response.data.totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  const retrieveCuisines = () => {
    restaurantDataService.getCuisines()
      .then((response) => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };
  
  const find = (query, by) => {
    restaurantDataService.find(query, by)
    .then((response) => {
      console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, [retrieveRestaurants]);
  
  const renderPagination = () => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li className={`page-item ${currentPage === i ? "active" : ""}`} key={i}>
        <button className="page-link" onClick={() => handlePageChange(i)}>
          {i}
        </button>
      </li>
    );
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button className="btn btn-dark" type="button" onClick={findByName}>
              Search
            </button>
          </div>
        </div>
        <p></p>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button className="btn btn-dark" type="button" onClick={findByZip}>
              Search
            </button>
          </div>
        </div>
        <p></p>
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine) => {
              return (
                <option key={cuisine} value={cuisine}>
                  {" "}
                  {cuisine.substr(0, 20)}{" "}
                </option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button className="btn btn-dark" type="button" onClick={findByCuisine}>
              Search
            </button>
          </div>
        </div>
      </div>
      {renderPagination()}
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1" key={restaurant._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link to={"/restaurants/" + restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a
                      target="_blank" 
                      rel="noreferrer"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {renderPagination()}
    </div>
  );
};

export default RestaurantList;
