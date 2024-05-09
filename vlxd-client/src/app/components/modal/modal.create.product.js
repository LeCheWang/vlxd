import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoMdClose } from "react-icons/io";

const AddProductPopup = ({ isOpen, onClose, onSubmit }) => {
  let initialValues = {
    name: "",
    price: "",
    unit: "",
  };

  if (!isOpen) return null;

  const taskUpdate = typeof isOpen === "object";
  if (taskUpdate) {
    initialValues = isOpen;
  }

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Vui lòng nhập tên sản phẩm";
    }
    if (!values.price) {
      errors.price = "Vui lòng nhập giá sản phẩm";
    }
    if (!values.unit) {
      errors.unit = "Vui lòng nhập đơn vị sản phẩm";
    }

    return errors;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[360px] bg-white p-8 rounded-lg relative">
        <h2 className="text-lg font-semibold mb-2">
          {taskUpdate ? "Sửa " : "Thêm "} Sản Phẩm
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit({ ...values, taskUpdate });
            onClose();
          }}
          validate={validateForm}
        >
          <Form>
            <div className="mb-2">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Tên sản phẩm:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên sản phẩm"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label htmlFor="price" className="block mb-1">
                  Giá:
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Nhập giá sản phẩm"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label htmlFor="unit" className="block mb-1">
                  Đơn vị:
                </label>
                <Field
                  type="text"
                  id="unit"
                  name="unit"
                  placeholder="Nhập đơn vị sản phẩm"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <ErrorMessage
                  name="unit"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {taskUpdate ? "Sửa" : "Thêm"}
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

export default AddProductPopup;
