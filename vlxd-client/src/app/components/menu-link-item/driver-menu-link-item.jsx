import { NavLink } from "react-router-dom";
 
function DriverMenuLinkItem({
  linkTo,
  label,
  icon,
  className = "",
  labelClassName = "",
}) {
  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) => {
        let classNames = `w-[50%] h-14 px-5 flex items-center justify-center hover:bg-[#6f87ff] [&_.label]:hover:text-white [&_.fill]:hover:fill-white [&_.stroke]:hover:stroke-white ${className} `;

        if (isActive) {
          classNames +=
            "text-yellow-300 bg-[#6f87ff] [&_.fill]:fill-white [&_.stroke]:stroke-white";
        }

        return classNames;
      }}
    >
      <div className="mr-4">{icon}</div>
      <div className={`label tracking-[0.024px] ${labelClassName}`}>
        {label}
      </div>
    </NavLink>
  );
}

export default DriverMenuLinkItem;