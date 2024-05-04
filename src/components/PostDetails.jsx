import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PostDetails = () => {
    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const params = useParams();

    const fetchBlogAndComments = async () => {
        try {
            const blogRes = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
            const blogData = await blogRes.json();
            setBlog(blogData.data);

            const commentsRes = await fetch(`http://localhost:8000/api/blogs/${params.id}/comments`);
            const commentsData = await commentsRes.json();
            setComments(commentsData.data);
        } catch (error) {
            console.error('Error fetching blog and comments:', error);
        }
    };

    useEffect(() => {
        fetchBlogAndComments();
    }, []);

    const handleAddComment = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/blogs/${params.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newComment }), 
            });
            const responseData = await response.json();
            setComments([...comments, responseData.data]); 
            setNewComment(''); 
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleUpdateComment = async (commentId, newText) => {
        try {
            const response = await fetch(`http://localhost:8000/api/blogs/${params.id}/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newText }), 
            });
            if (response.ok) {
                setComments(comments.map(comment => comment.id === commentId ? { ...comment, text: newText } : comment));
            }
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/blogs/${params.id}/comments/${commentId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setComments(comments.filter(comment => comment.id !== commentId));
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 pt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-3xl font-semibold">{blog.title}</h2>
                <div>
                    <Link to="/" className="btn btn-dark">Back to Blogs</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <p className="text-gray-600 mb-2">by <strong>{blog.author}</strong> on {blog.date}</p>
                    {blog.image && <img className="img-fluid rounded-lg" src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="Blog Image" />}
                </div>
                <div className="col-md-6">
                    <div className="mt-5" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                </div>
            </div>

            <div className="mt-5">
                <h3 className="text-xl font-semibold mb-3">Comments</h3>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <div>{comment.text}</div>
                            <div>Author: {comment.author}</div>
                            <div>Date: {comment.date}</div>
                            <button onClick={() => handleUpdateComment(comment.id, 'Updated Text')}>Edit</button>
                            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-5">
                <h3 className="text-xl font-semibold mb-3">Add a Comment</h3>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default PostDetails;
