import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoMdClose } from "react-icons/io";
import ProductService from "../../services/product.service";
import AccountService from "../../services/account.service";

const AddDeliveryHistoryPopup = ({ isOpen, onClose, onSubmit }) => {
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const initialValues = {
    trip_number: "",
    quantity: "",
    agency_import: "",
    account: "",
    license_plates: "",
    product: "",
    product_import_price: "",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await AccountService.getAccounts();
        const response2 = await ProductService.getProducts();

        setAccounts(response);
        setProducts(response2);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!isOpen) return null;

  const validateForm = (values) => {
    const errors = {};

    if (!values.trip_number) {
      errors.trip_number = "Vui lòng nhập số chuyến";
    }

    if (!values.quantity) {
      errors.quantity = "Vui lòng nhập số lượng";
    }

    if (!values.account) {
      errors.account = "Vui lòng chọn tài xế";
    }

    if (!values.agency_import) {
      errors.agency_import = "Vui lòng điền đại lý nhập";
    }

    if (!values.product) {
      errors.product = "Vui lòng chọn sản phẩm";
    }

    if (!values.product_import_price) {
      errors.product_import_price = "Vui lòng điền giá nhập sản phẩm";
    }

    return errors;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[360px] bg-white p-8 rounded-lg relative">
        <h2 className="text-lg font-semibold mb-2">Nhập Hàng</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
          validate={validateForm}
        >
          <Form>
            <div className="mb-2">
              <div className="flex gap-1">
                {/* số chuyến */}
                <div>
                  <label htmlFor="trip_number" className="block mb-1">
                    Số chuyến:
                  </label>
                  <Field
                    type="number"
                    id="trip_number"
                    name="trip_number"
                    placeholder="Nhập số chuyến"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage
                    name="trip_number"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                {/* số lượng  */}
                <div>
                  <label htmlFor="quantity" className="block mb-1">
                    Số lượng:
                  </label>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Nhập số lượng sản phẩm"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              {/* đại lý  */}
              <div>
                <label htmlFor="agency_import" className="block mb-1">
                  Đại lý:
                </label>
                <Field
                  type="text"
                  id="agency_import"
                  name="agency_import"
                  placeholder="Nhập đại lý"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <ErrorMessage
                  name="agency_import"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="flex gap-1">
                {/* lái xe - chọn tài khoản  */}
                <div>
                  <label htmlFor="account" className="block mb-1">
                    Lái xe:
                  </label>
                  <Field
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    as="select"
                    id="account"
                    name="account"
                  >
                    <option value="">Chọn tài khoản</option>
                    {accounts.map((account) => (
                      <option key={account._id} value={account._id}>
                        {account.username + " - " + account.license_plates}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="account"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                {/* biển số */}
                <div>
                  <label htmlFor="license_plates" className="block mb-1">
                    Biển số (Nếu cần):
                  </label>
                  <Field
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    type="text"
                    placeholder="Nhập biển số"
                    id="license_plates"
                    name="license_plates"
                  ></Field>
                </div>
              </div>

              <div className="flex gap-1">
                {/* sản phẩm  */}
                <div>
                  <label htmlFor="product" className="block mb-1">
                    Sản phẩm:
                  </label>
                  <Field
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    as="select"
                    id="product"
                    name="product"
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="product"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                {/* product_import_price */}
                <div>
                  <label htmlFor="product_import_price" className="block mb-1">
                    Giá nhập:
                  </label>
                  <Field
                    type="number"
                    id="product_import_price"
                    name="product_import_price"
                    placeholder="Giá nhập"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage
                    name="product_import_price"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Nhập hàng
            </button>
          </Form>
        </Formik>
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default AddDeliveryHistoryPopup;
