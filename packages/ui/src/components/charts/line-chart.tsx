"use client";

import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export interface LineChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  height?: number;
}

export function LineChart({ 
  data, 
  categories,
  index,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"], 
  height = 300
}: LineChartProps) {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            contentStyle={{ 
              backgroundColor: '#141414', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            itemStyle={{ color: '#fff' }}
          />
          
          {categories.map((category, i) => (
            <Line 
              key={category}
              type="monotone" 
              dataKey={category} 
              stroke={colors[i % colors.length]} 
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2, fill: '#141414' }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              animationDuration={1500}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
