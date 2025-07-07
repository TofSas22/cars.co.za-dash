import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, AlertCircle, Check } from 'lucide-react';

function InputForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef(null);

  const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    
    if (value && !validateYouTubeUrl(value)) {
      setValidationError('Please enter a valid YouTube URL');
      setIsValid(false);
    } else if (value) {
      setValidationError('');
      setIsValid(true);
    } else {
      setValidationError('');
      setIsValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setValidationError('Please enter a YouTube URL');
      inputRef.current?.focus();
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setValidationError('Please enter a valid YouTube URL');
      inputRef.current?.focus();
      return;
    }

    setValidationError('');
    onSubmit(url.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Main Input Container */}
      <div className="relative">
        <div className={`
          relative flex items-center bg-white/70 backdrop-blur-xl rounded-3xl shadow-soft transition-all duration-300 ease-out
          ${isFocused ? 'shadow-soft-xl ring-2 ring-primary-500/20 scale-[1.02]' : 'hover:shadow-soft-lg'}
          ${validationError ? 'ring-2 ring-error-500/30' : ''}
          ${isValid && !validationError ? 'ring-1 ring-success-500/40' : ''}
        `}>
          {/* Search Icon */}
          <div className="pl-8 pr-4 py-6">
            <Search className={`w-6 h-6 transition-colors duration-200 ${
              isFocused ? 'text-primary-600' : 
              validationError ? 'text-error-500' : 
              isValid ? 'text-success-500' : 
              'text-neutral-400'
            }`} />
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="url"
            placeholder="Paste YouTube video URL here..."
            value={url}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1 py-6 px-2 text-lg text-neutral-900 placeholder-neutral-400 bg-transparent border-none outline-none font-medium"
          />

          {/* Status Icon */}
          {url && (
            <div className="px-4">
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              ) : isValid ? (
                <Check className="w-5 h-5 text-success-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-error-500" />
              )}
            </div>
          )}

          {/* Analyze Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !url.trim() || validationError}
            className={`
              mx-6 px-8 py-3.5 rounded-2xl font-semibold text-white transition-all duration-200 ease-out
              ${loading || !url.trim() || validationError
                ? 'bg-neutral-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 active:scale-95 shadow-soft hover:shadow-soft-lg'
              }
            `}
          >
            <div className="flex items-center gap-2.5">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/70 border-t-white rounded-full animate-spin" />
                  <span>Analyzing</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Validation Message */}
        {validationError && (
          <div className="flex items-center gap-2 mt-4 px-8 animate-slide-up">
            <AlertCircle className="w-4 h-4 text-error-500 flex-shrink-0" />
            <span className="text-sm text-error-600 font-medium">{validationError}</span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-8 animate-slide-up">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/50 shadow-soft">
            <div className="flex items-center gap-4">
              {/* Animated Progress Indicator */}
              <div className="relative">
                <div className="w-10 h-10 border-3 border-primary-100 rounded-full"></div>
                <div className="absolute inset-0 w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  Analyzing your video
                </h3>
                <p className="text-sm text-neutral-600">
                  Fetching comments and analyzing sentiment patterns...
                </p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Fetching metadata', active: true },
                { label: 'Processing comments', active: false },
                { label: 'Generating insights', active: false }
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    step.active ? 'bg-primary-500 animate-pulse' : 'bg-neutral-200'
                  }`} />
                  <span className={`text-xs ${
                    step.active ? 'text-primary-600 font-medium' : 'text-neutral-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputForm;