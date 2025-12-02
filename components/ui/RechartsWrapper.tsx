import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface RechartsWrapperProps {
  data: any[];
}

export const RechartsWrapper: React.FC<RechartsWrapperProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#64748b' }} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#64748b' }} 
        />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar 
          dataKey="completed" 
          fill="#3b82f6" 
          radius={[4, 4, 0, 0]} 
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
