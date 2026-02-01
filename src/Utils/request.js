import { getCookie } from "../Helpers/cookie";

const API_DOMAIN = "http://localhost:5000";

// Helper function to build headers
const buildHeaders = (includeAuth) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getCookie("token");
    //console.log("Retrieved token:", token); // Debug log
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Method get with optional Authorization header
export const get = async (url, includeAuth = false) => {
  const response = await fetch(`${API_DOMAIN}/${url}`, {
    headers: buildHeaders(includeAuth),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorMessage}`
    );
  }

  return response.json();
};

// Method post with optional Authorization header
export const post = async (url, data, includeAuth = false) => {
  const response = await fetch(`${API_DOMAIN}/${url}`, {
    method: "POST",
    headers: buildHeaders(includeAuth),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorMessage}`
    );
  }

  return response.json();
};

// Method put with optional Authorization header
export const put = async (url, data, includeAuth = false) => {
  const response = await fetch(`${API_DOMAIN}/${url}`, {
    method: "PUT",
    headers: buildHeaders(includeAuth),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorMessage}`
    );
  }

  return response.json();
};

// Method remove with optional Authorization header
export const remove = async (url, includeAuth = false) => {
  const response = await fetch(`${API_DOMAIN}/${url}`, {
    method: "DELETE",
    headers: buildHeaders(includeAuth),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorMessage}`
    );
  }

  return response.json();
};
