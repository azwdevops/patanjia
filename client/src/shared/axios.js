import axios from "axios";
import globals from "./globals";

const { liveProduction, testProduction, devHome, testHome, productionHome } =
  globals;

let URL;

if (testProduction) {
  URL = testHome;
} else if (liveProduction) {
  URL = productionHome;
} else {
  URL = devHome;
}

const API = axios.create({ baseURL: URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("session_cookie")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem(
      "session_cookie"
    )}`;
    req.headers.Accept = "application/json";
  }
  return req;
});

export default API;
