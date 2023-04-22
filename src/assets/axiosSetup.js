import axios from "axios";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "https://searchadsbe.onrender.com";
