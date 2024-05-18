import axios from "axios";

const authUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: authUrl,
});
