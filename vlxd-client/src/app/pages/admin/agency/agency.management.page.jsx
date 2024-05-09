import React, { useEffect, useState } from "react";
import AgencyService from "../../../services/agency.service";
import AddAgencyPopup from "../../../components/modal/modal.create.agency";

const AgencyManagement = () => {
  const [agencies, setAgencies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await AgencyService.getAgencies();
        setAgencies(response);
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
        await AgencyService.createAgency(values);
        alert("Thêm thành công");
      } else {
        await AgencyService.updateAgency(values._id, values);
        alert("Sửa thành công");
      }
      setReload((pre) => !pre);
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  const deleteAgency = async (agency_id) => {
    try {
      const t = window.confirm("Xác nhận xóa");
      if (!t) {
        return;
      }

      await AgencyService.deleteAgency(agency_id);
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
          <div className="flex-1">Tên Đại Lý</div>
          <div className="flex-1">Địa Chỉ</div>
          <div className="flex-1">SĐT</div>
          <div className="flex-1">Chức Năng</div>
        </div>
        <div>
          {agencies.map((item, index) => {
            return (
              <div
                className="flex gap-2 max-md:text-[12px] border-b border-gray-200 text-sm p-4 hover:bg-[#51b83c2c]"
                key={index}
              >
                <div className="flex-1 max-md:hidden">{item._id}</div>
                <div className="flex-1">{item.name}</div>
                <div className="flex-1">{item.address}</div>
                <div className="flex-1">{item.phone}</div>
                <div className="flex-1 flex gap-2 flex-wrap text-red-500">
                  <button onClick={() => setIsPopupOpen(item)}>Sửa</button>
                  <button onClick={() => deleteAgency(item._id)}>Xóa</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddAgencyPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AgencyManagement;
