
import { useState } from "react";

const Comment = () => {
  const [comments, setComments] = useState([
    { comment: "Its a good day", upvote: 3, id: 0, reply: null },
    { comment: "I Love today", upvote: 2, id: 1, reply: 1 },
    { comment: "Its a beatiful day", upvote: 0, id: 2, reply: 1 },
    { comment: "I really liked today", upvote: 0, id: 3, reply: 1 },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyId, setReplyId] = useState(null);

  const handleAddComment = () => {
    const newCommentObj = {
      comment: newComment,
      upvote: 0,
      id: comments.length,
      reply: null,
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleReply = (id) => {
    const newCommentObj = {
      comment: replyComment,
      upvote: 0,
      id: comments.length,
      reply: id,
    };
    setComments([...comments, newCommentObj]);
    setReplyComment("");
    setReplyId(null);
  };

  const handleUpvote = (id) => {
    const updatedComments = comments.map((comment) => {
      if ((comment.id) === id) {
        return { ...comment, upvote: comment.upvote + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDownvote = (id) => {
    const updatedComments = comments.map((comment) => {
      if ((comment.id) === id) {
        return { ...comment, upvote: Math.max(comment.upvote - 1, 0) };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <>
      <div className="w-full h-full bg-zinc-400 items-center">
        <div id="add-comment" className="px-3 py-2 mb-2 w-[70%]">
          <form action="" className="w-full h-full flex flex-col">
            <input
              type="text"
              name="comment"
              className="px-3 py-2 w-[80%] rounded-md"
              placeholder="Insert comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <input
              type="button"
              value="Add"
              className="hover:cursor-pointer px-5 py-2 bg-blue-500 rounded-md w-[max-content] mt-5"
              onClick={handleAddComment}
            />
          </form>
        </div>
        <br />
        {comments
          .sort((a, b) => b.upvote - a.upvote)
          .map((val) => {
            return (
              <div key={(val.id)} className="comments pl-10 py-2 mb-2 w-[70%]">
                <form action="" className="w-full h-full flex flex-col items-start">
                  <input
                    type="button"
                    value="Up"
                    className="hover:cursor-pointer px-5 py-2 bg-green-500 rounded-md w-[max-content] mt-5"
                    onClick={() => handleUpvote((val.id))}
                  />
                  <h1 className="hover:cursor-pointer px-5 py-2 bg-gray-500 rounded-md w-[max-content] mt-5">
                    {val.upvote}
                  </h1>
                  <input
                    type="button"
                    value="Down"
                    className="hover:cursor-pointer px-5 py-2 bg-red-500 rounded-md w-[max-content] mt-5"
                    onClick={() => handleDownvote((val.id))}
                  />
                  <input
                    readOnly
                    type="text"
                    name="comment"
                    className="px-3 py-2 w-[80%] rounded-md mt-2"
                    placeholder="Comment"
                    value={val.comment}
                  />
                  <input
                    type="text"
                    name="comment"
                    className="px-3 pl-8 bg-gray-300 py-2 w-[80%] rounded-md mt-2"
                    placeholder="reply"
                    value={replyId === (val.id) ? replyComment : ""}
                    onChange={(e) => {
                      setReplyId((val.id));
                      setReplyComment(e.target.value);
                    }}
                  />
                  <input
                    type="button"
                    value="reply"
                    className="hover:cursor-pointer px-5 py-2 bg-blue-500 rounded-md w-[max-content] mt-5"
                    onClick={() => handleReply((val.id))}
                    />
                    </form>
                  </div>
                );
              })}
          </div>
        </>
      );
    };
    
    export default Comment;
