import { fetchConfig } from "./fetchConfig";

export const getDataFromClient = async (url: string) => {
    // Define the environment 
    const environment = process.env.NODE_ENV;
    let baseUrl = "http://localhost:3000";

    if(environment === "production") {
        baseUrl = "https://app.coderipple.live";
    }

    // Make the request to the baseUrl
    const response = await fetch(`${baseUrl}${url}`, fetchConfig);

    const jsonData = await response.json();

    return jsonData;
}