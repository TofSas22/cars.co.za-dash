import React, { useState } from 'react';
import { MessageCircle, Flame, HelpCircle, Star, Quote } from 'lucide-react';

function CommentCategories({ categories }) {
  const [activeTab, setActiveTab] = useState('most_interesting');

  const tabs = [
    { 
      id: 'most_interesting', 
      label: 'Most Interesting',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      activeColor: 'bg-purple-600'
    },
    { 
      id: 'hot_takes', 
      label: 'Hot Takes',
      icon: Flame,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      activeColor: 'bg-red-600'
    },
    { 
      id: 'questions', 
      label: 'Questions',
      icon: HelpCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      activeColor: 'bg-blue-600'
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  if (!categories || Object.keys(categories).length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <MessageCircle className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Comment Categories</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No comment categories available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <MessageCircle className="w-6 h-6 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Comment Categories</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const commentCount = categories[tab.id]?.length || 0;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? `${tab.activeColor} text-white shadow-md`
                  : `bg-gray-100 text-gray-700 hover:bg-gray-200`
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                isActive 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {commentCount}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="space-y-4">
        {categories[activeTab] && categories[activeTab].length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <activeTabData.icon className={`w-5 h-5 ${activeTabData.color}`} />
              <h4 className="font-semibold text-gray-800">
                {activeTabData.label} ({categories[activeTab].length})
              </h4>
            </div>
            
            <div className="space-y-3">
              {categories[activeTab].map((comment, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${activeTabData.bgColor} ${activeTabData.borderColor} hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-start gap-3">
                    <Quote className={`w-4 h-4 mt-1 ${activeTabData.color} flex-shrink-0`} />
                    <p className="text-gray-700 leading-relaxed">{comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <activeTabData.icon className={`w-12 h-12 mx-auto mb-3 ${activeTabData.color} opacity-50`} />
            <p className="text-gray-500">
              No {activeTabData.label.toLowerCase()} comments found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentCategories;