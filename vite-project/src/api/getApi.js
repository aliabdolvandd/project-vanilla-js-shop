const BASE_URL = "http://localhost:5173";

export const getData = async (endpoint) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
