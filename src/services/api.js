const API_URL = 'https://auravision-api.onrender.com';

// This function controls the "Online/Offline" status dot
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return response.ok;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
};

// This function handles the actual AI Image Enhancement
export const upscaleImage = async (imageBuffer, description) => {
  try {
    const response = await fetch(`${API_URL}/api/upscale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBuffer,
        description: description
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Enhancement failed');
    }

    const data = await response.json();
    return data.output;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};