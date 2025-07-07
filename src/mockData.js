// Mock data for development testing when API is not available
export const mockAnalysisData = {
  video_id: "dQw4w9WgXcQ",
  sentiment_results: [
    { text: "Great review! Very thorough and helpful.", label: "POSITIVE", score: 0.92 },
    { text: "This car looks amazing, definitely considering buying one.", label: "POSITIVE", score: 0.88 },
    { text: "Not impressed with the fuel economy numbers.", label: "NEGATIVE", score: 0.76 },
    { text: "Good video quality and presentation.", label: "POSITIVE", score: 0.84 },
    { text: "Overpriced for what you get in my opinion.", label: "NEGATIVE", score: 0.82 },
    { text: "The interior looks nice but not sure about durability.", label: "NEUTRAL", score: 0.52 },
    { text: "Thanks for the detailed comparison with competitors.", label: "POSITIVE", score: 0.89 },
    { text: "Audio quality could be better in the video.", label: "NEGATIVE", score: 0.68 },
    { text: "Informative review as always.", label: "POSITIVE", score: 0.91 },
    { text: "When will you review the electric version?", label: "NEUTRAL", score: 0.48 }
  ],
  categories: {
    most_interesting: [
      "I've owned this car for 2 years and here's my honest opinion: the build quality is excellent but the maintenance costs are higher than expected.",
      "Just test drove one yesterday and the handling is incredible. The steering response is so precise compared to my current BMW.",
      "As a mechanic, I can tell you these engines are very reliable if you follow the service schedule religiously."
    ],
    hot_takes: [
      "This car is completely overrated! You're paying for the badge, not the quality.",
      "Best luxury SUV money can buy. Period. Nothing else comes close.",
      "German cars are just expensive paperweights after 100k miles.",
      "This makes my Tesla look like a toy. ICE is still king!"
    ],
    questions: [
      "What's the real-world fuel economy like in city driving?",
      "How does this compare to the Mercedes GLE in terms of ride comfort?",
      "Any idea when the facelift model is coming out?",
      "Is the extended warranty worth the extra cost?",
      "Does it come with adaptive cruise control as standard?"
    ]
  },
  report: `VIDEO ANALYSIS REPORT

The 2024 BMW X5 review received overwhelmingly positive feedback from viewers, with 60% positive sentiment across 245 comments analyzed. The video generated significant engagement with viewers particularly appreciating the detailed interior walkthrough and performance testing segments.

Key Strengths Highlighted:
• Build quality and premium materials
• Driving dynamics and handling precision  
• Technology integration and user interface
• Comprehensive feature coverage

Common Concerns:
• Fuel economy in real-world conditions
• Long-term reliability and maintenance costs
• Price competitiveness versus alternatives

Top Questions from Viewers:
• Real-world fuel consumption figures
• Comparison with Mercedes-Benz GLE and Audi Q7
• Availability and pricing of optional features
• Expected depreciation rates

Recommendations for Future Content:
1. Include more detailed fuel economy testing in various conditions
2. Provide comprehensive comparison content with direct competitors
3. Address long-term ownership costs and reliability data
4. Consider follow-up videos addressing viewer questions

Engagement Metrics:
• 60% Positive sentiment
• 30% Neutral sentiment  
• 10% Negative sentiment
• High engagement rate with thoughtful, detailed comments`,
  metadata: {
    videoId: "dQw4w9WgXcQ",
    title: "2024 BMW X5 xDrive40i Review - Luxury SUV Excellence or Overpriced?",
    description: "Comprehensive review of the 2024 BMW X5 covering performance, interior, technology, and value proposition. We test drive the xDrive40i model and share our honest thoughts on whether this luxury SUV is worth the premium price tag.",
    publishedAt: "2024-01-15T10:00:00Z",
    channelTitle: "Cars.co.za",
    viewCount: 125000,
    likeCount: 3500,
    commentCount: 245
  }
};