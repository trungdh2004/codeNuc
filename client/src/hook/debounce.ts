import { useEffect, useState } from "react";

function useDebounceV2(value: string, delay: number = 500) {
	const [debounceValue, setDebounceValue] = useState("");

	useEffect(() => {
		const debounce = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => {
			clearTimeout(debounce);
		};
	}, [value, delay]);

	return debounceValue;
}

export default useDebounceV2;
