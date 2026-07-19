import React from 'react';

const MOCK_LANGUAGES = [
  { name: 'TypeScript', percentage: 75.4, color: 'bg-blue-500' },
  { name: 'CSS', percentage: 15.2, color: 'bg-purple-500' },
  { name: 'HTML', percentage: 6.8, color: 'bg-orange-500' },
  { name: 'JavaScript', percentage: 2.6, color: 'bg-yellow-400' },
];

export const LanguageBreakdown = () => {
  return (
    <div className="border border-border rounded-xl bg-card p-6">
      <h3 className="font-semibold mb-4">Language Breakdown</h3>
      
      {/* Progress Bar */}
      <div className="flex h-3 w-full rounded-full overflow-hidden mb-6">
        {MOCK_LANGUAGES.map((lang) => (
          <div 
            key={lang.name}
            className={`h-full ${lang.color}`}
            style={{ width: `${lang.percentage}%` }}
            title={`${lang.name} ${lang.percentage}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4">
        {MOCK_LANGUAGES.map((lang) => (
          <div key={lang.name} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${lang.color}`} />
            <span className="text-sm font-medium">{lang.name}</span>
            <span className="text-sm text-text-muted">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
