import React, { useState, useEffect } from 'react';
import Comment from './Comment';

const CommentSection = () => {
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem('comments')) || []
  );
  const [newcommentvalue, setnewcommentvalue] = useState('');
  const [sortingfirst, setsortingfirst] = useState('oldest'); // State to manage sort order
  const [user, setUser] = useState(localStorage.getItem('user') || ''); // State to manage user
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('user', user);
  }, [comments, user]);

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
            user,
          },
        ],
      }))
    );
  };

  // Add a new top-level comment
  const addComment = () => {
    if (newcommentvalue.trim() && isJoined) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newcommentvalue,
          upVotes: 0,
          downVotes: 0,
          replies: [],
          level: 0,
          user,
        },
      ]);
      setnewcommentvalue('');
    }
  };

  const handleUpvote = (id) => {
    setComments(
      findcommentupdate(id, comments, (comment) => ({
        ...comment,
        upVotes: comment.upVotes + 1,
      }))
    );
  };
  const handleDownvote = (id) => {
    setComments(
      findcommentupdate(id, comments, (comment) => ({
        ...comment,
        upVotes: comment.upVotes - 1,
      }))
    );
  };

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEdit = (id, editedtext) => {
    setComments(
      findcommentupdate(id, comments, (comment) => ({
        ...comment,
        text: editedtext,
      }))
    );
  };

  const handleCopy = (id) => {
    const comment = comments.find((comment) => comment.id === id);
    navigator.clipboard.writeText(comment.text);
  };

  const changesorting = (e) => {
    setsortingfirst(e.target.value);
  };

  const changeUser = (e) => {
    setUser(e.target.value);
  };

  const handleJoin = () => {
    if (user) {
      setIsJoined(true);
    }
  };

  // Sort comments based on the current sort order
  const sortedComments = [...comments].sort((a, b) => {
    if (sortingfirst === 'oldest') {
      return a.id - b.id; // Oldest first (based on ID as a timestamp)
    } else if (sortingfirst === 'newest') {
      return b.id - a.id; // Newest first
    } else if (sortingfirst === 'highestupvotes') {
      return b.upVotes - a.upVotes; // Highest upvotes first
    } else if (sortingfirst === 'lowestupvotes') {
      return a.upVotes - b.upVotes; // Lowest upvotes first
    }
  });

  return (
    <div className=" min-w-[80%] w-auto px-[10%] mx-auto text-white py-5">
      <h2 className="text-2xl  font-bold mb-4">Comments</h2>
      <div className="mb-4 flex items-center justify-between">
        <select
          onChange={changesorting}
          value={sortingfirst}
          className="bg-zinc-800 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-blue-800 transition-all duration-300 text-white py-1 px-3 rounded-md"
        >
          <option className='rounded-md' value="oldest">Oldest</option>
          <option className='rounded-md' value="newest">Newest</option>
          <option className='rounded-md' value="highestupvotes">Highest upvotes</option>
          <option className='rounded-md' value="lowestupvotes">Lowest upvotes</option>
        </select>
        <div>
        <input
          type="email"
          value={user}
          onChange={changeUser}
          placeholder="Your email"
          className="bg-zinc-800 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-blue-800 transition-all duration-300 text-white py-1 px-3 rounded-md"
        />
        <button
          onClick={handleJoin}
          className="bg-blue-500 text-white ml-1 py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Join
        </button>
        </div>
      </div>
      <div>
        {sortedComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleaddreply={handleaddreply}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onCopy={handleCopy}
            user={user}
          />
        ))}
      </div>
      <div className="mt-6">
        <textarea
          value={newcommentvalue}
          onChange={(e) => setnewcommentvalue(e.target.value)}
          placeholder="Write a comment..."
          className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] resize-none bg-zinc-800 outline-none w-full p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={addComment}
          className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          disabled={!isJoined}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;

