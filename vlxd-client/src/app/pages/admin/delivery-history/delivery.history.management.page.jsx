import React, { useEffect, useState } from "react";
import DeliveryHistoryService from "../../../services/deliveryHistory.service";
import ProductService from "../../../services/product.service";
import AgencyService from "../../../services/agency.service";
import ExpenseService from "../../../services/expense.service";
import AddDeliveryHistoryPopup from "../../../components/modal/modal.create.delivery.history";
import { formatMoneyVN, formatDate } from "../../../utils/utils";
import { DEFAULT_DATE_FORMAT } from "../../../constants/common";

const DeliveryHistoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [agencies, setAgencies] = useState([]); 
  const [deliveryHistories, setDeliveryHistories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [sumMoneyExport, setSumMoneyExport] = useState(0);
  const [sumMoneyImport, setSumMoneyImport] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);
  const [profit, setProfit] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState({
    fromDate: "",
    toDate: "",
    username: "",
    agency_id: "",
    product_id: "",
  });

  useEffect(() => {
    async function fetchData() {
      try { 
        const response2 = await ProductService.getProducts();
        const response3 = await AgencyService.getAgencies(); 
        setProducts(response2);
        setAgencies(response3);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await DeliveryHistoryService.getDeliveryHistories(
          searchCriteria
        );
        const responseExpense = await ExpenseService.getExpenses(searchCriteria);

        const sum = response.reduce((pre, curr) => {
          // curr.is_import ? 0 : (pre + +curr.total_money)
          if (curr.is_import){
            return {
              ...pre,
              sumImport: pre.sumImport + +curr.total_money
            };;
          } else {
            return {
              ...pre,
              sumExport: pre.sumExport + +curr.total_money
            };
          }
        }, {
          sumImport: 0,
          sumExport: 0
        }); 

        const sumExpense = responseExpense.reduce((pre, curr)=> pre+curr.money, 0)
 
        setSumMoneyImport(sum.sumImport);
        setSumMoneyExport(sum.sumExport);
        setSumExpense(sumExpense);
        setProfit(sum.sumExport - sum.sumImport - sumExpense);
        setDeliveryHistories(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [reload, searchCriteria]);

  const handleCreate = async (values) => {
    try {
      console.log(values);
      await DeliveryHistoryService.createDeliveryHistories(values);
      alert("Nhập thành công");
      setReload((prev) => !prev);
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const t = window.confirm("Xác nhận xóa");
      if (!t) {
        return;
      }
      await DeliveryHistoryService.deleteDeliveryHistory(id);
      setReload((prev) => !prev);
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  const exportExcelHandle = async () => {
    try { 
      await DeliveryHistoryService.exportExcel(searchCriteria);  
    } catch (error) {
      const { data } = error.response;
      alert(data?.message);
    }
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-blue-400 p-2 text-center mr-5 rounded-lg text-white max-md:text-[12px]"
          onClick={() => setIsPopupOpen(true)}
        >
          Thêm
        </button>
        <button
          className="bg-blue-400 p-2 text-center mr-5 rounded-lg text-white max-md:text-[12px]"
          onClick={exportExcelHandle}
        >
          Xuất file
        </button>
      </div>
      <div className="flex flex-wrap px-4 gap-2 max-md:text-[12px] max-md:flex-col">
        <div className="flex gap-2 flex-1 items-center">
          <div className="flex-1">
            <label>From Date:</label>
            <br />
            <input
              className="w-full border-blue-400 border-2 p-2 rounded-lg max-md:p-1"
              type="date"
              value={searchCriteria.fromDate}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  fromDate: e.target.value,
                })
              }
            />
          </div>

          <div className="flex-1">
            <label>To Date:</label>
            <br />
            <input
              className="w-full border-blue-400 border-2 p-2 rounded-lg max-md:p-1"
              type="date"
              value={searchCriteria.toDate}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, toDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-2 flex-1 items-center">
          <div className="flex-1">
            <label>Username:</label>
            <br />
            <input
              className="w-full border-blue-400 border-2 p-2 rounded-lg max-md:p-1"
              type="text"
              value={searchCriteria.username}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  username: e.target.value,
                })
              }
            />
          </div>

          <div className="flex-1">
            <label>Agency:</label>
            <br />
            <select
              className="w-full border-blue-400 border-2 p-2 rounded-lg max-md:p-1"
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
        </div>

        <div className="flex gap-2 flex-1 items-center">
          <div className="flex-1">
            <label>Product:</label>
            <br />
            <select
              className="w-full border-blue-400 border-2 p-2 rounded-lg max-md:p-1"
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

          {/* <button
            className="bg-blue-400 px-4 rounded-lg text-white min-h-8 self-end"
            onClick={handleSearch}
          >
            Search
          </button> */}
        </div>
      </div>

      <div className="overflow-x-scroll max-md:text-[12px]">
        <div className="flex gap-2 w-full font-bold p-4 border-b border-gray-200">
          {/* <div className="flex-1">ID</div> */}
          <div className="flex-1">S.chuyến * S.lượng</div>
          <div className="flex-1">Tổng tiền</div>
          <div className="flex-1">Nguời giao</div>
          <div className="flex-1">Đại lý</div>
          <div className="flex-1">Mặt hàng</div>
          <div className="flex-1">Ngày</div>
          <div className="flex-1">Chức năng</div>
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
              {history.trip_number} Chuyến * {history.quantity}{" "}
              {history.product.unit}
            </div>
            <div className="flex-1">
              {formatMoneyVN(history.total_money)} VNĐ
            </div>
            <div className="flex-1">
              {history.account.username} -{" "} 
              {history.license_plates}
            </div>
            <div className="flex-1">{history.agency?.name || history.agency_import}</div>
            <div className="flex-1">
              {history.product.name}
              <span className="text-red-400">
                {history.is_postage ? "(chạy cước)" : ""}{" "}
              </span>
            </div>
            <div className="flex-1 text-ellipsis">
              {formatDate(history.createdAt, DEFAULT_DATE_FORMAT)}
            </div>
            <div className="flex-1 text-red-500 flex gap-2 flex-wrap">
              {/* <button onClick={() => setIsPopupOpen(history)}>Edit</button> */}
              <button onClick={() => handleDelete(history._id)}>Delete</button>
            </div>
          </div>
        ))}
        <div className="m-2">
          <h1 className="font-bold text-xl text-blue-600">
            Tổng tiền nhập: {formatMoneyVN(sumMoneyImport)} VNĐ
          </h1>
          <h1 className="font-bold text-xl text-blue-600">
            Tổng tiền chi phí: {formatMoneyVN(sumExpense)} VNĐ
          </h1>
          <h1 className="font-bold text-xl text-blue-600">
            Tổng tiền xuất: {formatMoneyVN(sumMoneyExport)} VNĐ
          </h1>
          <h1 className="font-bold text-xl text-blue-950">
            Tiền lãi: {formatMoneyVN(profit)} VNĐ
          </h1>
          <p className="text-red-500">
            Tính từ:{" "}
            {searchCriteria.fromDate || formatDate(new Date(), "YYYY-MM-D")}
          </p>
          <p className="text-red-500">
            Đến ngày:{" "}
            {searchCriteria.toDate || formatDate(new Date(), "YYYY-MM-D")}
          </p>
        </div>
      </div>
      <AddDeliveryHistoryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default DeliveryHistoryManagement;
