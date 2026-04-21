export const upscaleImage = async (imageBuffer, description) => {
  try {
    const response = await fetch('http://localhost:3005/api/upscale', {
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