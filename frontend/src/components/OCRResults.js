import React, { useState } from "react";
import Papa from "papaparse";

function OCRResults() {
  const [csvData, setCsvData] = useState([]);

  const fetchCSV = async () => {
  const csvUrl = "https://drive.google.com/uc?export=download&id=1XkZOzaxABbJEo1b3pBR1AsLDZHy65CBz"; 

    try {
      const response = await fetch(csvUrl);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCsvData(results.data);
        },
      });
    } catch (error) {
      console.error("Error fetching CSV:", error);
      alert("Failed to fetch OCR data.");
    }
  };

  return (
    <div>
      <h2>OCR Extracted Bill Data</h2>
      <button onClick={fetchCSV}>Load Bill Data</button>

      {csvData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Particulars</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                <td>{row.Particulars}</td>
                <td>{row.Date}</td>
                <td>{row.Amount}</td>
                <td>{row.Category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OCRResults;
