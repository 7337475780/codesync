"use client";

import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export interface BarChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  height?: number;
}

export function BarChart({ 
  data, 
  categories,
  index,
  colors = ["#10b981", "#3b82f6"], 
  height = 300
}: BarChartProps) {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          
          <XAxis 
            dataKey={index} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#666', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#666', fontSize: 12 }}
          />
          
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
            contentStyle={{ 
              backgroundColor: '#141414', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            itemStyle={{ color: '#fff' }}
          />
          
          {categories.map((category, i) => (
            <Bar 
              key={category}
              dataKey={category} 
              fill={colors[i % colors.length]} 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
