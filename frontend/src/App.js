import React, { useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import bg from "./img/bg.jpg";
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Incomes/Income";
import Expenses from "./components/Expenses/Expenses";
import { useGlobalContext } from "./context/GlobalContext";
import Transactions from "./components/Transaction/Transactions";
import Predictions from "./components/Predictions/predictions";
import Split from "./components/Split/Split";
import OCRResults from "./components/OCRResults"; // Import OCRResults Component

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();

  // OCR State
  const [file, setFile] = useState(null);
  const [ocrData, setOcrData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // Process OCR
  const processOCR = async () => {
    if (!file) return alert("Please upload a file first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/processOCR", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOcrData(response.data);
      setFile(null);
    } catch (error) {
      console.error("OCR Processing Error:", error);
      alert("Error processing OCR. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // Switch between different sections
  const displayData = () => {
    switch (active) {
      case 1: return <Dashboard />;
      case 2: return <Transactions />;
      case 3: return <Income />;
      case 4: return <Expenses />;
      case 5: return <Predictions />;
      case 6: return <Split />;
      case 7:
        return (
          <OCRScanSection>
            <h2>OCR Bill Scanner</h2>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <button onClick={processOCR} disabled={!file || loading}>
              {loading ? "Processing..." : "Extract Bill Data"}
            </button>

            {ocrData.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Particulars</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {ocrData.map((bill, index) => (
                    <tr key={index}>
                      <td>{bill.particulars}</td>
                      <td>{bill.date}</td>
                      <td>{bill.amount}</td>
                      <td>{bill.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </OCRScanSection>
        );
      case 8:
        return <OCRResults />; // New section for fetching OCR CSV data
      default: return <Dashboard />;
    }
  };

  const OrbMemo = useMemo(() => <Orb />, []);

  return (
    <AppStyled bg={bg} className="App">
      {OrbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  
  main {
    flex: 1;
    background: rgba(250,250,250, 0.78);
    backdrop-filter: blur(4.5px);
    border-radius: 12px;
    overflow-x: hidden;
    
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const OCRScanSection = styled.div`
  padding: 20px;
  text-align: center;

  input {
    margin: 10px;
  }

  button {
    margin: 10px;
    padding: 8px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background: white;
  }

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  th {
    background: #f4f4f4;
  }
`;

export default App;
