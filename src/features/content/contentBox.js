import React, { useState, useEffect } from 'react';

export default function ContentBox() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // simulate a data fetching process
    setTimeout(() => {
      setData('Loaded data!');
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="content-box" style={{ backgroundColor: loading ? '#ccc' : '' }}>
      {loading ? (
        <div className="content">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="content">
          <span >{data}</span>
        </div>
      )}
    </div>
  );
}