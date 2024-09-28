import React, { useState, useEffect } from 'react';

export default function ContentBox() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Initialize data as an empty array

  useEffect(() => {
    // simulate a data fetching process
    setTimeout(() => {
      setData(['Loaded data 1!', 'Loaded data 2!', 'Loaded data 3!']); // Set data to an array of multiple items
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="content-box" style={{ backgroundColor: '#ccc' }}>
          <span>Loading...</span>
        </div>
      ) : (
        data.map((item, index) => (
          <div key={index} className="content-box">
            <span>{item}</span>
          </div>
        ))
      )}
    </div>
  );
}