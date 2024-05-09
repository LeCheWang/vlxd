import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoMdClose } from "react-icons/io";

const AddAccountPopup = ({ isOpen, onClose, onSubmit }) => {
  let initialValues = {
    username: "",
    password: "",
    full_name: "",
    gender: "Nam",
    phone: "",
    address: "",
    license_plates: "",
  };

  if (!isOpen) return null;

  const taskUpdate = typeof isOpen === "object";
  if (taskUpdate) {
    initialValues = isOpen;
  }

  const validateForm = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Vui lòng nhập tên đăng nhập";
    }
    if (!taskUpdate && !values.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    if (!values.full_name) {
      errors.full_name = "Vui lòng nhập họ tên";
    }
    if (!values.phone) {
      errors.phone = "Vui lòng nhập SĐT";
    }
    if (!values.address) {
      errors.address = "Vui lòng nhập địa chỉ";
    }
    if (!values.license_plates) {
      errors.license_plates = "Vui lòng nhập biển số xe";
    }

    return errors;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[360px] bg-white p-8 rounded-lg relative">
        <h2 className="text-lg font-semibold mb-2">
          {taskUpdate ? "Sửa " : "Thêm "} Tài Khoản
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
            onSubmit({ ...values, taskUpdate });
            onClose();
          }}
          validate={validateForm}
        >
          <Form>
            <div className="mb-2">
              <div className="flex gap-2">
                <div>
                  <label htmlFor="username" className="block mb-1">
                    Tên đăng nhập:
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nhập username"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-1">
                    Mật khẩu
                  </label>
                  <Field
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-2">
                  <label htmlFor="full_name" className="block mb-1">
                    Họ Tên:
                  </label>
                  <Field
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="Nhập họ tên"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage
                    name="full_name"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="gender" className="block mb-1">
                    Giới tính:
                  </label>
                  <Field
                    type="text"
                    id="gender"
                    name="gender"
                    placeholder="Nhập giới tính"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div>
                  <label htmlFor="phone" className="block mb-1">
                    SĐT
                  </label>
                  <Field
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Nhập SĐT"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage
                    name="phone"
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
              </div>

              <div>
                <label htmlFor="license_plates" className="block mb-1">
                  Biển số:
                </label>
                <Field
                  type="text"
                  id="license_plates"
                  name="license_plates"
                  placeholder="Nhập biển số"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <ErrorMessage
                  name="license_plates"
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

export default AddAccountPopup;
