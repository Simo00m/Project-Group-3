import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Assuming the token is stored in localStorage after login
  const token = localStorage.getItem('token'); // Get the JWT token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      description,
      coverImage
    };

    try {
      // POST request to add a new book, including the Authorization header with the JWT token
      const response = await axios.post('http://localhost:7000/books', newBook, {
        headers: {
          Authorization: `Bearer ${token}` // Add token to the header
        }
      });

      if (response.status === 201) {
        navigate('/admin-dashboard'); // Navigate on successful book creation
      }
    } catch (err) {
      setError('Error adding book. Please try again.');
      console.error('Error adding book:', err);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cover Image URL:</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Book</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AddBook;
