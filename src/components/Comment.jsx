import { useState } from "react";

const Comment = () => {
    const {newReply, setNewReply} = useState('')
    const {newComment, setNewComment} = useState('')
    const {newID, setNewId} = useState('')
    const comments = [{
        comment : "Hey",
        Upvote : 3,
        id : 0,
        reply : null
    },
    {
        comment : "I",
        Upvote : 2,
        id : 1,
        reply : 1
    },
    {
        comment : "Am",
        Upvote : 1,
        id : 2,
        reply : 1
    },
    {
        comment : "Priyanshu",
        Upvote : 5,
        id : 3,
        reply : 1,
    }];
    const [upVote, setUpvote] = useState();
    const handleUpvote = (id)=>{
        const index = comments.findIndex((comment) => comment.id === id);
        if (index !== -1) {
            comments[index].Upvote += 1;
            setUpvote(comments[index].Upvote);
            }
    }
    const handledownVote = (id)=>{
        const index = comments.findIndex((comment) => comment.id === id);
        if (index !== -1) {
            comments[index].Upvote -= 1;
            setUpvote(comments[index].Upvote);
            }
    }
    const handleReply = (id) => {
        const index = comments.findIndex((comment) => comment.id === id);
        if (index !== -1) {
            setNewId(id);
            setNewComment(comments[index].comment);
            }
        }
    const handleAddComment = ()=>{
        
    }
    return (
        <>
            <div className="w-full h-full bg-zinc-400 items-center">
                <div id="add-comment" className="px-3 py-2 mb-2 w-[70%]">
                    <form action="" className="w-full h-full flex flex-col">
                        <input type="text" name="comment" className="px-3 py-2 w-[80%] rounded-md " placeholder="Insert comment"/>
                        <input type="button" value="Add" className="hover:cursor-pointer px-5 py-2 bg-blue-500 rounded-md w-[max-content] mt-5" />
                    </form>
                </div>
                <br />
                {comments.sort().map((val)=>{
                        return (
                            <div className="comments pl-10 py-2 mb-2 w-[70%]">
                    <form action="" className="w-full h-full flex flex-col items-start">
                            <input type="button" value="Up" className="hover:cursor-pointer px-5 py-2 bg-green-500 rounded-md w-[max-content] mt-5"/>
                            <h1 className="hover:cursor-pointer px-5 py-2 bg-gray-500 rounded-md w-[max-content] mt-5">{val.Upvote}</h1>
                            <input type="button" value="Down" className="hover:cursor-pointer px-5 py-2 bg-red-500 rounded-md w-[max-content] mt-5"/>
                            <input readOnly type="text" name="comment" className="px-3 py-2 w-[80%] rounded-md mt-2" placeholder="Comment" value={val.comment}/>
                            <input  type="text" name="comment" className="px-3 pl-8 bg-gray-300 py-2 w-[80%] rounded-md mt-2" placeholder="reply"/>
                            <input type="button" value="reply" className="hover:cursor-pointer px-5 py-2 bg-blue-500 rounded-md w-[max-content] mt-5" />
                        </form>
                    </div>
                        )
                    })}
                
            </div>
            
        </>
        
    );
}

export default Comment;