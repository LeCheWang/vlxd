import { NavLink } from "react-router-dom";
 
function MenuLinkItem({
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
        let classNames = `max-md:h-7 max-md:px-2 h-14 px-5 flex items-center rounded-xl hover:bg-[#6f87ff] [&_.label]:hover:text-white [&_.fill]:hover:fill-white [&_.stroke]:hover:stroke-white ${className} `;

        if (isActive) {
          classNames +=
            "text-yellow-300 bg-[#6f87ff] [&_.fill]:fill-white [&_.stroke]:stroke-white";
        }

        return classNames;
      }}
    >
      <div className="mr-4 max-md:hidden">{icon}</div>
      <div className={`max-md:text-[14px] label tracking-[0.024px] ${labelClassName}`}>
        {label}
      </div>
    </NavLink>
  );
}

export default MenuLinkItem;