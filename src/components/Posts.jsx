import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from './PostCard.jsx';
const Posts = () => {
    const [blogs, setBlogs] = useState([]);
    const [keyword, setKeyword] = useState('');

    const fetchBlogs = async () => {
        const res = await fetch('http://localhost:8000/api/blogs');
        const result = await res.json();
        setBlogs(result.data);
    };

    const searchBlogs = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:8000/api/blogs?keyword=${keyword}`);
        const result = await res.json();
        setBlogs(result.data);
    };

    const resetSearch = () => {
        fetchBlogs();
        setKeyword('');
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center mb-4">
                <form onSubmit={(e) => searchBlogs(e)} className="d-flex align-items-center">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="form-control me-2"
                        placeholder="Search Posts"
                    />
                    <button type="submit" className="btn btn-dark me-2">Search</button>
                    <button type="button" onClick={() => resetSearch()} className="btn btn-success">Reset</button>
                </form>
            </div>
            <div className="row justify-content-between align-items-center mb-4">
                <h4 className="text-xl font-semibold">Posts</h4>
                <Link to="/create" className="btn btn-dark">Create</Link>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {blogs.map((blog) => (
                    <div key={blog.id} className="col">
                        <PostCard blogs={blogs} setBlogs={setBlogs} blog={blog} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
