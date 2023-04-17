import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { ProductsDetails } from "../components/productDetails";

export const ProductID = () => {
    return (
        <div>
            <Navbar />
            <ProductsDetails />
            <Outlet />
        </div>
    );
};
