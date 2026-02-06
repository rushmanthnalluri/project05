const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_PROXY_PATH = "/api/weather";

export const APIURL = (city) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
  if (!apiKey) {
    return null;
  }
  const safeCity = encodeURIComponent(city ?? "");

  const baseUrl = import.meta.env.DEV ? API_PROXY_PATH : API_BASE_URL;
  return `${baseUrl}?q=${safeCity}&appid=${apiKey}&units=metric`;
};

export const callApi = (method, url, data, callback, onError) => {
  const options = { method };
  const hasBody = data && method !== "GET" && method !== "HEAD";
  if (hasBody) {
    options.headers = { "Content-Type": "application/json" };
    options.body = typeof data === "string" ? data : JSON.stringify(data);
  }

  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((json) => {
      if (typeof callback === "function") {
        callback(json);
      }
    })
    .catch((err) => {
      console.error(err);
      if (typeof onError === "function") {
        onError(err);
      }
    });
};
