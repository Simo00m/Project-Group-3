import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // Hook to navigate to the books page after adding a book
import './AddBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      description,
      coverImage
    };

    try {
      // POST request to add a new book to the backend
      const response = await axios.post('http://localhost:7000/books', newBook); // Adjust API URL as needed
      if (response.status === 201) {
        navigate('/admin-dashboard'); // Navigate back to admin dashboard on successful book creation
      }
    } catch (err) {
      setError('Error adding book. Please try again.');
      console.error('Error adding book:', err);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>

      {/* Book Add Form */}
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
