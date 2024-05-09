import React, { useEffect, useState } from "react";
import ExpenseService from "../../../services/expense.service";
import AccountService from "../../../services/account.service";
import { formatDate, formatMoneyVN } from "../../../utils/utils";

const ExpenseAdmin = () => {
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    fromDate: "",
    toDate: "",
    username: "",
  });

  useEffect(() => {
    async function fetchData() {
      const acc = await AccountService.getAccounts();
      setAccounts(acc);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await ExpenseService.getExpenses(searchCriteria);
      setExpenses(response);
    }
    fetchData();
  }, [searchCriteria, reload]);

  const handleDeleteExpense = async (expense_id) => {
    try {
      await ExpenseService.deleteExpense(expense_id);
      alert("Xóa thành công");
      setReload((pre) => !pre);
    } catch (error) {
      const {data} = error.response;
      alert(data.message || error.message);
    }
  };

  return (
    <div>
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
            <select
              className="w-full border-blue-400 border-2 p-2 rounded-lg max-md:p-1"
              value={searchCriteria.username}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  username: e.target.value,
                })
              }
            >
              <option value="">Chọn tài khoản</option>
              {accounts.map((account) => (
                <option key={account._id} value={account.username}>
                  {account.username} - {account.license_plates}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <div className="flex gap-2 flex-1 items-center">
          <button
            className="bg-blue-400 px-4 rounded-lg text-white min-h-8 self-end"
            onClick={handleSearch}
          >
            Search
          </button>
        </div> */}
      </div>
      <table className="w-[360px] mx-auto text-left mt-4">
        <thead>
          <tr className="border-b border-red-100">
            <th className="p-2">Tài khoản</th>
            <th className="p-2">Số tiền</th>
            <th className="p-2">Thời gian</th>
            <th className="p-2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((value, index) => {
              return (
                <tr key={index} className="border-b border-red-100">
                  <td className="p-2">{value.account.username}</td>
                  <td className="p-2">{formatMoneyVN(value.money)} VNĐ</td>
                  <td className="p-2">{formatDate(value.createdAt)}</td>
                  <td
                    className="p-2 text-red-500 cursor-pointer"
                    onClick={() => handleDeleteExpense(value._id)}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseAdmin;
