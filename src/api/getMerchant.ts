import allPaysAPI from "../config/axiosAllpays";
import { ALLPAYS } from "./endpoint";

export const fetchMerchantList = async () => {
  try {
    const response = await allPaysAPI.get(ALLPAYS.merchants + "/list");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payment list:", error);
    return [];
  }
};

export const fetchMerchantDetail = async (mchtCode: string) => {
  try {
    const response = await allPaysAPI.get(
      ALLPAYS.merchants + `/details/${mchtCode}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payment list:", error);
    return [];
  }
};
