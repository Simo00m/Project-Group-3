import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({ title: '', author: '', description: '', coverImage: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/books/${id}`); // Fetch book details by id
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
      const response = await axios.put(`http://localhost:7000/books/${id}`, book); // Update book data
      if (response.status === 200) {
        navigate('/admin-dashboard'); // Redirect back to the dashboard after editing
      }
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Error updating book. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Cover Image URL:</label>
          <input
            type="text"
            value={book.coverImage}
            onChange={(e) => setBook({ ...book, coverImage: e.target.value })}
            required
          />
        </div>

        <button type="submit">Update Book</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default EditBook;
