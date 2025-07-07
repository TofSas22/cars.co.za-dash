import React, { useState, useEffect } from 'react';
import { analyzeVideo, getHealth } from './api';
import { mockAnalysisData } from './mockData';
import InputForm from './components/InputForm';
import MetadataCard from './components/MetadataCard';
import SentimentChart from './components/SentimentChart';
import CommentCategories from './components/CommentCategories';
import AIReport from './components/AIReport';
import { AlertCircle, CheckCircle, Wifi, WifiOff, TestTube } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    // Skip health check initially to avoid CORS errors
    // Set to disconnected and let user choose to test connection
    setApiStatus('disconnected');
  }, []);

  const checkApiHealth = async () => {
    setApiStatus('checking');
    try {
      await getHealth();
      setApiStatus('connected');
    } catch (error) {
      setApiStatus('disconnected');
      console.warn('API health check failed - likely CORS issue:', error.message);
    }
  };

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const result = await analyzeVideo(url);
      console.log('Analysis result:', result);
      setData(result);
      setApiStatus('connected');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze video');
      
      if (err.message?.includes('Network error') || err.message?.includes('Failed to fetch')) {
        setApiStatus('disconnected');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    checkApiHealth();
  };

  const StatusIndicator = () => (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg ${
        apiStatus === 'connected' 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : apiStatus === 'disconnected'
          ? 'bg-red-100 text-red-800 border border-red-200'
          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      }`}>
        {apiStatus === 'connected' ? (
          <Wifi className="w-4 h-4" />
        ) : apiStatus === 'disconnected' ? (
          <WifiOff className="w-4 h-4" />
        ) : (
          <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
        )}
        <span className="text-sm font-medium">
          {apiStatus === 'connected' 
            ? 'API Connected' 
            : apiStatus === 'disconnected'
            ? 'API Disconnected'
            : 'Checking...'
          }
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <StatusIndicator />
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100/50 to-purple-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100/50 to-blue-100/50 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/60 backdrop-blur-xl rounded-full border border-neutral-200/50 shadow-soft">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="text-neutral-700 font-medium">Cars.co.za</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent mb-6 leading-tight">
            YouTube Sentiment
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Analyze YouTube video comments to understand audience sentiment and engagement patterns with AI-powered insights
          </p>
        </div>

        {/* Demo Mode Prominent Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <TestTube className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Try the Demo</h3>
                <p className="text-blue-700 text-sm">
                  Experience the full dashboard with sample data while the API is being configured
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setData(mockAnalysisData);
                setError("");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-soft"
            >
              <TestTube className="w-5 h-5" />
              Launch Demo
            </button>
          </div>
        </div>

        {/* API Status Warning */}
        {apiStatus === 'disconnected' && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <WifiOff className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-amber-700 font-medium">API Connection Issue</p>
                  <p className="text-amber-600 text-sm">
                    Backend CORS needs to allow requests from localhost:5174
                  </p>
                </div>
              </div>
              <button
                onClick={checkApiHealth}
                disabled={apiStatus === 'checking'}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {apiStatus === 'checking' ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="mb-12">
          <InputForm onSubmit={handleAnalyze} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium">Analysis Failed</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Video</h3>
                  <p className="text-gray-600">This may take 10-30 seconds depending on video size...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {data && !loading && (
          <div className="space-y-8">
            {/* Success Message */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-700 font-medium">Analysis Complete</p>
                  <p className="text-green-600 text-sm">Successfully analyzed video and comments</p>
                </div>
              </div>
            </div>

            {/* Video Metadata */}
            <MetadataCard metadata={data.metadata} />
            
            {/* Sentiment Analysis */}
            <SentimentChart sentiments={data.sentiment_results} />
            
            {/* Comment Categories */}
            <CommentCategories categories={data.categories} />
            
            {/* AI Report */}
            <AIReport report={data.report} />
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && !error && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Analyze</h3>
              <p className="text-gray-600">
                Enter a YouTube video URL above to get started with sentiment analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}