const BASE_URL = "https://testcasefe2023.ignorelist.com/api/v1/data";
const HEADERS = {
  "Content-Type": "application/json",
  nim: "21081010081",
};

const apiService = {
  fetchData: async () => {
    try {
      const response = await fetch(BASE_URL, {
        headers: HEADERS,
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  
  showData: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        headers: HEADERS,
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve data");
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("Error retrieving data:", error);
      throw error;
    }
  },

  createData: async (formData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create data");
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  deleteData: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: HEADERS,
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  },

  updateData: async (id, updatedData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { ...HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  },
};

export default apiService;
