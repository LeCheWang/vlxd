import axios from "axios";
import { Environment } from "../../environments/environment";
import StorageService from "./storage.service";

const ExpenseService = {
  getExpenses: async (searchCriteria) => {
    const token = StorageService.get("token");

    const response = await axios.get(`${Environment.BASE_API}/expenses`, {
      params: searchCriteria,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  createExpense: async (expense) => {
    const token = StorageService.get("token");

    const response = await axios.post(
      `${Environment.BASE_API}/expenses`,
      expense,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  updateExpense: async (id, expense) => {
    const token = StorageService.get("token");

    const response = await axios.patch(
      `${Environment.BASE_API}/expenses/${id}`,
      expense,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  deleteExpense: async (id) => {
    const token = StorageService.get("token");

    const response = await axios.delete(
      `${Environment.BASE_API}/expenses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};

export default ExpenseService;
