import { useAuthContext } from "@/context/AuthProvider";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
type PrivateRouterType = {
	children: ReactNode;
};
const PrivateRouter = ({ children }: PrivateRouterType) => {
	//
	const { isLoggedIn } = useAuthContext();
	if (!isLoggedIn) {
		return <Navigate to={"/"} />;
	}
	return isLoggedIn && children;
};

export default PrivateRouter;
