// // api/payment.ts
// import { allPaysAPI } from "../config/axiosAllpays";

import allPaysAPI from "../config/axiosAllpays";
import type { PaymentData } from "../type/AllpaysType";
import { ALLPAYS } from "./endpoint";

export const fetchPaymentList = async () => {
  try {
    const response = await allPaysAPI.get(ALLPAYS.payment + "/list");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payment list:", error);
    return [];
  }
};

export const fetchPaymentgraph = async (): Promise<PaymentData[]> => {
  try {
    const response = await allPaysAPI.get(ALLPAYS.payment + "/list");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch payment list:", error);
    return [];
  }
};
