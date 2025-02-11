import axios from "axios";
import { enviromentKeys } from "../server/enviromentKeys";

export async function validateAddress(address: string) {
  const apiKey = enviromentKeys.CAGEKEY;

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (!response.data || !response.data.results) {
      return [];
    }
    return response.data.results[0];
  } catch (error) {
    console.error("Error validating address:", error);

    return false;
  }
}