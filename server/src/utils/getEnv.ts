export const getEnv = (key: string, defaultValue: string = "") => {
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value;
};
