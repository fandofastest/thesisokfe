// app/components/CryptoChart.tsx

import React from "react";

interface CryptoChartProps {
  plotLink: string;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ plotLink }) => {
  return (
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Model Plot</h2>
      <img
        src={plotLink}
        alt="Model Plot"
        className="mx-auto max-w-full h-auto"
      />
    </div>
  );
};

export default CryptoChart;
