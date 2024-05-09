import AdminMenu from "../menu/admin.menu.component";
import { Images } from "../../../assets/images";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between max-md:flex-col">
      <div className="flex items-center gap-10">
        <img className="w-[100px] max-md:w-[50px]" src={Images.Logo.default} alt="" />
        <h1 className="font-sans text-[42px] text-[#febd45] max-md:text-[26px]">
          CTY VLXD Thành Bảy
        </h1>
      </div>
      <div className="flex items-center justify-between w-full  max-md:bg-slate-200 max-md:p-2">
        <AdminMenu />
        <div className="flex items-center flex-wrap max-md:text-[14px]">
          <img className="w-[50px] max-md:hidden" src={Images.Logo.default} alt="" />
          <select
            className="max-md:text-[12px]"
            onChange={(e) => {
              if (e.target.value === "logout") {
                navigate("/auth/login");
              }
            }}
          >
            <option value="admin">ADMIN</option>
            <option value="logout">Logout</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
