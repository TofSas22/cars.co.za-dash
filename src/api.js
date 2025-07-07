const BASE_URL = "https://cars-co-za-sentiment-analysis-dashboard.onrender.com";

const analyzeVideo = async (videoUrl) => {
  try {
    console.log("Making request to:", `${BASE_URL}/analyze/video`);
    console.log("Request payload:", { video_url: videoUrl });
    
    const res = await fetch(`${BASE_URL}/analyze/video`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ video_url: videoUrl }),
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error response:", errorText);
      
      let errorMessage = "API Error";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorJson.message || "API Error";
      } catch {
        errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await res.json();
    console.log("Success response:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error("Network error - please check your internet connection or try again later");
    }
    throw error;
  }
};

const getHealth = async () => {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

const testCors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cors-test`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error testing CORS:', error);
    throw error;
  }
};

const getVideoMetadata = async (videoUrl) => {
  try {
    const response = await fetch(`${BASE_URL}/youtube/metadata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: videoUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error;
  }
};

const getVideoComments = async (videoUrl) => {
  try {
    const response = await fetch(`${BASE_URL}/youtube/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: videoUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export { analyzeVideo, getHealth, testCors, getVideoMetadata, getVideoComments };
