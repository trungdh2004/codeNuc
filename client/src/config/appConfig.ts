export const getEnv = (key: string, defaultValue: string = "") => {
	const value = process.env[key];
	if (value === undefined) {
		return defaultValue;
	}
	return value;
};
const funcConfig = () => ({
	CLIENT_ID: getEnv("VITE_GOOGLE_CLIENT_ID"),
	GOOGLE_SECRET: getEnv("VITE_GOOGLE_SECRET"),
	SERVER_URL: getEnv("VITE_SERVER_URL"),
	PATH_BLOG: getEnv("VITE_PATH_BLOG", "https://dev.to/"),
});

export const appConfig = funcConfig();
