/* eslint-disable react-hooks/exhaustive-deps */
// components/PostsList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import PostsItem from './PostsItem';

const PostsList = () => {
  const dispatch = useDispatch();
  const { posts, currentPage, totalPages, loading, error } = useSelector(state => state.post);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    // console.log(currentPage)
    dispatch(getPosts(currentPage));
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (currentPage < totalPages && !loading && !loadingMore) {
        setLoadingMore(true);
        dispatch(getPosts(currentPage + 1));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="posts-list">
      {posts.map(post => (
        <PostsItem key={post._id} post={post} />
      ))}
      {loadingMore && <p>Loading more posts...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PostsList;
