import React, { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [result, setResult] = useState("");

  const handleVerify = async () => {
    setResult("Verifying...");

    try {
      const response = await fetch("http://localhost:5000/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          secretKey: secretKey,
        }),
      });

      const data = await response.json();
      console.log(data);
      setResult(data + "");
    } catch (error) {
      console.error(error);
      setResult("Error");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex flex-col">
          <label
            htmlFor="token"
            className="text-sm font-medium text-gray-700">
            Token
          </label>
          <input
            type="text"
            id="token"
            className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md"
            placeholder="Enter your token"
            value={token}
            onChange={e => setToken(e.target.value)}
          />

          <label
            htmlFor="secretkey"
            className="mt-4 text-sm font-medium text-gray-700">
            Secret Key
          </label>
          <input
            type="text"
            id="secretkey"
            className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md"
            placeholder="Enter your secret key"
            value={secretKey}
            onChange={e => setSecretKey(e.target.value)}
          />

          <button
            onClick={handleVerify}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">
            Verify
          </button>

          <div
            id="result"
            className="mt-4 p-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
