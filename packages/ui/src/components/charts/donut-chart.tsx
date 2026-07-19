"use client";

import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export interface DonutChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
  height?: number;
}

export function DonutChart({ 
  data, 
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"], 
  height = 300
}: DonutChartProps) {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#141414', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', color: '#999' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
