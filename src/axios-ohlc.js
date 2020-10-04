import axios from "axios";

const instance = axios.create({
  baseURL: "http://kaboom.rksv.net/api/"
});

export default instance;
