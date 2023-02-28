import axios from "axios";

export const API = axios.create({
  baseURL: "https://holyways-server-production-2cb1.up.railway.app/api/v1/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};