import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { IRootState } from "../../redux/auth/state";
export default function RequireAuth() {
    const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
    return isLoggedIn ? (
        <div>
            <Outlet />
        </div>
    ) : (
        <Navigate to={"/"} />
    );
}
