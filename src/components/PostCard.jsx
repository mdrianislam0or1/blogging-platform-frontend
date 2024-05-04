/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const PostCard = ({ blog, blogs, setBlogs }) => {
    const showImage = (img) => {
        return img ? 'http://localhost:8000/uploads/blogs/' + img : 'https://images.unsplash.com/photo-1713558014346-ceddc512a616?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    };

    const deleteBlog = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
                    method: 'DELETE'
                });

                if (!res.ok) {
                    throw new Error('Failed to delete blog');
                }

                const newBlogs = blogs.filter((blog) => blog.id !== id);
                setBlogs(newBlogs);

                toast("Blog deleted successfully.");
            } catch (error) {
                console.error('Delete blog error:', error);
                toast("Failed to delete blog.");
            }
        }
    };

    return (
        <div className="card mb-4">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={showImage(blog.image)} className="img-fluid" alt="Blog Image" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h2 className="card-title">{blog.title}</h2>
                        <p className="card-text">{blog.shortDesc}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to={`/post/${blog.id}`} className="btn btn-dark">Details</Link>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-danger me-2" onClick={() => deleteBlog(blog.id)}>Delete</button>
                                <Link to={`/post/edit/${blog.id}`} className="btn btn-dark">Edit</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
