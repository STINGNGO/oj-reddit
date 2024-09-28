import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } from '../../app/store';

export default function ContentBox() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPostsStart());
      try {
        const response = await fetch('https://oauth.reddit.com/r/popular/.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const posts = data.data.children.map((post) => post.data);
        dispatch(fetchPostsSuccess(posts));
      } catch (error) {
        dispatch(fetchPostsFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

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
      <div className="content-box loading">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-box error">
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="content-box">
          <h2 className="post-title">{post.title}</h2>

          {post.selftext && (
            <p className="post-text">{post.selftext}</p>
          )}

          {isValidImageUrl(post.url) && (
            <img
              src={post.url}
              a
              className="post-image"
            />
          )}

          <p className="post-score">Score: {post.score}</p>
        </div>
      ))}
    </div>
  );
}
