import axios from "axios";
import { Environment } from "../../environments/environment";
import StorageService from "./storage.service";

const DeliveryHistoryService = {
  createDeliveryHistories: async (delivery) => {
    const token = StorageService.get("token");

    const response = await axios.post(
      `${Environment.BASE_API}/delivery-histories`,
      delivery,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  getDeliveryHistories: async (searchCriteria) => {
    const token = StorageService.get("token");

    const response = await axios.get(
      `${Environment.BASE_API}/delivery-histories`,
      {
        params: searchCriteria,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  exportExcel: async (searchCriteria) => {
    const token = StorageService.get("token");

    const response = await axios.get(
      `${Environment.BASE_API}/delivery-histories/export`,
      {
        params: searchCriteria,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    // Xử lý tệp dữ liệu trả về từ API
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    const nowDate = new Date();

    const fileName = `exports_dai_ly_from_${searchCriteria.fromDate || ""}_to_${
      searchCriteria.toDate ||
      `${nowDate.getDate()}_${nowDate.getMonth() + 1}_${nowDate.getFullYear()}`
    }.xlsx`;

    link.setAttribute("download", fileName); // Thiết lập tên tệp
    document.body.appendChild(link);
    link.click();

    return true;
  },

  // searchDeliveryHistories: async (searchCriteria) => {
  //   const token = StorageService.get("token");

  //   const response = await axios.get(
  //     `${Environment.BASE_API}/delivery-histories`,
  //     {
  //       params: searchCriteria,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   return response.data;
  // },

  updateDeliveryHistory: async (id, newData) => {
    const token = StorageService.get("token");

    const response = await axios.patch(
      `${Environment.BASE_API}/delivery-histories/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  deleteDeliveryHistory: async (id) => {
    const token = StorageService.get("token");

    const response = await axios.delete(
      `${Environment.BASE_API}/delivery-histories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};

export default DeliveryHistoryService;
