import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoMdClose } from "react-icons/io";

const AddAgencyPopup = ({ isOpen, onClose, onSubmit }) => {
  let initialValues = {
    name: "",
    address: "",
    phone: "",
  };

  if (!isOpen) return null;

  const taskUpdate = typeof isOpen === "object";
  if (taskUpdate) {
    initialValues = isOpen;
  }

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Vui lòng nhập tên đại lý";
    }
    if (!values.address) {
      errors.address = "Vui lòng nhập địa chỉ";
    }

    return errors;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[360px] bg-white p-8 rounded-lg relative">
        <h2 className="text-lg font-semibold mb-2">
          {taskUpdate ? "Sửa " : "Thêm "} Đại Lý
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
                  Tên đại lý:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên đại lý"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-1">
                  Địa chỉ:
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Nhập địa chỉ"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-1">
                  SĐT:
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Nhập SĐT"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
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

export default AddAgencyPopup;
