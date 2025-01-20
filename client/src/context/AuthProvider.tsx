import LoadingFixed from "@/components/LoadingFixed";
import { currentApi } from "@/services/user.service";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
export interface IUser {
	avatar: string;
	createdAt: string;
	email: string;
	name: string;
	is_admin: boolean;
	_id: string;
	uuid: string | undefined;
}

interface AuthContextType {
	authUser?: IUser | undefined; // thông tin người dùng
	setAuthUser?: Dispatch<SetStateAction<IUser | undefined>>; // set thông tin người dùng
	isLoggedIn?: boolean; // trạng thái đăng nhập
	setIsLoggedIn?: Dispatch<SetStateAction<boolean>>; // set trạng thái đăng nhập
}

const AuthContext = createContext<AuthContextType>({});

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authUser, setAuthUser] = useState<IUser | undefined>(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
	useEffect(() => {
		(async () => {
			try {
				const { data } = await currentApi();
				setAuthUser(data);
				setIsLoggedIn(true);
				// if (data.data._id) {
				// 	const role = data.data.is_admin || data.data.is_staff;
				// 	const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
				// 		process.env.SERVER_SOCKET_URL!,
				// 		{
				// 			query: {
				// 				userId: data.data._id,
				// 				role: role ? "admin" : "user",
				// 			},
				// 		},
				// 	);
				// 	setSocket(socket);
				// 	console.log({ socket });
				// }
			} catch (error: unknown) {
				console.log("error", error);

				setAuthUser(undefined);
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		})();

		return () => {
			// if (socket) {
			// 	socket.emit("disconnect", authUser?._id);
			// }
		};
	}, []);

	if (isLoading) {
		return <LoadingFixed />;
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
export { AuthContext, AuthProvider };
