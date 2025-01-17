// app/page.tsx
"use client";

// app/page.tsx

import { useEffect, useState } from "react";
import ModelDetails from "./components/ModelDetails";
import CryptoChart from "./components/CryptoChart";

interface BestFoldResult {
  "Dropout Rate": number;
  "LSTM Units": number;
  MAE: number;
  RMSE: number;
  "R²": number;
  fold: number;
}

interface ModelDetailsType {
  best_fold_result: BestFoldResult;
  structure: string[];
}

interface ApiResponse {
  crypto: string;
  model_id: number;
  predicted_price: number;
  model_details: ModelDetailsType;
  plot_link: string;
}

const cryptos = ["BTC-USD", "ETH-USD", "BNB-USD", "SOL-USD", "XRP-USD"];
const modelStructures = [
  ["LSTM", "LSTM", "LSTM", "LSTM"],
  ["GRU", "GRU", "GRU", "GRU"],
  ["LSTM", "LSTM", "GRU", "GRU"],
  ["GRU", "GRU", "LSTM", "LSTM"],
  ["LSTM", "GRU", "LSTM", "GRU"],
  ["GRU", "LSTM", "GRU", "LSTM"],
];

const Home: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<number>(0);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Save dark mode preference to localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  // Apply dark mode to body class
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // Handle Crypto selection change
  const handleCryptoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrypto(e.target.value);
    setData(null); // Clear previous data
  };

  // Handle Model selection change
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(Number(e.target.value));
    setData(null); // Clear previous data
  };

  // Fetch data from the API when both crypto and model are selected
  useEffect(() => {
    if (!selectedCrypto || selectedModel === 0) return; // Wait until both are selected

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

        const result: ApiResponse = await res.json();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
        <p className="text-xl text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
        <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 dark:text-white`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto Model Dashboard</h1>
      </div>

      {/* Dropdown for selecting Crypto */}
      <div className="mb-6">
        <label htmlFor="crypto" className="block text-lg font-semibold mb-2">
          Select Crypto:
        </label>
        <select
          id="crypto"
          value={selectedCrypto}
          onChange={handleCryptoChange}
          className="p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            className="p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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

      {/* Display Data after selecting Crypto and Model */}
      {data && (
        <>
          <div className="text-center mb-6">
            <p className="text-lg">
              <strong>Crypto:</strong> {data.crypto}
            </p>
            <p className="text-lg">
              <strong>Model:</strong>{" "}
              {modelStructures[data.model_id - 1]?.join(" → ") ||
                `Model ID: ${data.model_id}`}
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

export default Home;
