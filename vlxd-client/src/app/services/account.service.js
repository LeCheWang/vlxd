import axios from "axios";
import { Environment } from "../../environments/environment";
import StorageService from "./storage.service";

const AccountService = {
  getAccounts: async () => {
    const token = StorageService.get("token");

    const response = await axios.get(`${Environment.BASE_API}/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
      },
    });
    return response.data;
  },
  createAccount: async (account) => {
    const token = StorageService.get("token");

    const response = await axios.post(
      `${Environment.BASE_API}/accounts`,
      account,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
  updateAccount: async (id, account) => {
    const token = StorageService.get("token");

    const response = await axios.patch(
      `${Environment.BASE_API}/accounts/${id}`,
      account,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
  deleteAccount: async (id) => {
    const token = StorageService.get("token");

    const response = await axios.delete(
      `${Environment.BASE_API}/accounts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
};

export default AccountService;
