import { useState } from "react";

const Reply = ({ comment, replies, handleUpvote, handleDownvote, handleReply }) => {
    const [replyComment, setReplyComment] = useState("");

    return (
        <div className="reply pl-10 py-2 mb-2 w-[70%]">
            <form action="" className="w-full h-full flex flex-col items-start">
                <input
                    type="button"
                    value="Up"
                    className="hover:cursor-pointer px-5 py-2 bg-green-500 rounded-md w-[max-content] mt-5"
                    onClick={() => handleUpvote(comment['id'])}
                />
                <h1 className="hover:cursor-pointer px-5 py-2 bg-gray-500 rounded-md w-[max-content] mt-5">
                    {comment['upvote']}
                </h1>
                <input
                    type="button"
                    value="Down"
                    className="hover:cursor-pointer px-5 py-2 bg-red-500 rounded-md w-[max-content] mt-5"
                    onClick={() => handleDownvote(comment['id'])}
                />
                <input
                    readOnly
                    type="text"
                    name="comment"
                    className="px-3 py-2 w-[80%] rounded-md mt-2"
                    placeholder="Comment"
                    value={comment['comment']}
                />
                {replies.length > 0 && (
                    <div className="replies pl-10 py-2 mb-2 w-[70%]">
                        {replies.map((reply) => (
                            <Reply
                                key={reply['id']}
                                comment={reply}
                                replies={replies.filter((c) => c.reply === reply['id'])}
                                handleUpvote={handleUpvote}
                                handleDownvote={handleDownvote}
                                handleReply={handleReply}
                            />
                        ))}
                    </div>
                )}
                <input
                    type="text"
                    name="reply"
                    className="px-3 pl-8 bg-gray-300 py-2 w-[80%] rounded-md mt-2"
                    placeholder="reply"
                    value={replyComment}
                    onChange={(e) => setReplyComment(e.target.value)}
                />
                <input
                    type="button"
                    value="reply"
                    className="hover:cursor-pointer px-5 py-2 bg-blue-500 rounded-md w-[max-content] mt-5"
                    onClick={() => handleReply(comment['id'], replyComment)}
                />
            </form>
        </div>
    );
};

const Comment = () => {
    const [comments, setComments] = useState([
        {
            comment: "Its a good day",
            upvote: 3,
            id: 0,
            reply: null,
            replies: [1, 2, 3],
        },
        {
            comment: "I Love today",
            upvote: 2,
            id: 1,
            reply: 0,
            replies: [],
        },
        {
            comment: "Its a beatiful day",
            upvote: 0,
            id: 2,
            reply: 0,
            replies: [],
        },
        {
            comment: "I really liked today",
            upvote: 0,
            id: 3,
            reply: 0,
            replies: [],
        },
    ]);

    const [newComment, setNewComment] = useState("");
    const [replyComment, setReplyComment] = useState("");
    const [replyId, setReplyId] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");

    const handleAddComment = () => {
        const newCommentObj = {
            comment: newComment,
            upvote: 0,
            id: comments.length,
            reply: null,
            replies: [],
        };
        setComments([...comments, newCommentObj]);
        setNewComment("");
    };

    const handleReply = (id, replyComment) => {
        const newCommentObj = {
            comment: replyComment,
            upvote: 0,
            id: comments.length,
            reply: id,
            replies: [],
        };
        const updatedComments = comments.map((comment) => {
            if (comment['id'] === id) {
                return { ...comment, replies: [...comment['replies'], comments.length] };
            }
            return comment;
        });
        setComments([...updatedComments, newCommentObj]);
        setReplyComment("");
        setReplyId(null);
    };

    const handleUpvote = (id) => {
        const updatedComments = comments.map((comment) => {
            if (comment['id'] === id) {
                return { ...comment, upvote: comment['upvote'] + 1 };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const handleDownvote = (id) => {
        const updatedComments = comments.map((comment) => {
            if (comment['id'] === id) {
                return { ...comment, upvote: Math.max(comment['upvote'] - 1, 0) };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const handleSortOrder = () => {
        setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    };

    return (
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
            <button onClick={handleSortOrder}>
                {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </button>
            {comments
                .filter((val) => val.reply === null)
                .sort((a, b) => (sortOrder === "desc" ? b['id'] - a['id'] : a['id'] - b['id']))
                .map((val) => {
                    return (
                        <div key={val['id']} className="comments pl-10 py-2 mb-2 w-[70%]">
                            <form action="" className="w-full h-full flex flex-col items-start">
                                <input
                                    type="button"
                                    value="Up"
                                    className="hover:cursor-pointer px-5 py-2 bg-green-500 rounded-md w-[max-content] mt-5"
                                    onClick={() => handleUpvote(val['id'])}
                                />
                                <h1 className="hover:cursor-pointer px-5 py-2 bg-gray-500 rounded-md w-[max-content] mt-5">
                                    {val['upvote']}
                                </h1>
                                <input
                                    type="button"
                                    value="Down"
                                    className="hover:cursor-pointer px-5 py-2 bg-red-500 rounded-md w-[max-content] mt-5"
                                    onClick={() => handleDownvote(val['id'])}
                                />
                                <input
                                    readOnly
                                    type="text"
                                    name="comment"
                                    className="px-3 py-2 w-[80%] rounded-md mt-2"
                                    placeholder="Comment"
                                    value={val['comment']}
                                />
                                <input
                                    type="text"
                                    name="reply"
                                    className="px-3 pl-8 bg-gray-300 py-2 w-[80%] rounded-md mt-2"
                                    placeholder="reply"
                                    value={replyId === val['id'] ? replyComment : ""}
                                    onChange={(e) => {
                                        setReplyId(val['id']);
                                        setReplyComment(e.target.value);
                                    }}
                                />
                                <input
                                    type="button"
                                    value="reply"
                                    className="hover:cursor-pointer px-5 py-2 bg-blue-500 rounded-md w-[max-content] mt-5"
                                    onClick={() => handleReply(val['id'], replyComment)}
                                />
                                {val['replies'].length > 0 && (
                                    <div className="replies pl-10 py-2 mb-2 w-[70%]">
                                        {val['replies'].map((replyId) => {
                                            const reply = comments.find((c) => c['id'] === replyId);
                                            return (
                                                <Reply
                                                    key={reply['id']}
                                                    comment={reply}
                                                    replies={comments.filter((c) => c.reply === reply['id'])}
                                                    handleUpvote={handleUpvote}
                                                    handleDownvote={handleDownvote}
                                                    handleReply={handleReply}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </form>
                        </div>
                    );
                })}
        </div>
    );
};

export default Comment;
