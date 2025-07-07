import React, { useState } from "react";

export default function InputForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="url"
        placeholder="Enter YouTube video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
}
