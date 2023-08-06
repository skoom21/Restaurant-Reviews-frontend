import axios from "axios";

export default axios.create({
    baseURL:"https://restaurent-reviews-backend-dg4z.vercel.app/api/v1/restaurants",
    headers: {
        "Content-type" : "application/json"
    }
});