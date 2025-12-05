import allPaysAPI from "../config/axiosAllpays";
import { ALLPAYS } from "./endpoint";

export const fetchCommonStatus = async () => {
  try {
    const response = await allPaysAPI.get(
      ALLPAYS.common + "/payment-status/all"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payment list:", error);
    return [];
  }
};

export const fetchCommonPaytype = async () => {
  try {
    const response = await allPaysAPI.get(ALLPAYS.common + "/paymemt-type/all");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payment list:", error);
    return [];
  }
};

export const fetchCommonMchtStatus = async () => {
  try {
    const response = await allPaysAPI.get(ALLPAYS.common + "/mcht-status/all");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payment list:", error);
    return [];
  }
};
