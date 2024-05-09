import axios from "axios";
import { Environment } from "../../environments/environment";

const AuthService = {
  login: async (username, password) => {
    const response = await axios.post(`${Environment.BASE_API}/auth/login`, {
      username,
      password,
    }); 
    
    return response.data;
  },
};

export default AuthService;
