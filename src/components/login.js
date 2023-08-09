import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    navigate("/restaurants"); // Use navigate function to navigate to "/restaurants" route
  };

  return (
<section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div className="form-outline form-white mb-4">
                  <label htmlFor="name" className="p-2 bd-highlight">Name</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={user.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                  </div>

                  <div className="form-outline form-white mb-4">
                  <label htmlFor="id">ID</label>
                  <input
                      type="text"
                      className="form-control"
                      id="id"
                      required
                      value={user.id}
                      onChange={handleInputChange}
                      name="id"
                  />
                  </div>

                  <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                  <button onClick={login} className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                </div>

                <div>
                  <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Login;