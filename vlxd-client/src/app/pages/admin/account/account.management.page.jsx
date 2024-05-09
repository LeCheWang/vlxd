import React, { useEffect, useState } from "react";
import AccountService from "../../../services/account.service";
import AddAccountPopup from "../../../components/modal/modal.create.account";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await AccountService.getAccounts();
        setAccounts(response);
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
      }
    }
    fetchData();
  }, [reload]);

  const handleSubmit = async (values) => {
    try {
      if (!values.taskUpdate){
        await AccountService.createAccount(values);
        alert("Thêm thành công");
        setReload((pre) => !pre);
      }else {
        //update 
        await AccountService.updateAccount(values._id, values)
        alert("Sửa thành công");
        setReload((pre) => !pre); 
      }
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  const deleteAccount = async (account_id) => {
    try {
        const t = window.confirm("Xác nhận xóa");
        if (!t){
            return;
        }

        await AccountService.deleteAccount(account_id)
        alert("Xóa thành công");
        setReload((pre) => !pre); 
    } catch (error) {
        const { data } = error.response;
        alert(data.message);
    }
  }

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
      <div className="overflow-y-scroll">
        <div className="flex gap-2 w-full font-bold p-4 border-b border-gray-200 max-md:text-[12px]">
          <div className="flex-1 max-md:hidden">ID</div>
          <div className="flex-1">USERNAME</div>
          <div className="flex-1">HỌ TÊN</div>
          <div className="flex-1">GIỚI TÍNH</div>
          <div className="flex-1">ĐỊA CHỈ</div>
          <div className="flex-1">SĐT</div>
          <div className="flex-1">BIỂN SỐ</div>
          <div className="flex-1">CHỨC NĂNG</div>
        </div>
        <div className="">
          {accounts.map((item, index) => {
            return (
              <div
                className="max-md:text-[12px] flex gap-2 border-b border-gray-200 text-sm p-4 hover:bg-[#51b83c2c]"
                key={index}
              >
                <div className="flex-1 max-md:hidden">{item._id}</div>
                <div className="flex-1">{item.username}</div>
                <div className="flex-1">{item.full_name}</div>
                <div className="flex-1">{item.gender}</div>
                <div className="flex-1">{item.address}</div>
                <div className="flex-1">{item.phone}</div>
                <div className="flex-1">{item.license_plates}</div>
                <div className="flex-1 flex gap-4 text-red-500 flex-wrap">
                  <button onClick={() => {setIsPopupOpen(item)}}>Sửa</button>
                  <button onClick={() => deleteAccount(item._id)}>Xóa</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddAccountPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AccountManagement;
