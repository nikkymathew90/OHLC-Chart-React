import axios from "axios";

const instance = axios.create({
  baseURL: "https://kaboom.rksv.net/api/"
});

export default instance;
