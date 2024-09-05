import { useState } from "react";
const Comment = ({ comment, handleaddreply, handleUpvote, handleDownvote }) => {
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
      <div className="ml-6 mt-4 border-l-2 border-gray-300 pl-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => handleUpvote(comment.id)} className="text-green-500 hover:text-green-600" >
                🔼 {comment.upVotes}
              </button>
              <button onClick={() => handleDownvote(comment.id)} className="text-red-500 hover:text-red-600" >
                🔽 {comment.downVotes}
              </button>
            </div>
          </div>
          <p className="text-gray-700 mt-2">{comment.text}</p>
          <div className="mt-2">
            <button onClick={() => setreplyboxon(!replyboxon)} className="text-sm text-blue-500 hover:underline" >
              {replyboxon ? 'Cancel' : 'Reply'}
            </button>
          </div>
          {replyboxon && (
            <div className="mt-4">
              <textarea value={replyvalue} onChange={(e) => setreplyvalue(e.target.value)} placeholder="Write a reply..." className="resize-none w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
              <button onClick={handleReply} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600" >
                Submit Reply
              </button>
            </div>
          )}
        </div>
        <div className="ml-4 mt-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} handleaddreply={handleaddreply} handleUpvote={handleUpvote} handleDownvote={handleDownvote} />
          ))}
        </div>
      </div>
    );
  };

  export default Comment;