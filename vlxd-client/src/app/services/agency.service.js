import axios from "axios";
import { Environment } from "../../environments/environment";
import StorageService from "./storage.service";

const AgencyService = {
  getAgencies: async () => {
    const token = StorageService.get("token");

    const response = await axios.get(`${Environment.BASE_API}/agencies`, {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
      },
    });
    return response.data;
  },
  createAgency: async (agency) => {
    const token = StorageService.get("token");

    const response = await axios.post(
      `${Environment.BASE_API}/agencies`,
      agency,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
  updateAgency: async (id, agency) => {
    const token = StorageService.get("token");

    const response = await axios.patch(
      `${Environment.BASE_API}/agencies/${id}`,
      agency,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
  deleteAgency: async (id) => {
    const token = StorageService.get("token");

    const response = await axios.delete(
      `${Environment.BASE_API}/agencies/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
};

export default AgencyService;
