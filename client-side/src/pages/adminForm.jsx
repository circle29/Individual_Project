import { Navbar } from "../components/navbar";
import Protection from "../components/protection";
import { AdminFormContent } from "../components/adminFormContent";
import { useSelector } from "react-redux";

export const AdminForm = () => {
    const { merchant_status } = useSelector((state) => state.userSlice.value);
    return (
        <div>
            <Navbar />
            {merchant_status ? <AdminFormContent /> : <Protection />}
        </div>
    );
};
