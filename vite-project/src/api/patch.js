const BASE_URL = "http://localhost:5173";

export const patchRequest = async (endpoint, body) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
