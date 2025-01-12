export default function MethodPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Method</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Dalam proyek ini, kami menggunakan metode berbasis{" "}
        <strong>Neural Network</strong> dengan pendekatan arsitektur{" "}
        <strong>LSTM (Long Short-Term Memory)</strong> dan{" "}
        <strong>GRU (Gated Recurrent Unit)</strong> untuk prediksi harga
        cryptocurrency. Pendekatan ini diperkuat dengan **Bayesian
        Optimization** untuk tuning hyperparameter dan **K-Fold
        Cross-Validation** untuk evaluasi model yang lebih robust.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Tahapan Metode</h2>
      <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300">
        <li className="mb-4">
          <strong>Data Preparation</strong>:
          <ul className="list-disc pl-6">
            <li>
              Data harga cryptocurrency diperoleh dari{" "}
              <strong>Yahoo Finance</strong>, dimulai dari 1 Januari 2014.
            </li>
            <li>
              Hanya kolom <strong>Close Price</strong> yang digunakan sebagai
              input ke model.
            </li>
            <li>
              Data dinormalisasi menggunakan <strong>MinMaxScaler</strong> agar
              semua nilai berada di antara 0 dan 1, meningkatkan stabilitas
              numerik.
            </li>
            <li>
              Dataset disiapkan dalam bentuk time series dengan{" "}
              <strong>120 langkah waktu</strong> (time steps) sebagai input dan
              harga penutupan berikutnya sebagai target.
            </li>
          </ul>
        </li>

        <li className="mb-4">
          <strong>Split Data</strong>:
          <ul className="list-disc pl-6">
            <li>
              Data dibagi menggunakan <strong>K-Fold Cross-Validation</strong>{" "}
              dengan 5 fold. Setiap fold memiliki bagian{" "}
              <strong>training</strong> dan <strong>validation</strong>.
            </li>
            <li>
              Cross-validation memastikan bahwa model dievaluasi secara
              menyeluruh pada semua bagian dataset.
            </li>
          </ul>
        </li>

        <li className="mb-4">
          <strong>Bayesian Optimization</strong>:
          <ul className="list-disc pl-6">
            <li>
              Pemilihan hyperparameter seperti <strong>LSTM Units</strong>{" "}
              (30-80) dan <strong>Dropout Rate</strong> (0.1-0.3) dilakukan
              menggunakan Bayesian Optimization.
            </li>
            <li>
              Setiap iterasi mengoptimalkan hyperparameter berdasarkan performa
              pada <strong>validation set</strong>, dengan metrik evaluasi
              berupa <strong>Root Mean Squared Error (RMSE)</strong>.
            </li>
            <li>
              Hasil terbaik dari Bayesian Optimization digunakan untuk melatih
              model pada setiap fold.
            </li>
          </ul>
        </li>

        <li className="mb-4">
          <strong>Model Development</strong>:
          <ul className="list-disc pl-6">
            <li>
              Arsitektur model adalah kombinasi fleksibel antara{" "}
              <strong>LSTM</strong> dan <strong>GRU</strong> dengan total 4
              lapisan.
            </li>
            <li>
              Lapisan terakhir adalah <strong>Dense Layer</strong> dengan 1
              neuron untuk memprediksi harga penutupan.
            </li>
            <li>
              Optimizer: <strong>Adam</strong>, Loss Function:{" "}
              <strong>Mean Squared Error (MSE)</strong>.
            </li>
            <li>
              Model dilatih selama <strong>60 epochs</strong> dengan{" "}
              <strong>batch size 64</strong>.
            </li>
          </ul>
        </li>

        <li className="mb-4">
          <strong>Evaluasi Model</strong>:
          <ul className="list-disc pl-6">
            <li>
              Metrik evaluasi pada setiap fold:
              <ul className="list-disc pl-6">
                <li>
                  <strong>RMSE (Root Mean Squared Error)</strong>: Mengukur
                  tingkat error dalam skala yang sama dengan harga aktual.
                </li>
                <li>
                  <strong>MAE (Mean Absolute Error)</strong>: Rata-rata
                  kesalahan absolut antara prediksi dan nilai aktual.
                </li>
                <li>
                  <strong>R² Score</strong>: Mengukur seberapa baik model
                  menjelaskan variabilitas data.
                </li>
              </ul>
            </li>
            <li>
              Hasil terbaik pada setiap fold dibandingkan untuk menentukan model
              terbaik.
            </li>
          </ul>
        </li>

        <li className="mb-4">
          <strong>Visualisasi</strong>:
          <ul className="list-disc pl-6">
            <li>
              Grafik dibuat untuk membandingkan harga aktual dan prediksi pada
              setiap fold.
            </li>
            <li>
              Visualisasi membantu memvalidasi kualitas prediksi model pada
              dataset.
            </li>
          </ul>
        </li>

        <li className="mb-4">
          <strong>Output Akhir</strong>:
          <ul className="list-disc pl-6">
            <li>
              Model terbaik disimpan dalam format <strong>HDF5</strong>.
            </li>
            <li>
              Hasil evaluasi untuk semua fold disimpan dalam file{" "}
              <strong>evaluation_results_kfold.json</strong>.
            </li>
            <li>
              Grafik prediksi disimpan dalam folder <strong>plots</strong>.
            </li>
          </ul>
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mb-3">Keunggulan Metode</h2>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
        <li>
          Penggunaan <strong>K-Fold Cross-Validation</strong> memastikan
          evaluasi model dilakukan secara menyeluruh.
        </li>
        <li>
          Pengoptimalan hyperparameter menggunakan{" "}
          <strong>Bayesian Optimization</strong> meningkatkan performa model
          tanpa proses tuning manual.
        </li>
        <li>
          Metode fleksibel dengan kombinasi arsitektur <strong>LSTM</strong> dan{" "}
          <strong>GRU</strong>, dirancang khusus untuk data time series.
        </li>
        <li>
          Visualisasi prediksi membantu memahami performa model secara intuitif.
        </li>
      </ul>
    </div>
  );
}
