import axios from "axios";

export default axios.create({
    baseURL:"https://restaurent-reviews-backend-dg4z.vercel.app/",
    headers: {
        "Content-type" : "application/json"
    }
});