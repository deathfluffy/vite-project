import axios from "axios";


export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Server Error";
  }
  return "Unknown error occurred";
};

export default getErrorMessage;