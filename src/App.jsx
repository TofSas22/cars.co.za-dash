import React, { useState } from "react";
import InputForm from "./components/InputForm";
import MetadataCard from "./components/MetadataCard";
import SentimentChart from "./components/SentimentChart";
import CommentCategories from "./components/CommentCategories";
import ReportSection from "./components/ReportSection";
import { analyzeVideo } from "./api";
import "./App.css";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const result = await analyzeVideo(url);
      setData(result);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Cars.co.za YouTube Sentiment Dashboard</h1>
      <InputForm onSubmit={handleAnalyze} loading={loading} />
      {error && <p className="error">{error}</p>}

      {data && (
        <>
          <MetadataCard metadata={data.metadata} />
          <SentimentChart sentiments={data.sentiment_results} />
          <CommentCategories categories={data.categories} />
          <ReportSection report={data.report} />
        </>
      )}
    </div>
  );
}
