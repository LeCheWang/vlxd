import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto">
        <div className="max-md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-md:text-[12px]">
          <div>
            <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
            <p>Công ty ABC</p>
            <p>123 Đường ABC, Phường XYZ, Quận ABC</p>
            <p>Điện thoại: 0123 456 789</p>
            <p>Email: info@abc.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Chăm sóc khách hàng</h3>
            <ul>
              <li><a href="https://www.facebook.com/duongwebapp22" className="text-gray-300 hover:text-white">Hướng dẫn mua hàng</a></li>
              <li><a href="https://www.facebook.com/duongwebapp22" className="text-gray-300 hover:text-white">Chính sách đổi trả</a></li>
              <li><a href="https://www.facebook.com/duongwebapp22" className="text-gray-300 hover:text-white">Câu hỏi thường gặp</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
            <ul>
              <li><a href="https://www.facebook.com/duongwebapp22" className="text-gray-300 hover:text-white">Facebook</a></li>
              <li><a href="https://www.facebook.com/duongwebapp22" className="text-gray-300 hover:text-white">Twitter</a></li>
              <li><a href="https://www.facebook.com/duongwebapp22" className="text-gray-300 hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
