// app/components/ModelDetails.tsx

interface BestFoldResult {
  "Dropout Rate": number;
  "LSTM Units": number;
  MAE: number;
  RMSE: number;
  "R²": number;
  fold: number;
}

interface ModelDetailsProps {
  modelDetails: {
    best_fold_result: BestFoldResult;
    structure: string[];
  };
}

const ModelDetails: React.FC<ModelDetailsProps> = ({ modelDetails }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Model Details
      </h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Best Fold Result:
          </span>
          <div className="text-gray-900 dark:text-gray-200">
            <p>
              <strong>Dropout Rate:</strong>{" "}
              {modelDetails.best_fold_result["Dropout Rate"]}
            </p>
            <p>
              <strong>LSTM Units:</strong>{" "}
              {modelDetails.best_fold_result["LSTM Units"]}
            </p>
            <p>
              <strong>MAE:</strong> {modelDetails.best_fold_result.MAE}
            </p>
            <p>
              <strong>RMSE:</strong> {modelDetails.best_fold_result.RMSE}
            </p>
            <p>
              <strong>R²:</strong> {modelDetails.best_fold_result["R²"]}
            </p>
            <p>
              <strong>Fold:</strong> {modelDetails.best_fold_result.fold}
            </p>
          </div>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Model Structure:
          </span>
          <div className="text-gray-900 dark:text-gray-200">
            {modelDetails.structure.join(" → ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
