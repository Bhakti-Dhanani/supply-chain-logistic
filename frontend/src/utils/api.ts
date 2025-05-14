const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  post: async (endpoint: string, body: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  },
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    return response.json();
  },
  put: async (endpoint: string, body: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    return response.json();
  },
  delete: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    return response.json();
  },
};
