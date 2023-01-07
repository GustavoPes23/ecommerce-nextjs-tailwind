import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx) {
  const { 'site1': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.API_URL
  })

  if (token) {
    api.defaults.headers['authorization'] = `Bearer ${token}`;
  }
  
  return api;
}

export const api = getAPIClient()