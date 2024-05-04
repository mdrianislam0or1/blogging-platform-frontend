import { useState } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');
    const navigate = useNavigate();

    const onChange = (value) => {
        setHtml(value);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('http://localhost:8000/api/save-temp-image/', {
            method: 'POST',
            body: formData,
        });

        const result = await res.json();

        if (!result.status) {
            alert(result.errors.image);
            e.target.value = null;
        }

        setImageId(result.image.id);
    };


    const formSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append('description', html);
        formData.append('image_id', imageId);

        const res = await fetch('http://localhost:8000/api/blogs', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            toast('Post added successfully.');
            navigate('/');
        } else {
            toast('Failed to add blog.');
        }

        console.log('Form submitted:', formData);
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-between align-items-center mb-4">
                <div className="col">
                    <h4 className="text-xl font-semibold">Create Post</h4>
                </div>
                <div className="col-auto">
                    <Link to="/" className="btn btn-dark">Back</Link>
                </div>
            </div>
            <div className="card border-0 shadow-lg">
                <form onSubmit={formSubmit} >
                    <div className="card-body">
                        <div className="mb-4">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className="form-control"
                                placeholder="Title"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="shortDesc" className="form-label">Short Description</label>
                            <textarea
                                id="shortDesc"
                                name="shortDesc"
                                rows="5"
                                className="form-control"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Description</label>
                            <textarea
                                value={html}
                                onChange={(e) => onChange(e.target.value)}
                                style={{ height: '400px' }}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                type="file"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="author" className="form-label">Author</label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                className="form-control"
                                placeholder="Author"
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
