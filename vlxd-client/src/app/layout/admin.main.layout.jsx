// import Footer from "../components/footer";
// import Header from "../components/header";

import Footer from "../components/footer";
import Header from "../components/header";



function AdminMainLayout({children}){
    return (
        <div>
            <Header/>
            <div className="min-h-[400px]">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default AdminMainLayout;