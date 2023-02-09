import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");

export const apiBase = axios.create({
  baseURL: API_URL,
});

if ( token && token !== null ) {
  apiBase.defaults.headers["Authorization"] = `${token}`
};