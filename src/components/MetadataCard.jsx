import React from 'react';
import { Calendar, Eye, ThumbsUp, MessageCircle, User, Clock, ExternalLink } from 'lucide-react';

function MetadataCard({ metadata }) {
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (!metadata) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-soft animate-pulse">
        <div className="space-y-6">
          <div className="h-8 bg-neutral-200 rounded-2xl w-3/4"></div>
          <div className="h-4 bg-neutral-200 rounded-xl w-1/2"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-neutral-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Eye,
      label: 'Views',
      value: formatNumber(metadata.viewCount),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: ThumbsUp,
      label: 'Likes',
      value: formatNumber(metadata.likeCount),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: MessageCircle,
      label: 'Comments',
      value: formatNumber(metadata.commentCount),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      label: 'Published',
      value: formatRelativeTime(metadata.publishedAt),
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-semibold text-neutral-900 leading-tight pr-4">
            {metadata.title}
          </h2>
          <button className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 flex-shrink-0">
            <ExternalLink className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
        
        <div className="flex items-center gap-3 text-neutral-600">
          <User className="w-4 h-4" />
          <span className="font-medium">{metadata.channelTitle}</span>
          <span className="text-neutral-400">•</span>
          <Clock className="w-4 h-4" />
          <span>{formatDate(metadata.publishedAt)}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl p-4 hover:scale-105 transition-transform duration-200 cursor-default`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/80 rounded-xl shadow-sm">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className={`text-lg font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Description */}
      {metadata.description && (
        <div className="border-t border-neutral-200/50 pt-6">
          <h3 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
            Description
          </h3>
          <p className="text-neutral-600 leading-relaxed line-clamp-3">
            {metadata.description.length > 200 
              ? metadata.description.substring(0, 200) + '...' 
              : metadata.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default MetadataCard;