import React, { useEffect, useState } from "react";

function ApiData() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("posts"); // posts | users | comments
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data dynamically
  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = `https://dummyjson.com/${type}`;
    console.log(`Fetching: ${url}`);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        // DummyJSON wraps arrays under a property matching the type
        const key = Object.keys(data).find((k) => Array.isArray(data[k]));
        setData(data[key] || []);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        DummyJSON API Browser
      </h1>

      {/* Buttons to toggle between API types */}
      <div className="flex gap-3 mb-6">
        {["posts", "users", "comments"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              type === t
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading and error states */}
      {loading && <p className="text-gray-500">Loading {type}...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* Data display */}
      {!loading && !error && data.length > 0 && (
        <div className="grid gap-4">
          {data.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow hover:bg-gray-50 transition"
            >
              <h3 className="font-bold text-lg">
                {item.title || item.name || `Item #${item.id}`}
              </h3>
              <p className="text-gray-700 text-sm">
                {item.body || item.email || JSON.stringify(item).slice(0, 80)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApiData;
