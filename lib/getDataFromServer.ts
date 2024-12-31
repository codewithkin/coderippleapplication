import { fetchConfig } from "./fetchConfig";

export const getDataFromServer = async (url: string) => {
    // Make the request to the baseUrl
    const response = await fetch(`${url}`, fetchConfig);

    // Get the response data
    const jsonData = await response.json();

    return jsonData;
}