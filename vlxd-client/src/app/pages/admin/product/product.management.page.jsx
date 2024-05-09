import React, { useEffect, useState } from "react";
import ProductService from "../../../services/product.service";
import AddProductPopup from "../../../components/modal/modal.create.product";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ProductService.getProducts();
        setProducts(response);
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
      }
    }
    fetchData();
  }, [reload]);

  const handleSubmit = async (values) => {
    try {
      if (!values.taskUpdate) {
        await ProductService.createProduct(values);
        alert("Thêm thành công");
      } else {
        await ProductService.updateProduct(values._id, values);
        alert("Sửa thành công");
      }
      setReload((pre) => !pre);
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  const deleteProduct = async (product_id) => {
    try {
      const t = window.confirm("Xác nhận xóa");
      if (!t) {
        return;
      }

      await ProductService.deleteProduct(product_id);
      alert("Xóa thành công");
      setReload((pre) => !pre);
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-blue-400 p-2 text-center mr-5 rounded-lg text-white max-md:text-[12px]"
          onClick={() => setIsPopupOpen(true)}
        >
          Thêm
        </button>
      </div>
      <div>
        <div className="flex gap-2 max-md:text-[12px] font-bold p-4 border-b border-gray-200">
          <div className="flex-1 max-md:hidden">ID</div>
          <div className="flex-1">Tên Sản Phẩm</div>
          <div className="flex-1">Giá</div>
          <div className="flex-1">Đơn vị</div>
          <div className="flex-1">Chức năng</div>
        </div>
        <div>
          {products.map((item, index) => {
            return (
              <div
                className="flex gap-2 max-md:text-[12px] border-b border-gray-200 text-sm p-4 hover:bg-[#51b83c2c]"
                key={index}
              >
                <div className="flex-1 max-md:hidden">{item._id}</div>
                <div className="flex-1">{item.name}</div>
                <div className="flex-1">{item.price}</div>
                <div className="flex-1">{item.unit}</div>
                <div className="flex-1 flex gap-2 flex-wrap text-red-500">
                  <button onClick={() => setIsPopupOpen(item)}>Sửa</button>
                  <button onClick={() => deleteProduct(item._id)}>Xóa</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddProductPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductManagement;
