import React from 'react';

interface BarChartProps {
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div>
      {data.map((value, index) => (
        <div
          key={index}
          style={{
            height: `${value}px`,
            width: '20px',
            backgroundColor: 'blue',
            margin: '5px',
          }}
        />
      ))}
    </div>
  );
};

export default BarChart;
