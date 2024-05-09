import { Images } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import StorageService from "../../services/storage.service";
import { useEffect, useState } from "react";

const DriverHeader = () => {
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState();
  useEffect(()=> {
    setCurrentAccount(StorageService.getObject("current_account"));
  }, [])

  return (
    <div className="items-center justify-between">
      <div className="flex items-center justify-between m-3"> 
        <h1 className="text-yellow-400 font-bold text-xl">VLXD Thành Bảy</h1>
        <div className="flex items-center">
          <img className="w-[50px]" src={Images.Logo.default} alt="" />
          <select
            onChange={(e) => {
              if (e.target.value === "logout") {
                navigate("/auth/login");
              }
            }}
          >
            <option value="admin">{currentAccount?.username}</option>
            <option value="logout">Logout</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DriverHeader;
