import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ExpenseService from "../../../services/expense.service";
import { formatDate, formatMoneyVN } from "../../../utils/utils";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [reload, setReload] = useState(false);
  const initialValues = {
    money: "",
  };

  useEffect(() => {
    async function fetchData() {
      const response = await ExpenseService.getExpenses();
      setExpenses(response);
    }
    fetchData();
  }, [reload]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await ExpenseService.createExpense(values);
      resetForm();
      alert("Báo chi phí thành công");
      setReload((pre) => !pre);
    } catch (error) {
      const { data } = error.response;
      alert(data?.message);
    }
  };

  const handleDeleteExpense = async (expense_id) => {
    try {
      await ExpenseService.deleteExpense(expense_id);
      alert("Xóa thành công");
      setReload((pre) => !pre);
    } catch (error) {
      const { data } = error.response;
      alert(data?.message || error.message);
    }
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.money) {
      errors.money = "Hãy nhập số tiền";
    } else if (values.money <= 0) {
      errors.money = "Số tiền phải lớn hơn 0";
    }

    return errors;
  };

  return (
    <div>
      <div className="w-[360px] mx-auto shadow-md p-8 rounded-lg">
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          <Form>
            <label htmlFor="money">Số tiền chi:</label>
            <br />
            <Field
              type="number"
              id="money"
              name="money"
              required
              className="border-blue-400 border-2 p-2 max-sm:p-1 rounded-lg"
            />
            <ErrorMessage
              name="money"
              component="div"
              className="text-red-500"
            />
            <br />
            <button type="submit" className="bg-blue-400 mt-2 p-2 rounded-lg">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      <table className="w-[360px] mx-auto text-left mt-4">
        <caption className="font-bold text-xl">Chi phí hôm nay của bạn</caption>
        <thead>
          <tr className="border-b border-red-100">
            <th className="p-2">Số tiền</th>
            <th className="p-2">Thời gian</th>
            <th className="p-2">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((value, index) => {
              return (
                <tr key={index} className="border-b border-red-100">
                  <td className="p-2">{formatMoneyVN(value.money)} VNĐ</td>
                  <td className="p-2">{formatDate(value.createdAt)}</td>
                  <td
                    onClick={() => handleDeleteExpense(value._id)}
                    className="p-2 text-red-500"
                  >
                    Xóa
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Expense;
