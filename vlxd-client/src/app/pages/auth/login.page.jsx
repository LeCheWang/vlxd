import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Images} from '../../../assets/images'
import AuthService from '../../services/auth.service';
import StorageService from '../../services/storage.service';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: '',
  }; 

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await AuthService.login(values.username, values.password)

      StorageService.set("token", response.jwt);
      StorageService.setObject("current_account", response);

      if (response.role === 'admin'){
        navigate("/admin/delivery-history");
      } else {
        navigate("/");
      }
    } catch (error) {
      const {data} = error.response;
      alert(data.message);
    }
    setSubmitting(false);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Vui lòng nhập tên đăng nhập';
    }
    if (!values.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    }

    return errors;
  };

  return (
    <div className="shadow-lg p-8 max-w-md mx-auto mt-8">
      <div className='flex justify-center'>
        <img className='w-[100px]' src={Images.Logo.default} alt="" />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1">Tên đăng nhập:</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Nhập tên đăng nhập"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Mật khẩu:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
