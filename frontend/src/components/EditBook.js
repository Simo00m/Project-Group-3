import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditBook.css';  // Import the CSS file for styling

const EditBook = () => {
  const { id } = useParams(); // Retrieve the book ID from the URL params
  const [book, setBook] = useState({ title: '', author: '', description: '', coverImage: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/books/${id}`); // Fetch the book details by its ID
        setBook(response.data);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Error loading book details');
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:7000/books/${id}`, book); // Update the book information
      if (response.status === 200) {
        navigate('/admin-dashboard'); // Redirect to the admin dashboard after a successful update
      }
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Error updating book. Please try again.');
    }
  };

  return (
    <div className="edit-book-container">
      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
        </div>

        {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Cover Image URL:</label>
          <input
            type="text"
            value={book.coverImage}
            onChange={(e) => setBook({ ...book, coverImage: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Update Book</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EditBook;
