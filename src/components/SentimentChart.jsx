export default function SentimentChart({ sentiments }) {
    if (!sentiments || sentiments.length === 0) return null;
  
    // Count sentiments
    const counts = { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 };
    sentiments.forEach(({ label }) => {
      if (counts[label] !== undefined) counts[label]++;
    });
  
    const total = sentiments.length;
  
    return (
      <div className="sentiment-chart">
        <h3>Sentiment Summary</h3>
        <div className="bars">
          {Object.entries(counts).map(([label, count]) => {
            const percent = ((count / total) * 100).toFixed(1);
            const color =
              label === "POSITIVE"
                ? "green"
                : label === "NEGATIVE"
                ? "red"
                : "orange";
            return (
              <div key={label} className="bar-row">
                <span>{label}</span>
                <div className="bar-bg">
                  <div
                    className="bar-fill"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                  ></div>
                </div>
                <span>{percent}% ({count})</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  