const API_URL = 'https://auravision-api.onrender.com';

export const upscaleImage = async (imageBuffer, description) => {
  try {
    // We are now using the live Render URL instead of localhost
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