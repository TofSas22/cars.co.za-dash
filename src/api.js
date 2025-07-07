const BASE_URL = "https://cars-co-za-sentiment-analysis-dashboard.onrender.com/"

export const analyzeVideo = async (videoUrl) => {
    const res = await fetch(`${BASE_URL}/analyze/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_url: videoUrl }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "API Error");
    }

    return res.json()
};