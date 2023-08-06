import axios from "axios";

export default axios.create({
    baseURL:"https://restaurent-reviews-backend.vercel.app/",
    headers: {
        "Content-type" : "application/json"
    }
});