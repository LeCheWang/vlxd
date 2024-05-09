import React, { useEffect, useState } from "react";
import DeliveryHistoryService from "../../../services/deliveryHistory.service";
import ProductService from "../../../services/product.service";
import AgencyService from "../../../services/agency.service";
import AddDeliveryHistoryPopup from "../../../components/modal/modal.create.delivery.history";
import { formatDate } from "../../../utils/utils";

const DeliveryHistoryDriver = () => {
  const [products, setProducts] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [deliveryHistories, setDeliveryHistories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    fromDate: "",
    toDate: "",
    agency_id: "",
    product_id: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await DeliveryHistoryService.getDeliveryHistories();
        const response2 = await ProductService.getProducts();
        const response3 = await AgencyService.getAgencies();

        setDeliveryHistories(response);
        setProducts(response2);
        setAgencies(response3);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [reload]);

  const handleCreateOrUpdate = async (values) => {
    try {
      if (values.taskUpdate) {
        console.log("updae");
        console.log(values);
        await DeliveryHistoryService.updateDeliveryHistory(values._id, values);
        alert("Sửa thành công");
        setReload((prev) => !prev);
      }
    } catch (error) {
      const { data } = error.response;
      alert(data?.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await DeliveryHistoryService.searchDeliveryHistories(
        searchCriteria
      );
      setDeliveryHistories(response);
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  return (
    <div className="mb-[56px]">
      {/* <div className="flex justify-end px-4">
        <button
          className="bg-blue-400 p-2 my-4 text-white rounded-lg"
          onClick={() => setIsPopupOpen(true)}
        >
          Thêm
        </button>
      </div> */}
      <div className="flex flex-wrap gap-2 px-4 items-center">
        <div className="flex-1 max-sm:mt-2">
          <label>From Date:</label>
          <br />
          <input
            className="border-blue-400 border-2 p-2 max-sm:p-1 rounded-lg"
            type="date"
            value={searchCriteria.fromDate}
            onChange={(e) =>
              setSearchCriteria({ ...searchCriteria, fromDate: e.target.value })
            }
          />
        </div>

        <div className="flex-1 max-sm:mt-2">
          <label>To Date:</label>
          <br />
          <input
            className="border-blue-400 border-2 p-2 max-sm:p-1 rounded-lg"
            type="date"
            value={searchCriteria.toDate}
            onChange={(e) =>
              setSearchCriteria({ ...searchCriteria, toDate: e.target.value })
            }
          />
        </div>

        <div className="flex-1 max-sm:mt-2">
          <label>Agency:</label>
          <br />
          <select
            className="border-blue-400 border-2 p-2 max-sm:p-1 rounded-lg"
            value={searchCriteria.agency_id}
            onChange={(e) =>
              setSearchCriteria({
                ...searchCriteria,
                agency_id: e.target.value,
              })
            }
          >
            <option value="">Chọn đại lý</option>
            {agencies.map((agency) => (
              <option key={agency._id} value={agency._id}>
                {agency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 max-sm:mt-2">
          <label>Product:</label>
          <br />
          <select
            className="border-blue-400 border-2 p-2 max-sm:p-1 rounded-lg"
            value={searchCriteria.product_id}
            onChange={(e) =>
              setSearchCriteria({
                ...searchCriteria,
                product_id: e.target.value,
              })
            }
          >
            <option value="">Chọn sản phẩm</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-400 px-4 max-h-8 leading-8 rounded-lg text-white max-sm:mt-2 self-end"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>

      <div>
        <div className="flex gap-2 font-bold p-4 border-b border-gray-200">
          {/* <div className="flex-1">ID</div> */}
          <div className="flex-1">Số chuyến * Số lượng</div>
          <div className="flex-1">Đại lý</div>
          <div className="flex-1">Biển số</div>
          <div className="flex-1">Mặt hàng</div>
          <div className="flex-1">Ngày</div>
        </div>
        {deliveryHistories.map((history) => (
          <div
            key={history._id}
            className={
              "flex gap-2 p-4 border-b border-gray-200 hover:bg-[#51b83c2c]" + 
              (history.is_import ? " bg-red-300" : "")
            }
          >
            {/* <div className="flex-1">{history._id}</div> */}
            <div className="flex-1">
              {history.trip_number} chuyến *{" "}
              {history.quantity + " " + history.product.unit}
            </div>
            <div className="flex-1">{history.agency?.name || history.agency_import}</div>
            <div className="flex-1">{history.license_plates}</div>
            <div className="flex-1">
              {history.product.name}{" "}
              <span className="text-red-400">
                {history.is_postage ? "(chạy cước)" : ""}{" "}
              </span>
            </div>
            <div className="flex-1">{formatDate(history.createdAt)}</div>
            {/* <div className="flex-1 text-red-500 flex gap-10">
              <button onClick={() => setIsPopupOpen(history)}>Edit</button>
              <button onClick={() => handleDelete(history._id)}>Delete</button>
            </div> */}
          </div>
        ))}
      </div>
      <AddDeliveryHistoryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleCreateOrUpdate}
      />
    </div>
  );
};

export default DeliveryHistoryDriver;
