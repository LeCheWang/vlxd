import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ProductService from "../../../services/product.service";
import AgencyService from "../../../services/agency.service";
import DeliveryHistoryService from "../../../services/deliveryHistory.service";
import StorageService from "../../../services/storage.service";

const Home = () => {
  const [agencies, setAgencies] = useState([]);
  const [products, setProducts] = useState([]);
  const current_account = StorageService.getObject("current_account");
  const initialValues = {
    trip_number: "",
    quantity: "",
    agency: "",
    product: "",
    license_plates: current_account.license_plates,
    is_postage: false,
  };

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

  const validateForm = (values) => {
    const errors = {};

    if (!values.trip_number) {
      errors.trip_number = "Hãy nhập số chuyến";
    } else if (values.trip_number <= 0) {
      errors.trip_number = "Số chuyến phải lớn hơn 0";
    }

    if (!values.quantity) {
      errors.quantity = "Hãy nhập số lượng";
    }

    if (!values.agency) {
      errors.agency = "Hãy chọn đại lý";
    }

    if (!values.product) {
      errors.product = "Hãy chọn sản phẩm";
    }

    if (!values.license_plates) {
      errors.license_plates = "Hãy nhập biển số";
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      await DeliveryHistoryService.createDeliveryHistories(values);
      alert("Thêm thành công");
    } catch (error) {
      const { data } = error.reponse;
      alert(data?.message);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="w-[95%] mx-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
          validate={validateForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-4">
                <label htmlFor="agency">Đại lý</label>
                <Field
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  as="select"
                  id="agency"
                  name="agency"
                >
                  <option value="">Chọn đại lý</option>
                  {agencies.map((agency) => (
                    <option key={agency._id} value={agency._id}>
                      {agency.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="agency"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="product">Chọn mặt hàng</label>
                <Field
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  as="select"
                  id="product"
                  name="product"
                >
                  <option value="">Chọn mặt hàng</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="product"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="trip_number">Số chuyến</label>
                <Field
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="number"
                  id="trip_number"
                  name="trip_number"
                  autoFocus
                />
                <ErrorMessage
                  name="trip_number"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="quantity">Số lượng</label>
                <Field
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="number"
                  id="quantity"
                  name="quantity"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="license_plates">Biển số</label>
                <Field
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="text"
                  id="license_plates"
                  name="license_plates"
                />
                <ErrorMessage
                  name="license_plates"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="is_postage"> 
                  <br />
                  <Field
                    className="border border-gray-300 rounded"
                    type="checkbox"
                    id="is_postage"
                    name="is_postage" 
                  />
                  <span className="ml-2 text-red-500">Chạy cước</span>
                </label>
              </div>
              <button
                className="mt-4 border bg-blue-500 rounded px-3 py-2 w-full"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Home;
