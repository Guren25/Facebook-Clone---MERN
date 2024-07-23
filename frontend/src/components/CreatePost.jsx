import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/post/postslice';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const onChange = (e) => setDescription(e.target.value);

  const onFileChange = (e) => setImages(e.target.files);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    Array.from(images).forEach((file) => {
      formData.append('images', file);
    });
    dispatch(createPost(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea value={description} onChange={onChange} />
      <input type="file" multiple onChange={onFileChange} />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
