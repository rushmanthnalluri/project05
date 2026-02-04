const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export function APIURL(city) {
  const params = new URLSearchParams({
    q: city.trim(),
    appid: API_KEY || '',
    units: 'metric',
  });
  return `${API_BASE}?${params.toString()}`;
}

export async function callApi(method, url, payload, callback) {
  try {
    const options = { method };
    if (method !== 'GET' && payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        (data && data.message) || `Request failed (${response.status}).`;
      callback({ error: message });
      return;
    }

    callback(data);
  } catch (err) {
    console.error(err);
    callback({ error: 'Network error. Please try again.' });
  }
}
