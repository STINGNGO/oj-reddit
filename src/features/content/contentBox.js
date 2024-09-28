import React, { useState, useEffect } from 'react';

export default function ContentBox() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from Reddit API
    fetch('https://oauth.reddit.com/r/popular/.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const posts = data.data.children.map((post) => post.data);
        setData(posts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const isValidImageUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return /\.(jpeg|jpg|gif|png|webp)$/i.test(parsedUrl.pathname);
    } catch {
      return false;
    }
  };

  if (loading) {
    return (
      <div
        className="content-box"
        style={{
          backgroundColor: '#ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          color: 'red',
          textAlign: 'center',
          margin: '20px',
        }}
      >
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {data.map((post, index) => (
        <div
          key={index}
          className="content-box"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              maxHeight: '50px',
            }}
          >
            {post.title}
          </h2>

          {post.selftext && (
            <p
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                maxHeight: '50px',
                textAlign: 'center',
              }}
            >
              {post.selftext}
            </p>
          )}

          {isValidImageUrl(post.url) && (
            <img
              src={post.url}
              alt={`Image for ${post.title}`}
              style={{
                maxWidth: '40vw',
                maxHeight: '50vh',
                objectFit: 'cover',
                borderRadius: '10px',
                margin: '20px auto',
              }}
            />
          )}

          <p style={{ textAlign: 'center' }}>Score: {post.score}</p>
        </div>
      ))}
    </div>
  );
}
