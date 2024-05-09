import axios from "axios";
import { Environment } from "../../environments/environment";
import StorageService from "./storage.service";

const ProductService = {
  getProducts: async () => {
    const token = StorageService.get("token");

    const response = await axios.get(`${Environment.BASE_API}/products`, {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
      },
    });
    return response.data;
  },
  createProduct: async (product) => {
    const token = StorageService.get("token");

    const response = await axios.post(
      `${Environment.BASE_API}/products`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
  updateProduct: async (id, product) => {
    const token = StorageService.get("token");

    const response = await axios.patch(
      `${Environment.BASE_API}/products/${id}`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
  deleteProduct: async (id) => {
    const token = StorageService.get("token");

    const response = await axios.delete(
      `${Environment.BASE_API}/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token xác thực vào header Authorization
        },
      }
    );
    return response.data;
  },
};

export default ProductService;
