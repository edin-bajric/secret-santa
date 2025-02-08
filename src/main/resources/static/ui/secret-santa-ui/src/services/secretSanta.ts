import appAxios from "./appAxios";

const generatePairs = async (): Promise<void> => {
  try {
    await appAxios.post("/secret-santa/generate", null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  } catch (error) {
    console.error("Failed to generate pairs:", error);
    throw error;
  }
};

const getAllPairs = async (): Promise<
  { giver: string; receiver: string }[]
> => {
  try {
    const response = await appAxios.get("/secret-santa/pairs", {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pairs:", error);
    throw error;
  }
};

const getEmployeesWithoutPairs = async (): Promise<
  { id: number; name: string; surname: string }[]
> => {
  try {
    const response = await appAxios.get(
      "/secret-santa/employees-without-pairs",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch employees without pairs:", error);
    throw error;
  }
};

export default { generatePairs, getAllPairs, getEmployeesWithoutPairs };
