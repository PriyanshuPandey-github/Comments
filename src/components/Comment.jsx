import { useState, useEffect } from "react";
import { upvoteicon, downvoteicon, usericon } from "../assets/assets";

const CommentActions = ({ comment, handleUpvote, handleDownvote, onDelete, onEdit, onCopy, user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(comment.text);
  };

  const handleDelete = () => {
    if (comment.user === user) {
      onDelete(comment.id);
    } else {
      alert('You are not authorized to delete this comment');
    }
  };

  const handleEdit = () => {
    if (comment.user === user) {
      onEdit(comment.id, comment.text);
    } else {
      alert('You are not authorized to edit this comment');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 text-2xl">
        <button onClick={() => handleUpvote(comment.id)} className="text-blue-500 hover:text-green-500 transition-all duration-500 " >
          <img src={upvoteicon} className="w-7 h-7 hover:scale-110 transition-all duration-300 ease-in-out" alt="" /> 
        </button>
        <span className="text-blue-400 px-3">{comment.upVotes}</span>
        <button onClick={() => handleDownvote(comment.id)} className="text-orange-500 hover:text-red-600 transition-all duration-500">
          <img src={downvoteicon} className="w-7 h-7 hover:scale-110 transition-all duration-300 ease-in-out" alt="" /> 
        </button>
      </div>
      {(comment.user === user) && (
        <select className="text-white bg-zinc-800 py-1 px-2 rounded-md hover:bg-blue-800 hover:text-white transition-all duration-500" onChange={(e) => {
          if (e.target.value === 'copy') {
            handleCopy();
            e.target.value = '';
          } else if (e.target.value === 'delete') {
            handleDelete();
            e.target.value = '';
          } else if (e.target.value === 'edit') {
            handleEdit();
            e.target.value = '';
          }
        }}>
          <option value="">...</option>
          <option value="copy">Copy</option>
          <option value="delete">Delete</option>
          <option value="edit">Edit</option>
        </select>
      )}
    </div>
  );
};

const CommentReply = ({ showReplies, setShowReplies, comment, handleaddreply, handleUpvote, handleDownvote, onDelete, onEdit, onCopy, user }) => {
  const [replyboxon, setreplyboxon] = useState(false);
  const [replyvalue, setreplyvalue] = useState('');

  const handleReply = () => {
    if (replyvalue.trim()) {
      handleaddreply(comment.id, replyvalue);
      setreplyvalue('');
      setreplyboxon(false);
    }
  };

  return (
    <div className="ml-6 min-w-[50vw] w-auto overflow-x-wrap tracking-widest mt-4 pl-4">
      <button onClick={() => setreplyboxon(!replyboxon)} className="text-sm text-white px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-500 " >
        {replyboxon ? 'Cancel' : 'Reply'}
      </button>
      {comment.replies.length > 0 && (
        <button onClick={() => setShowReplies(!showReplies)} className="text-sm text-white px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-500 ml-2">
          {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
        </button>
      )}
      {replyboxon && (
        <div className="mt-4">
          <textarea value={replyvalue} onChange={(e) => setreplyvalue(e.target.value)} placeholder="Write a reply..." className="resize-none w-full p-2 bg-zinc-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          <button onClick={handleReply} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600" >
            Submit Reply
          </button>
        </div>
      )}
    </div>
  );
};

const CommentText = ({ comment, isEditing, setIsEditing, editedText, setEditedText }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="mt-2 max-h-[5em] overflow-hidden">
      {isEditing ? (
        <div className="flex items-center justify-between">
          <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} placeholder="Write a reply..." className="resize-none w-full p-2 bg-zinc-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          <button onClick={() => setIsEditing(false)} className="text-sm text-white px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-500 ml-2">
            Save
          </button>
        </div>
      ) : (
        <div className="mb-2 overflow-hidden flex flex-col">
          <div className="max-h-[5em] overflow-hidden">
            {showMore ? (
              <span>{comment.text}</span>
            ) : (
              <span>{comment.text.length > 100 ? `${comment.text.slice(0, 100)}...` : comment.text}</span>
            )}
          </div>
          {comment.text.length > 100 && (
            <button onClick={handleShowMore} className=" text-sm text-white px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-500 ml-2 self-end">
              {showMore ? 'Show less' : 'Show more...'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const Comment = ({ comment, handleaddreply, handleUpvote, handleDownvote, onDelete, onEdit, onCopy, user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const [showReplies, setShowReplies] = useState(false);
    const maxDepth = 5; // Maximum depth for nested replies
    const minCommentWidth = '50vw';

  useEffect(() => {
    setEditedText(comment.text);
  }, [comment.text]);

  return (
    <div
      className="ml-6 min-w-[50%] w-auto overflow-x-wrap tracking-widest mt-4 border-l-2 border-white pl-4"
      style={{
        minWidth: minCommentWidth,
        maxWidth: `calc(100% - ${comment.depth * 20}px)`, // Reduce width based on depth
        marginLeft: `${comment.depth * 20}px`, // Increase margin based on depth
      }}
    >

      <div className="text-wrap bg-zinc-800 text-white rounded-lg p-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
        
        <CommentActions comment={comment} handleUpvote={handleUpvote} handleDownvote={handleDownvote} onDelete={onDelete} onEdit={() => setIsEditing(true)} onCopy={onCopy} user={user} />
        <div className="flex items-center space-x-2">
          <img src={usericon} className="w-7 h-7 rounded-full" alt="" />
          <div>
            <span className="text-sm font-bold">{comment.user}</span>
          </div>
        </div>
        <CommentText comment={comment} isEditing={isEditing} setIsEditing={setIsEditing} editedText={editedText} setEditedText={setEditedText} />
        <CommentReply showReplies={showReplies} setShowReplies={setShowReplies} comment={comment} handleaddreply={handleaddreply} handleUpvote={handleUpvote} handleDownvote={handleDownvote} onDelete={onDelete} onEdit={() => setIsEditing(true)} onCopy={onCopy} user={user} />
      </div>
      {showReplies && comment.replies.length > 0 && (
        <div className="ml-4 mt-4">
          {comment.replies.map((reply, index) => (
            <Comment
              key={reply.id}
              comment={reply}
              handleaddreply={handleaddreply}
              handleUpvote={handleUpvote}
              handleDownvote={handleDownvote}
              onDelete={onDelete}
              onEdit={() => setIsEditing(true)}
              onCopy={onCopy}
              user={user}
              depth={comment.depth + 1} // Increase depth for nested replies
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;