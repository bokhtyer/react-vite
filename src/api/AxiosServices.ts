// Custom type for the request properties
import axios, { AxiosResponse } from "axios"; // Axios for making HTTP requests and its response type
import { api_base_url, DEFAULT_LANGUAGE, social_api_base_url } from "../config/config"; // Config variables for API URLs and language
export type RequestProps = {
    serverUrl: string;
    requestHeader: {
        "Content-Type": string;
        "Accept-Language": string;
        Authorization: string;
    };
};
// Function to generate the request properties based on server type, multipart flag, and social flag
function getIRequestProp(severType: boolean, isMultipart?: boolean, isSocial = false): RequestProps {
    // Choose the server URL based on whether it's a social server or not
    const serverUrl = severType ? social_api_base_url : api_base_url;

    // Retrieve user data (which includes the idToken) from localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    // Extract idToken from userData, or set it to an empty string if not found
    const idToken = userData ? userData["token"] : "";

    // Determine content type based on whether it's a social request or a multipart form request
    let content_type;
    if (isSocial) {
        content_type = "application-management/x-www-form-urlencoded";
    } else {
        content_type = isMultipart ? "multipart/form-data" : "application/json";
    } // Default content type for JSON

    // Return the constructed server URL and request headers
    return {
        serverUrl: serverUrl,
        requestHeader: {
            "Content-Type": content_type, // Content type header
            "Accept-Language": DEFAULT_LANGUAGE, // Language preference for the request
            Authorization: idToken ? `Token ${idToken}` : "", // Authorization header with a Bearer token
        },
    };
}

// Function to make a GET request using Axios
async function get<T>(
    url: string,
    parameter?: Record<string, unknown>,
    isSocialServer?: boolean
): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false);

    // Make an Axios GET request and return the response
    return axios.get<T>(serverUrl + url, {
        params: parameter, // Query parameters to be passed in the request URL
        headers: requestHeader, // Request headers including authorization and content type
    });
}

// Function to make a POST request to a Google API using fetch
async function postGoogleAPI(url: string, body: string, isSocialServer?: boolean): Promise<Response> {
    // Get the server URL using the helper function (ignore request headers here)
    const { serverUrl } = getIRequestProp(isSocialServer || false, false, true);

    // Make a POST request using fetch and return the response
    return fetch(serverUrl + url, {
        method: "POST", // HTTP method
        headers: {
            Accept: "application/json", // Expect a JSON response
            "Content-Type": "application/x-www-form-urlencoded", // Form-encoded request body
        },
        body: body, // The request body (formatted as a string)
    });
}

// Function to make a POST request using Axios
async function post<T>(
    url?: string,
    body?: object,
    isSocialServer?: boolean,
    isMultipart?: boolean
): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false, isMultipart);

    // Make an Axios POST request and return the response
    return axios.post<T>(serverUrl + url, body, {
        headers: requestHeader, // Pass the appropriate request headers
    });
}

// Function to make a PUT request using Axios
async function put<T>(url?: string, body?: object, isSocialServer?: boolean): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false);

    // Make an Axios PUT request and return the response
    return axios.put<T>(serverUrl + url, body, {
        headers: requestHeader, // Pass the appropriate request headers
    });
}

// Function to make a PATCH request using Axios
async function patch<T>(url: string, body: object, isSocialServer?: boolean): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false);

    // Make an Axios PATCH request and return the response
    return axios.patch<T>(serverUrl + url, body, {
        headers: requestHeader, // Pass the appropriate request headers
    });
}

// Function to make a DELETE request using Axios
async function remove<T>(url: string, body?: object, isSocialServer?: boolean): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false);

    // Make an Axios DELETE request and return the response
    return axios.delete<T>(serverUrl + url, {
        data: body, // Include the request body in the DELETE request
        headers: requestHeader, // Pass the appropriate request headers
    });
}

// Exporting all the API service methods as part of AxiosServices object
const AxiosServices = {
    get, // Exporting GET method
    post, // Exporting POST method
    put, // Exporting PUT method
    patch, // Exporting PATCH method
    remove, // Exporting DELETE method
    postGoogleAPI, // Exporting custom Google API POST method
};

// Export AxiosServices as the default export of the module
export default AxiosServices;
