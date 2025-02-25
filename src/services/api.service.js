import { API_CONFIG } from "../config/api.config";

export const apiService = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_CONFIG.TOKEN}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};
