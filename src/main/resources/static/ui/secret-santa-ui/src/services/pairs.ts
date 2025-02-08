import appAxios from "./appAxios";

const getReceiver = async () => {
  try {
    const response = await appAxios.get("/pairs/receiver", {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch receiver details:", error);
    throw error;
  }
};

export default { getReceiver };
