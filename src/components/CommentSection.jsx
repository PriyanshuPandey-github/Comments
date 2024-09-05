import React, { useState } from 'react';
import Comment from './Comment';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newcommentvalue, setnewcommentvalue] = useState('');
  const [sortingfirst, setsortingfirst] = useState('oldest'); // State to manage sort order

  // Helper to find and update the comment by id recursively
  const findcommentupdate = (id, commentsArray, callback) => {
    return commentsArray.map((comment) => {
      if (comment.id === id) {
        return callback(comment);
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: findcommentupdate(id, comment.replies, callback),
        };
      }
      return comment;
    });
  };

  // Add a new reply to a specific comment
  const handleaddreply = (id, replyvalue) => {
    setComments(
      findcommentupdate(id, comments, (comment) => ({
        ...comment,
        replies: [
          ...comment.replies,
          {
            id: Date.now(),
            text: replyvalue,
            upVotes: 0,
            downVotes: 0,
            replies: [],
            level: comment.level + 1,
          },
        ],
      }))
    );
  };

  // Add a new top-level comment
  const addComment = () => {
    if (newcommentvalue.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newcommentvalue,
          upVotes: 0,
          downVotes: 0,
          replies: [],
          level: 0,
        },
      ]);
      setnewcommentvalue('');
    }
  };

  // Handle like functionality
  const handleUpvote = (id) => {
    setComments(
      findcommentupdate(id, comments, (comment) => ({
        ...comment,
        upVotes: comment.upVotes + 1,
      }))
    );
  };

  // Handle dislike functionality
  const handleDownvote = (id) => {
    setComments(
      findcommentupdate(id, comments, (comment) => ({
        ...comment,
        downVotes: comment.downVotes + 1,
      }))
    );
  };

  // Toggle between sorting by "Oldest" and "Newest"
  const changesorting = () => {
    setsortingfirst(sortingfirst === 'oldest' ? 'newest' : 'oldest');
  };

  // Sort comments based on the current sort order
  const sortedComments = [...comments].sort((a, b) => {
    if (sortingfirst === 'oldest') {
      return a.id - b.id; // Oldest first (based on ID as a timestamp)
    } else {
      return b.id - a.id; // Newest first
    }
  });

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="mb-4">
        <button
          onClick={changesorting}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded-md"
        >
          Sort by: {sortingfirst === 'oldest' ? 'Newest' : 'Oldest'}
        </button>
      </div>
      <div>
        {sortedComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleaddreply={handleaddreply}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
          />
        ))}
      </div>
      <div className="mt-6">
        <textarea
          value={newcommentvalue}
          onChange={(e) => setnewcommentvalue(e.target.value)}
          placeholder="Write a comment..."
          className="resize-none w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={addComment}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;