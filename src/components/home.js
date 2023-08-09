import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";
const Home = () => {
  return (
    <div>
    <div className="landing-page">
      <header className="bg-primary text-white text-center py-5">
        <h1>Welcome to Restaurant Reviews</h1>
        <p>Discover and share your favorite restaurants and reviews.</p>
        <Link to="/restaurants" className="btn btn-light btn-lg">
          Explore Restaurants
        </Link>
      </header>
      
      <section  className="container my-5 bg-light py-5">
        <h2 className="text-center mb-4">About Us</h2>
        <p>
          Restaurant Reviews is a platform dedicated to helping people find and
          review their favorite restaurants. Our mission is to connect food
          enthusiasts with the best dining experiences in town.
        </p>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <div className="row">
            <div className="col-md-6">
              <p>
                Have a question or feedback? Feel free to reach out to us using
                the contact information below.
              </p>
              <address>
                Email: info@restaurantreviews.com
                <br />
                Phone: (123) 456-7890
              </address>
            </div>
            <div className="col-md-6">
              <form>
                {/* Add a contact form here */}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2023 Restaurant Reviews. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default Home;
