import React from 'react';
import { useReducedMotion } from 'framer-motion';

// Mock data generator for a year of commits
const generateHeatmapData = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const data = [];
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      // 0-4 scale: 0 = none, 1 = low, 2 = medium, 3 = high, 4 = very high
      let intensity = 0;
      const rand = Math.random();
      if (rand > 0.9) intensity = 4;
      else if (rand > 0.7) intensity = 3;
      else if (rand > 0.4) intensity = 2;
      else if (rand > 0.2) intensity = 1;
      
      week.push(intensity);
    }
    data.push(week);
  }
  return data;
};

const getColorClass = (intensity: number) => {
  switch (intensity) {
    case 4: return 'bg-success';
    case 3: return 'bg-success/80';
    case 2: return 'bg-success/60';
    case 1: return 'bg-success/30';
    default: return 'bg-muted/50';
  }
};

export const ContributionGraph = () => {
  const heatmapData = React.useMemo(() => generateHeatmapData(), []);
  
  return (
    <div className="border border-border rounded-xl bg-card p-6 overflow-hidden">
      <h3 className="font-semibold mb-4">Commit Heatmap (Last 12 Months)</h3>
      
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex gap-1 min-w-max">
          {heatmapData.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((intensity, dIdx) => (
                <div 
                  key={`${wIdx}-${dIdx}`}
                  className={`w-3 h-3 rounded-sm ${getColorClass(intensity)} transition-colors hover:ring-1 hover:ring-border hover:scale-110`}
                  title={`${intensity > 0 ? intensity * 5 : 'No'} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 text-xs text-text-muted mt-2">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted/50" />
          <div className="w-3 h-3 rounded-sm bg-success/30" />
          <div className="w-3 h-3 rounded-sm bg-success/60" />
          <div className="w-3 h-3 rounded-sm bg-success/80" />
          <div className="w-3 h-3 rounded-sm bg-success" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
