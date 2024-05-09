import DriverHeader from "../components/header/driver.header.component";
import DriverMenu from "../components/menu/driver.menu.component";

function DriverMainLayout({children}){
    return (
        // grid grid-rows-[auto,calc,auto]
        <div className="h-[100vh] flex flex-col">
            <DriverHeader/>
            <div className="bg-[#faf8f8]">
                {children}
            </div>
            <DriverMenu/>
        </div>
    )
}

export default DriverMainLayout;