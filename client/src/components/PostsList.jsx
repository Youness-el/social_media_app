// PostsList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import PostsItem from './PostsItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const user = useSelector(state => state.user.user);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // State to track loading state

  useEffect(() => {
    dispatch(getPosts(page));
  }, [dispatch, page]);

  const fetchMorePosts = () => {
    setLoading(true); // Set loading state to true before fetching more posts
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(false); // Set loading state to false once posts are fetched
  }, [posts]);

  return (
    <div className="posts-list">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={true}
        loader={<h4>Loading more posts...</h4>} // Display loading message
      >
        {posts.map(post => (
          <PostsItem key={post._id} post={post} userId={user._id} />
        ))}
      </InfiniteScroll>
      {loading && <h4>Loading more posts...</h4>} {/* Additional loading message */}
    </div>
  );
};

export default PostsList;
