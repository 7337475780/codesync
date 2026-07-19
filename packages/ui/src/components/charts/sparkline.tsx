"use client";

import { 
  AreaChart as RechartsAreaChart, 
  Area, 
  ResponsiveContainer 
} from 'recharts';

export interface SparklineProps {
  data: any[];
  index: string;
  category: string;
  color?: string;
  height?: number;
}

export function Sparkline({ 
  data, 
  category,
  color = "#8b5cf6", 
  height = 60
}: SparklineProps) {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`sparkline-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey={category} 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#sparkline-${color})`} 
            animationDuration={1000}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
