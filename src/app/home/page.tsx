// app/predict/page.tsx

"use client";

import { useEffect, useState } from "react";
import ModelDetails from "../components/ModelDetails";
import CryptoChart from "../components/CryptoChart";

const cryptos = ["BTC-USD", "ETH-USD", "BNB-USD", "SOL-USD", "XRP-USD"];
const modelStructures = [
  ["LSTM", "LSTM", "LSTM", "LSTM"],
  ["GRU", "GRU", "GRU", "GRU"],
  ["LSTM", "LSTM", "GRU", "GRU"],
  ["GRU", "GRU", "LSTM", "LSTM"],
  ["LSTM", "GRU", "LSTM", "GRU"],
  ["GRU", "LSTM", "GRU", "LSTM"],
];

const PredictPage: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCryptoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrypto(e.target.value);
    setData(null); // Clear previous data
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(Number(e.target.value));
    setData(null); // Clear previous data
  };

  useEffect(() => {
    if (!selectedCrypto || selectedModel === 0) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://thesisapi.fando.id/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crypto: selectedCrypto,
            model_id: selectedModel,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCrypto, selectedModel]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Predict Page</h1>

      {/* Dropdown for selecting Crypto */}
      <div className="mb-6">
        <label htmlFor="crypto" className="block text-lg font-semibold mb-2">
          Select Crypto:
        </label>
        <select
          id="crypto"
          value={selectedCrypto}
          onChange={handleCryptoChange}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="">-- Select Crypto --</option>
          {cryptos.map((crypto) => (
            <option key={crypto} value={crypto}>
              {crypto}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for selecting Model */}
      {selectedCrypto && (
        <div className="mb-6">
          <label htmlFor="model" className="block text-lg font-semibold mb-2">
            Select Model:
          </label>
          <select
            id="model"
            value={selectedModel}
            onChange={handleModelChange}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          >
            <option value={0}>-- Select Model --</option>
            {modelStructures.map((structure, index) => (
              <option key={index} value={index + 1}>
                Model {index + 1} ({structure.join(" → ")})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display Data */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <>
          <div className="text-center mb-6">
            <p className="text-lg">
              <strong>Crypto:</strong> {data.crypto}
            </p>
            <p className="text-lg">
              <strong>Model:</strong>{" "}
              {modelStructures[data.model_id - 1]?.join(" → ")}
            </p>
            <p className="text-lg">
              <strong>Predicted Price:</strong> $
              {data.predicted_price.toFixed(2)}
            </p>
          </div>

          <ModelDetails modelDetails={data.model_details} />
          <CryptoChart plotLink={data.plot_link} />
        </>
      )}
    </div>
  );
};

export default PredictPage;
