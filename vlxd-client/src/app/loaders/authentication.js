import { redirect } from "react-router-dom";
import HttpService from "../services/http.service";

export const isAuthenticated = async ({ request }) => {
  const token = HttpService.getAccessToken();

  if (request.url.includes("/login")) {
    if (token) {
      return redirect("/");
    }
  } else {
    if (!token) {
      return redirect("/auth/login");
    }
  }

  return null;
};
