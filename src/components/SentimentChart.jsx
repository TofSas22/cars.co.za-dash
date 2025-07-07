import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Heart, Meh, ThumbsDown, TrendingUp, BarChart3 } from 'lucide-react';

function SentimentChart({ sentiments }) {
  const [animatedData, setAnimatedData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (sentiments && sentiments.length > 0) {
      // Delay chart appearance for smoother animation
      const timer = setTimeout(() => {
        setShowChart(true);
        calculateAnimatedData();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [sentiments]);

  const calculateAnimatedData = () => {
    const counts = { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 };
    sentiments.forEach(({ label }) => {
      if (counts[label] !== undefined) counts[label]++;
    });

    const total = sentiments.length;
    const data = [
      {
        name: 'Positive',
        value: counts.POSITIVE,
        percentage: Math.round((counts.POSITIVE / total) * 100),
        color: '#10B981',
        lightColor: '#D1FAE5',
        icon: Heart,
      },
      {
        name: 'Neutral',
        value: counts.NEUTRAL,
        percentage: Math.round((counts.NEUTRAL / total) * 100),
        color: '#6B7280',
        lightColor: '#F3F4F6',
        icon: Meh,
      },
      {
        name: 'Negative',
        value: counts.NEGATIVE,
        percentage: Math.round((counts.NEGATIVE / total) * 100),
        color: '#EF4444',
        lightColor: '#FEE2E2',
        icon: ThumbsDown,
      }
    ].filter(item => item.value > 0);

    setAnimatedData(data);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/90 backdrop-blur-xl p-4 border border-neutral-200/50 rounded-2xl shadow-soft">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
            <p className="font-semibold text-neutral-900">{data.name}</p>
          </div>
          <p className="text-sm text-neutral-600">
            {data.value} comments ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    if (percentage < 8) return null; // Don't show labels for small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={14}
        fontWeight="600"
      >
        {`${percentage}%`}
      </text>
    );
  };

  if (!sentiments || sentiments.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-neutral-100 rounded-2xl">
            <TrendingUp className="w-6 h-6 text-neutral-600" />
          </div>
          <h3 className="text-2xl font-semibold text-neutral-900">Sentiment Analysis</h3>
        </div>
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 font-medium">No sentiment data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl">
          <TrendingUp className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-neutral-900">Sentiment Analysis</h3>
          <p className="text-neutral-600">Based on {sentiments.length} comments analyzed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="flex items-center justify-center">
          {showChart ? (
            <div className="relative w-80 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={animatedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {animatedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-3xl font-bold text-neutral-900">
                    {animatedData.reduce((sum, item) => sum + item.value, 0)}
                  </p>
                  <p className="text-sm text-neutral-600 font-medium">Total Comments</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-80 h-80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-neutral-200 border-t-primary-500"></div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="space-y-4">
          {animatedData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 cursor-default"
                style={{ backgroundColor: item.lightColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-xl shadow-sm"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {item.value} comments
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p 
                      className="text-3xl font-bold"
                      style={{ color: item.color }}
                    >
                      {item.percentage}%
                    </p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        backgroundColor: item.color,
                        width: showChart ? `${item.percentage}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 pt-6 border-t border-neutral-200/50">
        <div className="flex items-center justify-center gap-8 text-center">
          <div>
            <p className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
              Dominant Sentiment
            </p>
            <p className="text-lg font-bold text-neutral-900 mt-1">
              {animatedData.length > 0 && 
                animatedData.reduce((prev, current) => 
                  prev.percentage > current.percentage ? prev : current
                ).name
              }
            </p>
          </div>
          <div className="w-px h-12 bg-neutral-200"></div>
          <div>
            <p className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
              Overall Score
            </p>
            <p className="text-lg font-bold text-neutral-900 mt-1">
              {animatedData.length > 0 && 
                (() => {
                  const positive = animatedData.find(d => d.name === 'Positive')?.percentage || 0;
                  const negative = animatedData.find(d => d.name === 'Negative')?.percentage || 0;
                  const score = positive - negative;
                  return score > 0 ? `+${score}` : score;
                })()
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentimentChart;