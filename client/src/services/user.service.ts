import instance from "@/utils/instance";

export const loginApi = (token: string) =>
	instance.post("/auth/login", {
		code: token,
	});

export const currentApi = () => instance.get("/auth/current");
export const logoutApi = () => instance.get("/auth/logout");
export const requestApi = () => instance.get("/auth/request");
