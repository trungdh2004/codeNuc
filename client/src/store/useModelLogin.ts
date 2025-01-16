import { create } from "zustand";

interface IModelLoginState {
	open: boolean;
	setOpen: () => void;
	setClose: () => void;
}

const useModelLogin = create<IModelLoginState>((set) => ({
	open: false,
	setOpen: () => {
		set({ open: true });
	},
	setClose: () => {
		set({ open: false });
	},
}));

export default useModelLogin;
